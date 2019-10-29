import BaseView from '../BaseView/BaseView.js';

import ProfileViewTemplate from './ProfileView.hbs';
import './ProfileView.scss';

import HeaderComponent from '../../components/Header/Header.js';
import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView.js';
import BoardForUserViewComponent from '../../components/BoardForUserView/BoardForUserView.js';

import bus from '../../utils/bus.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import SetImg from '../../images/grey-pen.png';
import PlusImgFAdd from '../../images/plus2.png';

import bg from '../../images/bg.png';

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
                document.body.className ='backgroundIndex';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;

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

                /* Открыты доски, когда ты только заходишь на профиль */
                const viewPinBoards = document.getElementById('profilePinsBoardsView');
                const boardForUserView = new BoardForUserViewComponent(viewPinBoards);
                boardForUserView.render({boardImg: bg,
                    content: 'Какое-нибудь название с продолжением'});

                const boardViewList = document.getElementById('profileBoards');
                boardViewList.className = 'profile-button profile-button_board-pos profile-button_push';

                /* for picture settings */
                const toSettings = document.getElementById('profile-page').querySelectorAll('[data-section=\'settings\']')[0];
                toSettings.addEventListener('click', (e) => {
                    e.preventDefault();
                    bus.emit('/settings');
                });

                /* for pins view */
                const pinViewList = document.getElementById('profilePins');
                pinViewList.addEventListener('click', (e) => {
                    e.preventDefault();

                    viewPinBoards.innerHTML = '';
                    boardViewList.className = 'profile-button profile-button_board-pos';
                    pinViewList.className = 'profile-button profile-button_pin-pos profile-button_push';

                    const pinForUserView = new PinForUserViewComponent(viewPinBoards);
                    pinForUserView.render({pinImg: bg,
                        content: 'Какое-нибудь название с продолжением'});
                });

                /* for boards view */
                boardViewList.addEventListener('click', (e) => {
                    e.preventDefault();

                    viewPinBoards.innerHTML = '';
                    boardViewList.className = 'profile-button profile-button_board-pos profile-button_push';
                    pinViewList.className = 'profile-button profile-button_pin-pos';

                    boardForUserView.render({boardImg: bg,
                        content: 'Какое-нибудь название с продолжением'});
                });
            })
            .catch(() => {
                alert('Ошибка авторизации');
                bus.emit('/login');
            });
    }
}
