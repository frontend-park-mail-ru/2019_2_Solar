import BaseView from '../BaseView/BaseView.js';

import SignupViewTemplate from './SignUpView.hbs';
import './SignUpView.scss';
import ButtonComponent from '../../components/Button/Button.js';

import {validateSignup} from '../../utils/validation.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a Signup view. */
export default class SignUpView extends BaseView {
    /**
     * Signup view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent) {
        super(parent);
        this._form = null;
    }

    /**
     * Get SignUp form data.
     * @return {object} SignUp form data.
     */
    get form() {
        return this.el.querySelector('#inputdata_signup');
    }

    /**
     * Render Signup view.
     */
    render() {
        document.body.className = 'background';
        const button = new ButtonComponent();
        const context = {
            button: button.render({text: 'Зарегистрироваться'}),
        };
        this.el.innerHTML = SignupViewTemplate(context);

        const signUpForm = document.getElementById('inputdata_signup');
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = signUpForm.elements['email'].value;
            const username = signUpForm.elements['username'].value;
            const password = signUpForm.elements['password'].value;

            if (!validateSignup(signUpForm)) {
                alert('Did not validate');
                return;
            }
            const data = {'email': email, 'password': password, 'username': username};

            fetch(BACKEND_ADDRESS + '/registration/', {
                method: 'POST',
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
                        alert('Ошибка регистрации');
                    }
                });
        });
    }
}