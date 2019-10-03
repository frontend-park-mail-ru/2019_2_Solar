import './Settings.scss';
import SettingsTemplate from '../Settings/Settings.hbs';

import FImg from '../../images/edit.svg';
import SImg from '../../images/account.svg';
import TImg from '../../images/themes.svg';
// import FoImg from '../../images/bg.png';

/** Class representing a Settings component. */
export class SettingsComponent {
    /**
     * Settings component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Settings component data.
     * @return {object} Settings component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Get Settings component data.
     * @param {object} dataToSet component data.
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Settings component.
     */
    render() {
        const context = {
            username: this._data.body.user.username,
            // avatarphoto: FoImg,
            status: this._data.body.user.status,
            name: this._data.body.user.name,
            surname: this._data.body.user.surname,

            PHfimg: FImg,
            PHsimg: SImg,
            PHtimg: TImg,
        };
        const html = SettingsTemplate(context);

        this._parent.innerHTML += html;
    }
}
