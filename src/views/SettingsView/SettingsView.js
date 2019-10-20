import bus from '../../utils/bus.js';
import './SettingsView.scss';
import SettingsViewTemplate from './SettingsView.hbs';

import FImg from '../../images/edit.svg';
import SImg from '../../images/account.svg';
import TImg from '../../images/themes.svg';
// import FoImg from '../../images/bg.png';

/** Class representing a Settings view. */
export default class SettingsView {
    /**
     * Settings view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Settings view data.
     * @return {object} Settings view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Get Settings view data.
     * @param {object} dataToSet view data.
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Settings view.
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
        const html = SettingsViewTemplate(context);

        this._parent.innerHTML += html;

        const toProfile = document.getElementById('settings-page').querySelectorAll('[data-section=\'profile\']')[0];
        toProfile.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-profile');
        });
    }
}
