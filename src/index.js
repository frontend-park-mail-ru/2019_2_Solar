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
        
        let data = {'email': email, 'password': password, 'username': username};

        fetch('http://localhost:8080/registration/', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function(response) {
                return response.json;
            })
            .then(function(data) {
                createProfile();
            })
            .catch(function(error){
                alert (error.body.info);
            });
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

        let data = {'email': email, 'password': password};

        fetch('http://localhost:8080/login/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                if (response.ok) {
                    createIndex();
                } else {
                    let data = response.json();
                    alert(data.body.info);
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

    let response = fetch('/settings', {
        method: 'GET',
        body: null,
    });

    console.log(response);

    if (response.ok) {
        const responseBody = response.json();

        const header = new HeaderComponent(application);
        header.data = responseBody;
        header.render();

        const settings = new SettingsComponent();
        settings.data = responseBody;
        settings.render();

        const settingsForm = document.getElementById('UserSettings');

        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            fetch('/settings', {
                method: 'POST',
                body: new FormData(settingsForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then (function(response) {
                    return response.json();
                })
                .then (function(data) {
                    createProfile();
                })
                .catch(function(error) {
                    alert(error.message);
                });

        });

    } else {
        const {error} = JSON.parse(response);
        alert(error);
    }


    // for test
    //var responseBody = {username: "gog", email: "go@mail.ru", status: "hi higgee", name: "Genri", surname: "Black"};
    //
    
};


function createProfile() {
    application.innerHTML = '';
    document.body.className ='backgroundIndex';
    
    // var responseBody = {username: "gog", email: "go@mail.ru", status: "hi hi"};


	// ajax({method: 'GET', url: '/me', body: null, callback(status, responseText) {
    //     let isMe = false;
        
	// 	if (status === 200) {
	// 		isMe = true;
	// 	}

	// 	if (status === 401) {
	// 		isMe = false;
	// 	}

	// 	if (isMe) {
    //         try {
    //             const responseBody = JSON.parse(responseText);
    //             application.innerHTML = '';
    //             document.body.className ='backgroundIndex';

    //             const header = new HeaderComponent(application);
    //             header.data = responseBody;
    //             header.render();

    //             const profile = new ProfileComponent(application);
    //             profile.data = responseBody;
    //             profile.render();
                
    //         } catch (e) {
    //             return;
    //         }
	// 	} else {
	// 		alert('нет авторизации');
	// 		createLogin();
	// 	}
    // }
    // });

    fetch('http://localhost:8080/profile/data', {
        method: 'GET',
        body: null,
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