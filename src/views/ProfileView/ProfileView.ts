import BaseView from '../BaseView/BaseView';

import ProfileViewTemplate from './ProfileView.hbs';
import './ProfileView.scss';

import HeaderComponent from '../../components/Header/Header';
import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView';
import BoardForUserViewComponent from '../../components/BoardForUserView/BoardForUserView';
import Question from '../../images/question2.svg';
import Close from '../../images/closeicon.svg';

import bus from '../../utils/bus';
import {BACKEND_ADDRESS} from '../../config/Config';

import SetImg from '../../images/graypen.svg';
import PlusImgFAdd from '../../images/grayplus.svg';

import bg from '../../images/bg.png';

import fetchModule from '../../utils/fetchModule';
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

                fetchModule.Post({
                    url: BACKEND_ADDRESS + '/admin/fill',
                    body: null,
                    credentials: 'include',
                    headers: {
                        'csrf-token': (<any>window).CSRFtoken,
                    },
                })
                    .then(() => {});

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.render();

                let value = "; " + document.cookie;
                let parts = value.split("; session_key=");
                let cookie;
                if (parts.length == 2) {
                    cookie = parts.pop().split(";").shift();
                }
                const context = {
                    username: responseBody.body.user.username,
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    status: responseBody.body.user.status,
                    PHsetimg: SetImg,
                    PHplus: PlusImgFAdd,
                    PHquestion: Question,
                    sessionID: cookie,
                };
                this.el.innerHTML += ProfileViewTemplate(context);

                /* Открыты доски, когда ты только заходишь на профиль */
                const viewPinBoards = document.getElementById('profilePinsBoardsView');
                const boardViewList = document.getElementById('profileBoards');
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
                            boardForUserView.render({id: boardsProfile[i].id, boardImg: bg,
                                content: boardsProfile[i].title});
                        }
                    })
                    .catch(() => {
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
                                pinForUserView.render({id: pinsProfile[i].id, pinImg: BACKEND_ADDRESS + '/' + pinsProfile[i].pin_dir,
                                    content: pinsProfile[i].title});
                            }
                        })
                        .catch(() => {
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
                                boardForUserView.render({id: boardsProfile[i].id, boardImg: bg,
                                    content: boardsProfile[i].title});
                            }
                        })
                        .catch(() => {
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
                    const message = feedbackForm.elements['message'].value;
                    if (message != '') {
                        const data = {'message': message};

                        fetchModule.PostToSave({
                            url: BACKEND_ADDRESS + '/feedback',
                            body: JSON.stringify(data),
                        })
                            .then((response) => {
                                feedbackForm.elements['message'].value = '';
                            });
                    }
                });
            })
            .catch(() => {
                bus.emit('/login', {});
            });
    }
}
