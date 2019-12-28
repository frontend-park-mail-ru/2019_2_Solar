import BaseView from '../BaseView/BaseView';

import LoginViewTemplate from './LoginView.hbs';
import './LoginView.scss';

import bus from '../../utils/bus';
import {deleteCookie} from '../../utils/deleteCookies';
import {BACKEND_ADDRESS} from '../../config/Config';
import i18n from '../../utils/i18n';

import Logo from '../../images/logo.png';
import fetchModule from '../../utils/fetchModule';
import {deleteHeader} from '../../utils/headerFunc';

const PAGE_ADDRESS = '/login';

/** Class representing a Login view. */
export default class LoginView extends BaseView {
    args: object;
    /**
     * Login view constructor.
     * @param {object} el - Root application div.
     * @param {*} args
     * @constructor
     */
    constructor(el, args) {
        super(el, {});
        this.args = args;
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
        deleteHeader();

        document.body.className = 'backgroundLogin';
        const context = {
            PHlogo: Logo,
        };
        this.el.innerHTML = LoginViewTemplate(context);
        let old_element = document.getElementById('changeLangToEng');
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        old_element = document.getElementById('changeLangToRu');
        new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        document.getElementById('changeLangToEng').addEventListener('click', () => {
            i18n.setLanguage('en');
            bus.emit(PAGE_ADDRESS, {});
        });
        document.getElementById('changeLangToRu').addEventListener('click', () => {
            i18n.setLanguage('ru');
            bus.emit(PAGE_ADDRESS, {});
        });
        document.getElementById('changeThemeToLight').addEventListener('click', () => {
            document.body.removeAttribute('data-theme');
        });
        document.getElementById('changeThemeToDark').addEventListener('click', () => {
            document.body.setAttribute('data-theme', 'dark');
        });
        const errText = document.getElementById('loginTextErr');
        errText.className = 'login-error-text_none';

        const loginForm = <HTMLFontElement> document.getElementById('inputdata_login');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = loginForm['emailinput'].value.trim();
            const password = loginForm['passwordinput'].value.trim();

            const data = {'email': email, 'password': password};

            fetchModule.Post({
                url: BACKEND_ADDRESS + '/login',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'csrf-token': 'any'
                },
            })
                .then((response) => {
                    if (response.ok) {
                        bus.emit('/profile', {});
                    }
                    return response.json();
                })
                .then((responseBody) => {
                    errText.className = 'login-text-error';
                    errText.textContent = responseBody.body.info;
                });
        });
    }
}
