import './Login.scss';
import LoginTemplate from '../Login/Login.hbs';

import Logo from '../../images/logo.png';

export class LoginComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    get form() {
        return document.querySelector('#inputdata')
    }

    render() {
        const context = {
            PHlogo: Logo,
        };
        const html = LoginTemplate(context);

        this._parent.innerHTML += html;
    }
}