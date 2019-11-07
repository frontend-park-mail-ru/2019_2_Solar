import BaseView from '../BaseView/BaseView.js';

import SignupViewTemplate from './SignUpView.hbs';
import './SignUpView.scss';
import ButtonComponent from '../../components/Button/Button.js';

// import {validateSignup} from '../../utils/validation.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import bus from '../../utils/bus.js';

/** Class representing a Signup view. */
export default class SignUpView extends BaseView {
    /**
     * Signup view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     * @param {*} args
     */
    constructor(parent, args) {
        super(parent);
        this.args = args;
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

            // if (!validateSignup(signUpForm)) {
            //     alert('Did not validate');
            //     return;
            // }

            /* for interface sem */
            if (email == '' || username == '' || password == '') {
                alert('Did not validate');
                return;
            }
            /* **************** */

            const data = {'email': email, 'password': password, 'username': username};

            fetchModule.Post({
                url: BACKEND_ADDRESS + '/registration',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        bus.emit('/profile');
                    }
                    return response.json();
                })
                .then((responseBody) => {
                    const errText = document.getElementById('errorText');
                    errText.textContent = 'Ошибочка: ' + responseBody.body;
                });
        });
    }
}
