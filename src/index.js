'use strict';

// 1838 x 981
import {ProfileComponent} from './components/Profile/Profile.js';
import {LoginComponent} from './components/Login/Login.js';
import {SignUpComponent} from './components/SignUp/SignUp.js';
import {IndexComponent} from './components/Index/Index.js';
import {SettingsComponent} from './components/Settings/Settings.js'
import './scss/base.scss';


const ajax = globalThis.ajax;

console.log('hello, my friend :)');

const application = document.getElementById('application');

function createSignup() {

    application.innerHTML = '';
    document.body.className = 'background';

    const signUp = new SignUpComponent(application);
    signUp.render();

    const signUpForm = signUp.form;

    signUpForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = signUpForm.elements['email'].value;
        const username = signUpForm.elements['username'].value;
		const password = signUpForm.elements['password'].value;

		ajax({method: 'POST', url: '/signup', body: {email, username, password}, callback(status, responseText) {
			if (status === 201) {
				createProfile();
				return;
			}

			const {error} = JSON.parse(responseText);
			alert(error);
        }
        });
	});
};

function createLogin() {
    application.innerHTML = '';
    document.body.className = 'backgroundLogin';

    const login = new LoginComponent(application);
    login.render();

    const loginForm = login.form;

    loginForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = loginForm.emailinput.value.trim();
		const password = loginForm.passwordinput.value.trim();

		ajax({
			method: 'POST',
			url: '/login',
			body: {email, password},
			callback: (status, response) => {
				if (status === 200) {
					createIndex();
				} else {
					const {error} = JSON.parse(response);
					alert(error);
				}
			}
        });

	});
};

function createIndex() {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    const index = new IndexComponent();
    index.render();
};

function createSettings() {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';

    const settings = new SettingsComponent();
    settings.render();
    
};


function createProfile() {
	application.innerHTML = '';
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