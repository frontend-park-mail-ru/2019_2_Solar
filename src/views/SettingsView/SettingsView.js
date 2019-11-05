import BaseView from '../BaseView/BaseView.js';

import SettingsViewTemplate from './SettingsView.hbs';
import './SettingsView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

import FImg from '../../images/edit.svg';
import SImg from '../../images/account.svg';
import TImg from '../../images/themes.svg';
import bg from '../../images/bg.png';

import bus from '../../utils/bus.js';

/** Class representing a Settings view. */
export default class SettingsView extends BaseView {
    /**
     * Settings view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
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
        fetch(BACKEND_ADDRESS + '/profile/data', {
            method: 'GET',
            body: null,
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const {error} = JSON.parse(response);
                    alert(error);
                }
            })
            .then((responseBody) => {
                document.body.className = 'backgroundIndex';
                this.el.innerHTML = '';

                const oldusername = responseBody.body.user.username;

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                // this.data = responseBody;

                const context = {
                    username: responseBody.body.user.username,
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    status: responseBody.body.user.status,
                    name: responseBody.body.user.name,
                    surname: responseBody.body.user.surname,

                    PHfimg: FImg,
                    PHsimg: SImg,
                    PHtimg: TImg,
                };
                this.el.innerHTML += SettingsViewTemplate(context);

                const settingsForm = document.getElementById('UserSettings');

                settingsForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const data = {
                        'name': settingsForm.elements['name'].value,
                        'surname': settingsForm.elements['surname'].value,
                        'status': settingsForm.elements['status'].value,
                    };

                    if (oldusername != settingsForm.elements['username'].value) {
                        data['username'] = settingsForm.elements['username'].value;
                    }

                    let dataresponse = true;

                    fetch(BACKEND_ADDRESS + '/profile/data', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    })
                        .then((response) => {
                            if (response.ok) {
                                dataresponse = true;
                            } else {
                                dataresponse = false;
                                alert('Ошибка введённых данных');
                            }
                        });

                    const formData = new FormData();
                    formData.append('profilePicture', settingsForm.elements['avatarphoto'].files[0]);

                    fetch(BACKEND_ADDRESS + '/profile/picture', {
                        method: 'POST',
                        body: formData,
                        credentials: 'include',
                    })
                        .then((response) => {
                            if (response.ok) {
                                bus.emit('/profile');
                            } else {
                                if (dataresponse) {
                                    bus.emit('/profile');
                                } else {
                                    createSettings();
                                }
                            }
                        });
                });
            });
    }
}
