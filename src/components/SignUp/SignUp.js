import './SignUp.scss';
import SignupTemplate from '../SignUp/SignUp.hbs';

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
        const context = {};
        const html = SignupTemplate(context);

        this._parent.innerHTML += html;
    }
}
