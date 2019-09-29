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

        fetch('http://localhost:8080/registration/', {
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
                    alert (error.body.info);
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

        fetch('http://localhost:8080/login/', {
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
                console.log(data);
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

    fetch('http://localhost:8080/profile/data', {
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
        const header = new HeaderComponent(application);
        header.data = responseBody;
        header.render();

        const settings = new SettingsComponent();
        settings.data = responseBody;
        settings.render();

        const settingsForm = document.getElementById('UserSettings');

        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            fetch('http://localhost:8080/profile/data', {
                method: 'POST',
                body: new FormData(settingsForm),
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            })
            .then ((response) => {
                return response.json();
            })
            .then ((data) => {
                createProfile();
            })
            .catch((error) => {
                alert(error.message);
            });

        });
    });

    console.log(response);
};


function createProfile() {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';
    

    fetch('http://localhost:8080/profile/data', {
        method: 'GET',
        body: null,
        credentials: 'include',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(responseBody) {
        application.innerHTML = '';
        document.body.className ='backgroundIndex';

        const header = new HeaderComponent(application);
        header.data = responseBody;
        header.render();

        const profile = new ProfileComponent(application);
        profile.data = responseBody;
        profile.render();
    })
    .catch(function() {
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

    console.log("HHHHHHHHHHHH");
    console.log(target);
    console.log(target.dataset.section);

    if (target.dataset.section) {
        evt.preventDefault();
        functions[target.dataset.section]();
    }
});

createSignup();