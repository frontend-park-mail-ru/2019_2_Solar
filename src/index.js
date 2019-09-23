'use strict';

import './scss/base.scss';
import Logo from './images/logo.jpg'

// 1838 x 981

const application = document.getElementById('application');

function createSignup() {
    application.innerHTML = '';

    document.body.className = 'background';

    const paddingMenu = document.createElement('div');
    paddingMenu.className = 'paddingMenuCl ';

    const titleSolar = document.createElement('div');
    titleSolar.className = 'signupTitleSolar paddingMenuTitle';
    titleSolar.textContent = 'Добро пожаловать на пинтерест (нет)';

    const underTitleSolar = document.createElement('div');
    underTitleSolar.className = 'signupUnderTitle paddingMenuTitle';
    underTitleSolar.textContent = 'На самом деле мы не пинтерест, а кое-что покруче!';

    const form = document.createElement('form');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Email';
    emailInput.style = 'top: 452px;';
    emailInput.className = 'blockinput';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Пароль';
    passwordInput.style = 'top: 510px;';
    passwordInput.className = 'blockinput';

    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.name = 'age';
    ageInput.placeholder = 'Возраст';
    ageInput.style = 'top: 566px;';
    ageInput.className = 'blockinput';

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться';
    submitBtn.className = 'buttonSignup';
    // добавить обработку события

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);
    
    const contentText = document.createElement('div');
    contentText.textContent = 'Уже зарегистрировались?';
    contentText.className = 'underbutton';

    const loginBtn = document.createElement('a');
    loginBtn.href = '/login';
    loginBtn.textContent = 'Войти';
    loginBtn.dataset.section = 'login';
    loginBtn.className = 'aUnblock';

    contentText.appendChild(loginBtn);

    paddingMenu.appendChild(form);
    paddingMenu.appendChild(contentText);

    application.appendChild(paddingMenu);
    application.appendChild(titleSolar);
    application.appendChild(underTitleSolar);
};

function createLogin() {
    application.innerHTML = '';

    document.body.className = 'backgroundLogin';

    const logoImg = document.createElement('img');
    logoImg.src = Logo;
    logoImg.className = 'logoStyle';

    const underBlockLogin = document.createElement('div');
    underBlockLogin.className ='underBlockLoginCl';

    const blockLogin = document.createElement('div');
    blockLogin.className = 'blocklogin';

    const titleLogin = document.createElement('div');
    titleLogin.textContent = 'Добро пожаловать в Sunrise!';
    titleLogin.className = 'titleLogin';

    const form = document.createElement('form');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.className = 'inputSingIn';
    emailInput.style = 'top: 48.83%;';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Пароль';
    passwordInput.className = 'inputSingIn';
    passwordInput.style = 'top: 60.74%;';

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Войти';
    submitBtn.className = 'buttonLogin';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);
    
    const contentText = document.createElement('div');
    contentText.textContent = 'Ещё не зарегистрировались?';
    contentText.className = 'underbuttonLogin';

    const signupBtn = document.createElement('a');
    signupBtn.href = '/signup';
    signupBtn.textContent = 'Регистрация';
    signupBtn.dataset.section = 'signup';
    signupBtn.className = 'aUnblock';

    contentText.appendChild(signupBtn);
    
    blockLogin.appendChild(logoImg);
    blockLogin.appendChild(titleLogin);
    blockLogin.appendChild(form);
    blockLogin.appendChild(contentText);
    underBlockLogin.appendChild(blockLogin);

    application.appendChild(underBlockLogin);
};

function createIndex() {
    application.innerHTML = '';

    document.body.className ='backgroundIndex';

    const comma = document.createElement('div');
    comma.textContent = 'HI';
    comma.style = 'padding-left:919px;';

    const comma1 = document.createElement('div');
    comma1.textContent = 'HI';
    comma1.style = 'padding-left:50%;';


    application.appendChild(comma);
    application.appendChild(comma1);

};

const functions = {
    signup: createSignup,
    login: createLogin,
    index: createIndex,
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        functions[target.dataset.section]();
    }
});

createSignup();

