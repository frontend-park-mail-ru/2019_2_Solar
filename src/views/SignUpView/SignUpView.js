import bus from '../../utils/bus.js';
import './SignUpView.scss';
import SignupViewTemplate from './SignUpView.hbs';
import ButtonComponent from '../../components/Button/Button.js';

/** Class representing a Signup view. */
export default class SignUpView {
    /**
     * Signup view constructor.
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
     * Render Signup view.
     */
    render() {
        const button = new ButtonComponent();
        const context = {
            button: button.render({text: 'Зарегистрироваться'}),
        };
        const html = SignupViewTemplate(context);

        this._parent.innerHTML += html;

        const toLogin = document.getElementById('signup-page').querySelectorAll('[data-section=\'login\']')[0];
        toLogin.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-login');
        });
    }
}
