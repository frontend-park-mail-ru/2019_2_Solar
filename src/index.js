'use strict';

// 1838 x 981
import {ProfileComponent} from './components/Profile/Profile.js';
import {LoginComponent} from './components/Login/Login.js';
import {SignUpComponent} from './components/SignUp/SignUp.js';
import {IndexComponent} from './components/Index/Index.js';
import {SettingsComponent} from './components/Settings/Settings.js'
import {HeaderComponent} from './components/Header/Header.js';
import './scss/base.scss';

const ajax = globalThis.ajax;

const application = document.getElementById('application');

function createSignup() {
    application.innerHTML = '';
    document.body.className = 'background';

    const signUp = new SignUpComponent(application);
    signUp.render();

    const signUpForm = document.getElementById('inputdata');

    signUpForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = signUpForm.elements['email'].value;
        const username = signUpForm.elements['username'].value;
		const password = signUpForm.elements['password'].value;

        let response = fetch('/signup', {
            method: 'POST',
            body: {email, password, username},
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.ok) {
            createProfile();
        } else {
            const {error} = JSON.parse(response);
            alert(error);
        }
	});
};

function createLogin() {
    application.innerHTML = '';
    document.body.className = 'backgroundLogin';

    const login = new LoginComponent(application);
    login.render();

    const loginForm = document.getElementById('inputdata');

    loginForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = loginForm.emailinput.value.trim();
		const password = loginForm.passwordinput.value.trim();

        let response = fetch('/login', {
            method: 'POST',
            body: {email, password},
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            createIndex();
        } else {
            const {error} = JSON.parse(response);
            alert(error);
        }

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

    // for test
    var responseBody = {username: "gog", email: "go@mail.ru", status: "hi higgee", name: "Genri", surname: "Black"};
    //

    const header = new HeaderComponent(application);
    header.data = responseBody;
    header.render();

    const settings = new SettingsComponent();
    settings.data = responseBody;
    settings.render();
    
};


function createProfile() {
    application.innerHTML = '';
    
    // document.body.className ='backgroundIndex';
    // var responseBody = {username: "gog", email: "go@mail.ru", status: "hi hi"};
    // const header = new HeaderComponent(application);
    // header.data = responseBody;
    // header.render();

    // const profile = new ProfileComponent(application);
    // profile.data = responseBody;
    // profile.render();

	ajax({method: 'GET', url: '/me', body: null, callback(status, responseText) {
        let isMe = false;
        
		if (status === 200) {
			isMe = true;
		}

		if (status === 401) {
			isMe = false;
		}

		if (isMe) {
            try {
                const responseBody = JSON.parse(responseText);
                application.innerHTML = '';
                document.body.className ='backgroundIndex';

                const header = new HeaderComponent(application);
                header.data = responseBody;
                header.render();

                const profile = new ProfileComponent(application);
                profile.data = responseBody;
                profile.render();
                
            } catch (e) {
                return;
            }
		} else {
			alert('нет авторизации');
			createLogin();
		}
    }
    });
};

const functions = {
    signup: createSignup,
    login: createLogin,
    index: createIndex,
    profile: createProfile,
    settings: createSettings,
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        functions[target.dataset.section]();
    }
});

createSignup();