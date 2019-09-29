'use strict';

// 1838 x 981
import {ProfileComponent} from './components/Profile/Profile.js';
import {LoginComponent} from './components/Login/Login.js';
import {SignUpComponent} from './components/SignUp/SignUp.js';
import {IndexComponent} from './components/Index/Index.js';
import {SettingsComponent} from './components/Settings/Settings.js'
import {HeaderComponent} from './components/Header/Header.js';
import './scss/base.scss';

const application = document.getElementById('application');
const backendAddress = 'http://solar-env-backend.v2zxh2s3me.us-east-2.elasticbeanstalk.com';

function createSignup() {
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
        
        let data = {'email': email, 'password': password, 'username': username};

        fetch(backendAddress + '/registration/', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.ok) {
                createProfile();
            } else {
                const error = response.json();
                console.log(error.body);
                alert ('Ошибка регистрации');
            }
        });
	});
};

function createLogin() {
    application.innerHTML = '';
    document.body.className = 'backgroundLogin';

    const login = new LoginComponent(application);
    login.render();

    const loginForm = document.getElementById('inputdata');

    loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = loginForm.emailinput.value.trim();
		const password = loginForm.passwordinput.value.trim();

        let data = {'email': email, 'password': password};

        fetch(backendAddress + '/login/', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                createProfile();
            } else {
                let data = response.json();
                alert('Ошибка авторизации');
            }
        });
	});
};

function createIndex() {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    const header = new HeaderComponent(application);
    header.render();

    const index = new IndexComponent();
    index.render();
};

function createSettings() {
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
        header.render();

        const settings = new SettingsComponent(application);
        settings.data = responseBody;
        settings.render();

        const settingsForm = document.getElementById('UserSettings');

        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let data = {
                'name': settingsForm.elements['name'].value, 
                'surname': settingsForm.elements['surname'].value, 
                'status': settingsForm.elements['status'].value
            };

            if (oldusername != settingsForm.elements['username'].value) {
                data["username"] = settingsForm.elements['username'].value;
            }

            let dataresponse = true;
            let pictureresponse = true;

            fetch(backendAddress + '/profile/data', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            })
            .then ((response) => {
                if (response.ok) {
                    dataresponse = true;
                } else {
                    dataresponse = false;
                    const error = response.json();
                    alert('Ошибка введённых данных');
                }
            });

            let formData = new FormData();
            formData.append('profilePicture', settingsForm.elements['avatarphoto'].files[0]);
            fetch(backendAddress + '/profile/picture', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            .then ((response) => {
                if (response.ok) {
                    alert('1');
                    pictureresponse = true;
                    createProfile();
                } else {
                    alert('2');
                    pictureresponse = false;

                    if (dataresponse == true) {
                        createProfile();
                    }
                }
            });
        });
    });
};


function createProfile() {
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
        header.render();

        const profile = new ProfileComponent(application);
        profile.data = responseBody;
        profile.render();
    })
    .catch(() => {
        alert('Ошибка авторизации');
        createLogin();
    });
};

const functions = {
    "signup": createSignup,
    "login": createLogin,
    "index": createIndex,
    "profile": createProfile,
    "settings": createSettings,
};

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target.dataset.section) {
        evt.preventDefault();
        evt.stopPropagation();
        functions[target.dataset.section]();
    }
});


fetch(backendAddress + '/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
    .then((response) => {
        if (response.ok) {
            createProfile()
        } else {
            createSignup();
        }
    });