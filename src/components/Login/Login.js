import './Login.scss';
import LoginTemplate from '../Login/Login.hbs';

import Logo from '../../images/logo.png';

/** Class representing a Login component. */
export class LoginComponent {
    /**
     * Login component constructor.
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
     * Render Login component.
     */
    render() {
        const context = {
            PHlogo: Logo,
        };
        const html = LoginTemplate(context);

        this._parent.innerHTML += html;
    }
}
