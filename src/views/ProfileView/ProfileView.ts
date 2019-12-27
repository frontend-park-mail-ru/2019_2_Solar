import BaseView from '../BaseView/BaseView';

import ProfileViewTemplate from './ProfileView.hbs';
import './ProfileView.scss';

import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView';
import BoardForUserViewComponent from '../../components/BoardForUserView/BoardForUserView';
import Question from '../../images/question2.svg';
import Close from '../../images/closeicon.svg';

import bus from '../../utils/bus';
import i18n from '../../utils/i18n';
import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';

import SetImg from '../../images/graypen.svg';
import PlusImgFAdd from '../../images/grayplus.svg';

import bg from '../../images/bg.png';

import fetchModule from '../../utils/fetchModule';
import {createHeader, deleteHeader} from '../../utils/headerFunc';
import FakeBoardPin from '../../components/FakeBoardPin/FakeBoardPin';
import FakeBoardPinComponent from '../../components/FakeBoardPin/FakeBoardPin';

const PAGE_ADDRESS = '/profile';

/** Class representing a Profile view. */
export default class ProfileView extends BaseView {
    args: object;
    _data: object;
    _avatar: object;

    /**
     * Profile page view constructor.
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
                createHeader();

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                let value = "; " + document.cookie;
                let parts = value.split("; session_key=");
                let cookie;
                if (parts.length == 2) {
                    cookie = parts.pop().split(";").shift();
                }
                const context = {
                    username: responseBody.body.user.username,
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (PIN_ADRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    status: responseBody.body.user.status,
                    PHsetimg: SetImg,
                    PHplus: PlusImgFAdd,
                    PHquestion: Question,
                    sessionID: cookie,
                };
                this.el.innerHTML += ProfileViewTemplate(context);
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
                document.getElementById('changeThemeToLight').addEventListener('click', () => {
                    document.body.removeAttribute('data-theme');
                });
                document.getElementById('changeThemeToDark').addEventListener('click', () => {
                    document.body.setAttribute('data-theme', 'dark');
                });

                /* Открыты доски, когда ты только заходишь на профиль */
                const viewPinBoards = document.getElementById('profilePinsBoardsView');
                const boardViewList = document.getElementById('profileBoards');
                const noBoards = document.getElementById('whenNoBoards');
                const noPins = document.getElementById('whenNoPins');

                boardViewList.className = 'profile-button profile-button_board-pos profile-button_push';

                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/board/list/my',
                    body: null,
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseBody) => {
                        (<any>window).CSRFtoken = responseBody.csrf_token;

                        const boardsProfile = responseBody.body.boards;

                        for (let i = 0; i < boardsProfile.length; i++) {
                            const boardForUserView = new BoardForUserViewComponent(viewPinBoards);
                            boardForUserView.render({id: boardsProfile[i].id, boardImg: boardsProfile[i].view_pin,
                                content: boardsProfile[i].title});
                        }
                        if (boardsProfile.length == 0) {
                            noBoards.className = 'field-with_message';
                        } else {
                            const fakeboard = new FakeBoardPinComponent(viewPinBoards);
                            fakeboard.renderBoard({PHPlus: PlusImgFAdd});
                        }
                    })
                    .catch(() => {
                        noBoards.className = 'field-with_message';
                        return null;
                    });

                /* for pins view */
                const pinViewList = document.getElementById('profilePins');
                pinViewList.addEventListener('click', (e) => {
                    e.preventDefault();

                    viewPinBoards.innerHTML = '';
                    boardViewList.className = 'profile-button profile-button_board-pos';
                    pinViewList.className = 'profile-button profile-button_pin-pos profile-button_push';

                    fetchModule.Get({
                        url: BACKEND_ADDRESS + '/pin/list/my',
                        body: null,
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseBody) => {
                            (<any>window).CSRFtoken = responseBody.csrf_token;

                            const pinsProfile = responseBody.body.pins;
                            for (let i = 0; i < pinsProfile.length; i++) {
                                const pinForUserView = new PinForUserViewComponent(viewPinBoards);
                                pinForUserView.render({id: pinsProfile[i].id, pinImg: PIN_ADRESS + '/' + pinsProfile[i].pin_dir,
                                    content: pinsProfile[i].title});
                            }
                            noBoards.className = 'field-with_message_none';
                            if (pinsProfile.length == 0) {
                                noPins.className = 'field-with_message';
                            } else {
                                const fakepin = new FakeBoardPinComponent(viewPinBoards);
                                fakepin.renderPin({PHPlus: PlusImgFAdd});
                            }
                        })
                        .catch(() => {
                            noBoards.className = 'field-with_message_none';
                            noPins.className = 'field-with_message';
                            return null;
                        });
                });

                /* for boards view */
                boardViewList.addEventListener('click', (e) => {
                    e.preventDefault();

                    viewPinBoards.innerHTML = '';
                    boardViewList.className = 'profile-button profile-button_board-pos profile-button_push';
                    pinViewList.className = 'profile-button profile-button_pin-pos';

                    fetchModule.Get({
                        url: BACKEND_ADDRESS + '/board/list/my',
                        body: null,
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseBody) => {
                            (<any>window).CSRFtoken = responseBody.csrf_token;

                            const boardsProfile = responseBody.body.boards;

                            for (let i = 0; i < boardsProfile.length; i++) {
                                const boardForUserView = new BoardForUserViewComponent(viewPinBoards);
                                boardForUserView.render({id: boardsProfile[i].id, boardImg: boardsProfile[i].view_pin,
                                    content: boardsProfile[i].title});
                            }

                            noPins.className = 'field-with_message_none';
                            if (boardsProfile.length == 0) {
                                noBoards.className = 'field-with_message';
                            } else {
                                const fakeboard = new FakeBoardPinComponent(viewPinBoards);
                                fakeboard.renderBoard({PHPlus: PlusImgFAdd});
                            }
                        })
                        .catch(() => {
                            noPins.className = 'field-with_message_none';
                            noBoards.className = 'field-with_message';
                            return null;
                        });
                });

                // button for chat
                let chatFlag = false;
                const chatField = document.getElementById('supportChat');
                const buttonForAsk = document.getElementById('buttonForAsk');
                buttonForAsk.addEventListener('click', (e) => {
                    if (chatFlag == false) {
                        chatField.className = 'chat-onopen';
                        chatFlag = true;
                        buttonForAsk.setAttribute( 'src', Close);
                    } else {
                        chatField.className = 'dont-see';
                        chatFlag = false;
                        buttonForAsk.setAttribute( 'src', Question);
                    }
                });

                const feedbackForm = <HTMLFormElement> document.getElementById('FeedbackButton');
                feedbackForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const profileMessage = (<HTMLInputElement>document.getElementById('profileMessageTextArea'));
                    const message = profileMessage.value;
                    if (message != '') {
                        const data = {'message': message};

                        fetchModule.PostToSave({
                            url: BACKEND_ADDRESS + '/feedback',
                            body: JSON.stringify(data),
                        })
                            .then((response) => {
                                profileMessage.value = '';
                            });
                    }
                });
            })
            .catch(() => {
                bus.emit('/login', {});
            });
    }
}
