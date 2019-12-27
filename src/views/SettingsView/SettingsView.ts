import BaseView from '../BaseView/BaseView';

import SettingsViewTemplate from './SettingsView.hbs';
import './SettingsView.scss';

import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';
import showFile from '../../utils/readFile';

import FImg from '../../images/edit.svg';
import SImg from '../../images/account.svg';
import TImg from '../../images/themes.svg';
import bg from '../../images/bg.png';

import bus from '../../utils/bus';
import i18n from '../../utils/i18n';
import fetchModule from '../../utils/fetchModule';
import {createHeader, deleteHeader} from '../../utils/headerFunc';

const PAGE_ADDRESS = '/settings';

/** Class representing a Settings view. */
export default class SettingsView extends BaseView {
    args: object;
    _data: object;

    /**
     * Settings view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el, {});
        this.args = args;
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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;
                createHeader();

                document.body.className = 'backgroundIndex';
                this.el.innerHTML = '';
                document.getElementById('changeLangToEng').addEventListener('click', () => {
                    i18n.setLanguage('en');
                    deleteHeader();
                    createHeader();
                    bus.emit(PAGE_ADDRESS, {});
                });
                document.getElementById('changeLangToRu').addEventListener('click', () => {
                    i18n.setLanguage('ru');
                    deleteHeader();
                    createHeader();
                    bus.emit(PAGE_ADDRESS, {});
                });

                const oldusername = responseBody.body.user.username;

                const context = {
                    username: responseBody.body.user.username,
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (PIN_ADRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    status: responseBody.body.user.status,
                    name: responseBody.body.user.name,
                    surname: responseBody.body.user.surname,

                    PHfimg: FImg,
                    PHsimg: SImg,
                    PHtimg: TImg,
                };
                this.el.innerHTML += SettingsViewTemplate(context);

                const imgField = document.getElementById('avatarphoto');
                imgField.addEventListener('change', (e) => {
                    showFile(e, 'avatarPhotoSettings');
                });

                const settingsForm = <HTMLFormElement> document.getElementById('UserSettings');
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

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/profile/data',
                        body: JSON.stringify(data),
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

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/profile/picture',
                        body: formData,
                        credentials: 'include',
                        headers: {
                            'csrf-token': (<any>window).CSRFtoken,
                        },
                    })
                        .then((response) => {
                            if (response.ok) {
                                fetchModule.Get({
                                    url: BACKEND_ADDRESS + '/profile/data',
                                    body: null,
                                })
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((responseBody) => {
                                        (<any>window).GlobalUser = responseBody;
                                        (<any>window).CSRFtoken = responseBody.csrf_token;
                                        const changeHeaderPhoto = document.getElementById('avatarPhotoHeader');
                                        changeHeaderPhoto.setAttribute('src', (responseBody.body.user.avatar_dir) ? (PIN_ADRESS + '/' + responseBody.body.user.avatar_dir) : bg);
                                        console.log('hey');
                                        const changeHeaderNickname = document.getElementById('nicknameHeader');
                                        changeHeaderNickname.textContent = responseBody.body.user.username;

                                        bus.emit('/profile', {});
                                    });
                            } else {
                                if (dataresponse) {
                                    fetchModule.Get({
                                        url: BACKEND_ADDRESS + '/profile/data',
                                        body: null,
                                    })
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((responseBody) => {
                                            (<any>window).GlobalUser = responseBody;
                                            (<any>window).CSRFtoken = responseBody.csrf_token;
                                            const changeHeaderNickname = document.getElementById('nicknameHeader');
                                            changeHeaderNickname.textContent = responseBody.body.user.username;
    
                                            bus.emit('/profile', {});
                                        });
                                }
                            }
                        });
                });
            });
    }
}
