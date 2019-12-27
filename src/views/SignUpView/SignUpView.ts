import BaseView from '../BaseView/BaseView';

import SignupViewTemplate from './SignUpView.hbs';
import './SignUpView.scss';
import ButtonComponent from '../../components/Button/Button';

import {validateSignup, errorDraw, deleteErrorDraw} from '../../utils/validation';
import {deleteCookie} from '../../utils/deleteCookies';
import {BACKEND_ADDRESS} from '../../config/Config';

import sunriseKuinji from '../../images/sunrise_kuinji.jpg';
import sunriseSea from '../../images/sunrise_sea.jpg';
import sunriseOcean from '../../images/sunrise_ocean.jpg';
import sunriseFlowers from '../../images/sunrise_flowers.jpg';
import sunriseVan from '../../images/sunrise_van.jpg';
import sunriseTown from '../../images/sunrise_town.jpg';

import bus from '../../utils/bus';
import i18n from '../../utils/i18n';
import fetchModule from '../../utils/fetchModule';
import {deleteHeader} from '../../utils/headerFunc';

const PAGE_ADDRESS = '/';

/** Class representing a Signup view. */
export default class SignUpView extends BaseView {
    args: object;
    /**
     * Signup view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     * @param {*} args
     */
    constructor(parent, args) {
        super(parent, {});
        this.args = args;
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
                    bus.emit('/profile', {});
                } else {
                    deleteCookie();
                    deleteHeader();
                    document.body.className = 'background';

                    const button = new ButtonComponent();
                    const context = {
                        button: button.render({text: i18n.t('signup.register')}),
                        imagesColumn1: [sunriseKuinji, sunriseFlowers, sunriseSea],
                        imagesColumn2: [sunriseTown, sunriseVan, sunriseOcean],
                    };
                    this.el.innerHTML = SignupViewTemplate(context);
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

                    const signUpForm = <HTMLFormElement> document.getElementById('inputdata_signup');
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
                            errText.className = 'signup-form-block__error-text';
                            errText.textContent = validation.message;

                            errorDraw(inputForm, 0, 'form-block__error-input');
                            return;
                        }

                        const data = {'email': email, 'password': password, 'username': username};

                        fetchModule.Post({
                            url: BACKEND_ADDRESS + '/registration',
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
                                errText.className = 'signup-form-block__error-text';
                                if (responseBody.body.info) {
                                    errText.textContent = responseBody.body.info;
                                } else {
                                    errText.textContent = responseBody.body;
                                }
                            });
                    });
                }
            });
    }
}
