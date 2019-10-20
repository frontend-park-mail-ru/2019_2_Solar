import bus from './utils/bus.js';
import ProfileView from './views/ProfileView/ProfileView.js';
import LoginView from './views/LoginView/LoginView.js';
import SignUpView from './views/SignUpView/SignUpView.js';
import IndexView from './views/IndexView/IndexView.js';
import SettingsView from './views/SettingsView/SettingsView.js';
import HeaderComponent from './components/Header/Header.js';
import CreatePinView from './views/CreatePinView/CreatePinView.js';
import {validateSignup} from './utils/validation.js';
import {deleteCookie} from './utils/deleteCookies.js';
import './scss/base.scss';

const application = document.getElementById('application');
const backendAddress = 'http://localhost:8080';

bus.on('create-signup', () => {
    application.innerHTML = '';
    document.body.className = 'background';

    const signUp = new SignUpView(application);
    signUp.render();

    const signUpForm = document.getElementById('inputdata');

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signUpForm.elements['email'].value;
        const username = signUpForm.elements['username'].value;
        const password = signUpForm.elements['password'].value;

        if (!validateSignup(signUpForm)) {
            alert('Did not validate');
            return;
        }
        const data = {'email': email, 'password': password, 'username': username};

        fetch(backendAddress + '/registration/', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    bus.emit('create-profile');
                } else {
                    alert('Ошибка регистрации');
                }
            });
    });
});

bus.on('create-login', () => {
    application.innerHTML = '';
    document.body.className = 'backgroundLogin';

    const login = new LoginView(application);
    login.render();

    const loginForm = document.getElementById('inputdata');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm.emailinput.value.trim();
        const password = loginForm.passwordinput.value.trim();

        const data = {'email': email, 'password': password};

        fetch(backendAddress + '/login/', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    bus.emit('create-profile');
                } else {
                    alert('Ошибка авторизации');
                }
            });
    });
});

bus.on('create-index', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    const header = new HeaderComponent(application);
    header.render();

    const index = new IndexView();
    index.render();
});

bus.on('create-settings', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                const {error} = JSON.parse(response);
                alert(error);
            }
        })
        .then((responseBody) => {
            const oldusername = responseBody.body.user.username;

            const header = new HeaderComponent(application);
            header.data = responseBody;

            const settings = new SettingsView(application);
            settings.data = responseBody;

            let avaflag = false;

            fetch(backendAddress + '/profile/picture', {
                method: 'GET',
                body: null,
                credentials: 'include',
            })
                .then((response) => {
                    if (response.ok) {
                        avaflag = true;
                    }
                    return response.blob();
                })
                .then(function(blob) {
                    if (avaflag) {
                        const objectURL = URL.createObjectURL(blob);

                        const avaimg = document.getElementById('avatarPhotoSettings');
                        avaimg.src = objectURL;

                        const avaimgHeader = document.getElementById('avatarPhotoHeader');
                        avaimgHeader.src = objectURL;
                    }
                });

            header.render();
            settings.render();

            const settingsForm = document.getElementById('UserSettings');

            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const data = {
                    'name': settingsForm.elements['name'].value,
                    'surname': settingsForm.elements['surname'].value,
                    'status': settingsForm.elements['status'].value,
                };

                if (oldusername != settingsForm.elements['username'].value) {
                    data['username'] = settingsForm.elements['username'].value;
                }

                let dataresponse = true;

                fetch(backendAddress + '/profile/data', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                })
                    .then((response) => {
                        if (response.ok) {
                            dataresponse = true;
                        } else {
                            dataresponse = false;
                            alert('Ошибка введённых данных');
                        }
                    });

                const formData = new FormData();
                formData.append('profilePicture', settingsForm.elements['avatarphoto'].files[0]);

                fetch(backendAddress + '/profile/picture', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                })
                    .then((response) => {
                        if (response.ok) {
                            bus.emit('create-profile');
                        } else {
                            if (dataresponse) {
                                bus.emit('create-profile');
                            } else {
                                createSettings();
                            }
                        }
                    });
            });
        });
});

bus.on('create-profile', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';


    fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            application.innerHTML = '';
            document.body.className ='backgroundIndex';

            const header = new HeaderComponent(application);
            header.data = responseBody;

            const profile = new ProfileView(application);
            profile.data = responseBody;

            let avaflag = false;

            fetch(backendAddress + '/profile/picture', {
                method: 'GET',
                body: null,
                credentials: 'include',
            })
                .then((response) => {
                    if (response.ok) {
                        avaflag = true;
                    }
                    return response.blob();
                })
                .then(function(blob) {
                    if (avaflag) {
                        const objectURL = URL.createObjectURL(blob);

                        const avaimg = document.getElementById('avatarPhotoI');
                        avaimg.src = objectURL;

                        const avaimgHeader = document.getElementById('avatarPhotoHeader');
                        avaimgHeader.src = objectURL;
                    }
                });

            header.render();
            profile.render();
        })
        .catch(() => {
            alert('Ошибка авторизации');
            bus.emit('create-login');
        });
});

bus.on('create-createpin', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            const header = new HeaderComponent(application);
            header.data = responseBody;
            header.render();

            const createPin = new CreatePinView(application);
            createPin.render();
        });
});

bus.on('create-pin', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            const header = new HeaderComponent(application);
            header.data = responseBody;
            header.render();

            const pin = new PinView(application);
            pin.render();
        });
});

bus.on('create-createboard', () => {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            const header = new HeaderComponent(application);
            header.data = responseBody;
            header.render();

            const createBoard = new CreateBoardView(application);
            createBoard.render();
        });
});

bus.on('create-logout', () => {
    deleteCookie();
    bus.emit('create-login');
});

fetch(backendAddress + '/profile/data', {
    method: 'GET',
    body: null,
    credentials: 'include',
})
    .then((response) => {
        if (response.ok) {
            bus.emit('create-profile');
            return;
        }
        bus.emit('create-signup');
    });
