import bus from '../../utils/bus.js';
import './Profile.scss';
import ProfileTemplate from '../Profile/Profile.hbs';
import SetImg from '../../images/grey-pen.png';
import PlusImgFAdd from '../../images/plus2.png';

/** Class representing a Profile component. */
export class ProfileComponent {
    /**
     * Profile page component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Profile component data.
     * @return {object} Profile component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Profile component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Set Profile component avatar.
     * @param {object} avatarData
     */
    set avatar(avatarData) {
        this._avatar = avatarData;
    }

    /**
     * Render Profile component.
     */
    render() {
        const context = {
            username: this._data.body.user.username,
            // avatarphoto: this._avatar,
            status: this._data.body.user.status,

            PHsetimg: SetImg,
            PHplus: PlusImgFAdd,
        };
        const html = ProfileTemplate(context);

        this._parent.innerHTML += html;

        const toSettings = document.getElementById('profile-page').querySelectorAll('[data-section=\'settings\']')[0];
        toSettings.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-settings');
        });

        const toCreatePin = document.getElementById('profile-page').querySelectorAll('[data-section=\'createpin\']')[0];
        toCreatePin.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-createpin');
        });

        const toLogout = document.getElementById('profile-page').querySelectorAll('[data-section=\'logout\']')[0];
        toLogout.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-logout');
        });
    }
}
