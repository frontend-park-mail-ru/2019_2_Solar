import BaseView from '../BaseView/BaseView.js';

import ProfileViewTemplate from './ProfileView.hbs';
import './ProfileView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import bus from '../../utils/bus.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import SetImg from '../../images/grey-pen.png';
import PlusImgFAdd from '../../images/plus2.png';

/** Class representing a Profile view. */
export default class ProfileView extends BaseView {
    /**
     * Profile page view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get Profile view data.
     * @return {object} Profile view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Profile view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Set Profile view avatar.
     * @param {object} avatarData
     */
    set avatar(avatarData) {
        this._avatar = avatarData;
    }

    /**
     * Render Profile view.
     */
    render() {
        fetch(BACKEND_ADDRESS + '/profile/data', {
            method: 'GET',
            body: null,
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                const header = new HeaderComponent(this.el);
                header.data = responseBody;

                document.body.className ='backgroundIndex';
                const context = {
                    username: responseBody.body.user.username,
                    // avatarphoto: this._avatar,
                    status: responseBody.body.user.status,

                    PHsetimg: SetImg,
                    PHplus: PlusImgFAdd,
                };
                this.el.innerHTML = ProfileViewTemplate(context);

                let avaflag = false;

                fetch(BACKEND_ADDRESS + '/profile/picture', {
                    method: 'GET',
                    body: null,
                    credentials: 'include',
                })
                    .then((response) => {
                        if (response.ok) {
                            avaflag = true;
                        }
                        return response.blob();
                    })
                    .then(function(blob) {
                        if (avaflag) {
                            const objectURL = URL.createObjectURL(blob);

                            const avaimg = document.getElementById('avatarPhotoI');
                            avaimg.src = objectURL;

                            const avaimgHeader = document.getElementById('avatarPhotoHeader');
                            avaimgHeader.src = objectURL;
                        }
                    });

                header.render();

                /* for picture settings */
                const toSettings = document.getElementById('profile-page').querySelectorAll('[data-section=\'settings\']')[0];
                toSettings.addEventListener('click', (e) => {
                    e.preventDefault();
                    bus.emit('/settings');
                });
            })
            .catch(() => {
                alert('Ошибка авторизации');
                bus.emit('/login');
            });
    }
}
