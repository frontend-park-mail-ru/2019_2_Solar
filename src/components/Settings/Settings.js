import './Settings.scss';
import settingstemplate from '../../templates/settings.hbs';

import FImg from '../../images/24px.svg';
import SImg from '../../images/24px (3).svg';
import TImg from '../../images/24px (1).svg';
import FoImg from '../../images/bg.png';


export class SettingsComponent {
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
        const context = { 
            username: this._data.username, 
            avatarphoto: FoImg,
            status: this._data.status,
            name: this._data.name,
            surname: this._data.surname,

            PHfimg: FImg,
            PHsimg: SImg,
            PHtimg: TImg,
        };
        const html = settingstemplate(context);

        this._parent.innerHTML += html;
    }
}