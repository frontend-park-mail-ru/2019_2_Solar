import bus from '../../utils/bus.js';
import './SignUp.scss';
import SignupTemplate from '../SignUp/SignUp.hbs';
import {ButtonComponent} from '../Button/Button.js';

/** Class representing a Signup component. */
export class SignUpComponent {
    /**
     * Signup component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    /**
     * Get SignUp form data.
     * @return {object} SignUp form data.
     */
    get form() {
        return document.querySelector('#inputdata');
    }

    /**
     * Render Signup component.
     */
    render() {
        const button = new ButtonComponent();
        const context = {
            button: button.render({text: "Зарегистрироваться"}),
        };
        const html = SignupTemplate(context);

        this._parent.innerHTML += html;

        const toLogin = document.getElementById('signup-page').querySelectorAll('[data-section=\'login\']')[0];
        toLogin.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-login');
        });
    }
}
