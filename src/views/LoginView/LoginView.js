import BaseView from '../BaseView/BaseView.js';

import LoginViewTemplate from './LoginView.hbs';
import './LoginView.scss';

import bus from '../../utils/bus.js';
import {deleteCookie} from '../../utils/deleteCookies.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import Logo from '../../images/logo.png';

/** Class representing a Login view. */
export default class LoginView extends BaseView {
    /**
     * Login view constructor.
     * @param {object} el - Root application div.
     * @param {*} args
     * @constructor
     */
    constructor(el, args) {
        super(el);
        this.args = args;
        this._form = null;
    }

    /**
     * Get Login form data.
     * @return {object} Login form data.
     */
    get form() {
        return document.querySelector('#inputdata_login');
    }

    /**
     * Render Login view.
     */
    render() {
        deleteCookie();

        document.body.className = 'backgroundLogin';
        const context = {
            PHlogo: Logo,
        };
        this.el.innerHTML = LoginViewTemplate(context);

        const loginForm = document.getElementById('inputdata_login');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = loginForm.emailinput.value.trim();
            const password = loginForm.passwordinput.value.trim();

            const data = {'email': email, 'password': password};

            fetchModule.Post({
                url: BACKEND_ADDRESS + '/login',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        bus.emit('/profile');
                    } else {
                        alert('Ошибка авторизации');
                    }
                });
        });
    }
}
