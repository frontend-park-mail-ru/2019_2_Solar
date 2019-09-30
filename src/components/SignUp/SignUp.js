import './SignUp.scss';
import SignupTemplate from '../SignUp/signUp.hbs';

export class SignUpComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    get form() {
        return document.querySelector('#inputdata')
    }

    render() {
        const context = {};
        const html = SignupTemplate(context);

        this._parent.innerHTML += html;
    }
}