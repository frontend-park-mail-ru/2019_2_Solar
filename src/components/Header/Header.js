import './Header.scss';
import headertemplate from '../../templates/header.hbs';

import AvatarPhoto from '../../images/nophoto.png';
import Logo from '../../images/logo.png';
import Lupa from '../../images/zoom.png';
import PadIm from '../../images/arrow.png';
import Plus from '../../images/plus.png';
import Question from '../../images/question.png';
import Dialog from '../../images/dilog.png';
import Setting from '../../images/more.png';

export class HeaderComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    get data() {
        return this._data;
    }

    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    render() {
        //${this._data.username} ${this._data.avatarphoto}

        const context = { 
            username: this._data.body.user.username, 
            avatarphoto: AvatarPhoto,

            PHlogo: Logo,
            PHLupa: Lupa,
            PHpadim: PadIm,
            PHplus: Plus,
            PHquestion: Question,
            PHdialog: Dialog,
            PHsetting: Setting,
        };
        const html = headertemplate(context);

        this._parent.innerHTML += html;
    }
}