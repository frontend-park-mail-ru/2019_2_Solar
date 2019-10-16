'use strict';

import bus from './utils/bus.js';
import {ProfileComponent} from './components/Profile/Profile.js';
import {LoginComponent} from './components/Login/Login.js';
import {SignUpComponent} from './components/SignUp/SignUp.js';
import {IndexComponent} from './components/Index/Index.js';
import {SettingsComponent} from './components/Settings/Settings.js';
import {HeaderComponent} from './components/Header/Header.js';
import {CreatePinComponent} from './components/CreatePin/CreatePin.js';
import {validateSignup} from './utils/validation.js';
import {deleteCookie} from './utils/deleteCookies.js';
import './scss/base.scss';

const application = document.getElementById('application');
const backendAddress = 'http://solar-env-backend.v2zxh2s3me.us-east-2.elasticbeanstalk.com';

bus.on('create-signup', () => {
    application.innerHTML = '';
    document.body.className = 'background';

    const signUp = new SignUpComponent(application);
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

    const login = new LoginComponent(application);
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

    const index = new IndexComponent();
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

            const settings = new SettingsComponent(application);
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

            const profile = new ProfileComponent(application);
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

            const createPin = new CreatePinComponent(application);
            createPin.render();
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

            const createBoard = new CreateBoardComponent(application);
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
