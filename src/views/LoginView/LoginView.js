import bus from '../../utils/bus.js';
import './LoginView.scss';
import LoginViewTemplate from './LoginView.hbs';

import Logo from '../../images/logo.png';

/** Class representing a Login view. */
export default class LoginView {
    /**
     * Login view constructor.
     * @param {object} parent - Root application div.
     * @constructor
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    /**
     * Get Login form data.
     * @return {object} Login form data.
     */
    get form() {
        return document.querySelector('#inputdata');
    }

    /**
     * Render Login view.
     */
    render() {
        const context = {
            PHlogo: Logo,
        };
        const html = LoginViewTemplate(context);

        this._parent.innerHTML += html;

        const toRegistration = document.getElementById('login-page').querySelectorAll('[data-section=\'signup\']')[0];
        toRegistration.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-signup');
        });
    }
}
