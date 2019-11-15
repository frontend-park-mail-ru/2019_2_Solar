import BaseView from '../BaseView/BaseView.js';

import SignupViewTemplate from './SignUpView.hbs';
import './SignUpView.scss';
import ButtonComponent from '../../components/Button/Button.js';

import {validateSignup, errorDraw, deleteErrorDraw} from '../../utils/validation.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import sunriseKuinji from '../../images/sunrise_kuinji.jpg';
import sunriseSea from '../../images/sunrise_sea.jpg';
import sunriseOcean from '../../images/sunrise_ocean.jpg';
import sunriseFlowers from '../../images/sunrise_flowers.jpg';
import sunriseVan from '../../images/sunrise_van.jpg';
import sunriseTown from '../../images/sunrise_town.jpg';

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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                if (response.ok) {
                    bus.emit('/profile');
                } else {
                    document.body.className = 'background';

                    const button = new ButtonComponent();
                    const context = {
                        button: button.render({text: 'Зарегистрироваться'}),
                        imagesColumn1: [sunriseKuinji, sunriseFlowers, sunriseSea],
                        imagesColumn2: [sunriseTown, sunriseVan, sunriseOcean],
                    };
                    this.el.innerHTML = SignupViewTemplate(context);

                    const signUpForm = document.getElementById('inputdata_signup');
                    signUpForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const errText = document.getElementById('errorText');

                        const email = signUpForm.elements['email'].value;
                        const username = signUpForm.elements['username'].value;
                        const password = signUpForm.elements['password'].value;

                        const inputForm = {
                            email: document.getElementById('signUpEmail'),
                            username: document.getElementById('signUpUsername'),
                            password: document.getElementById('signUpPassword'),
                        };

                        deleteErrorDraw(inputForm, 'form-block__error-input');

                        const validation = validateSignup(signUpForm);
                        if (!validation.result) {
                            errText.textContent = validation.message;

                            errorDraw(inputForm, validation.errorNumbers, 'form-block__error-input');
                            return;
                        }

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
                                if (responseBody.body.info) {
                                    errText.textContent = 'Ошибочка: ' + responseBody.body.info;
                                } else {
                                    errText.textContent = 'Ошибочка: ' + responseBody.body;
                                }
                            });
                    });
                }
            });
    }
}
