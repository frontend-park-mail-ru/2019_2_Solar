import './SignUp.scss';
import signuptemplate from '../../templates/signUp.hbs';

export class SignUpComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    get form() {
        return document.querySelector('#inputdata')
    }

    render() {
        // const set = document.createElement('a');
        // set.href = '/settings';
        // set.textContent = 'Войти в настройки';
        // set.dataset.section = 'settings';
        // this._parent.appendChild(set);

        // const set1 = document.createElement('a');
        // set1.href = '/profile';
        // set1.textContent = 'Войти в профиль';
        // set1.dataset.section = 'profile';
        // this._parent.appendChild(set1);

        const context = {};
        const html = signuptemplate(context);

        this._parent.innerHTML += html;
    }
}