import BaseView from '../BaseView/BaseView';

import UserViewTemplate from './UserView.hbs';
import './UserView.scss';
import '../ProfileView/ProfileView.scss';

import HeaderComponent from '../../components/Header/Header';
import PinForIndex from '../../components/PinForIndex/PinForIndex';

import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';

import bg from '../../images/bg.png';
import fetchModule from '../../utils/fetchModule';

/** Class representing a User view. */
export default class UserView extends BaseView {
    args: object;
    _data: object;
    _avatar: object;

    /**
     * User page view constructor.
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
     * Get User view data.
     * @return {object} User view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set User view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Set User view avatar.
     * @param {object} avatarData
     */
    set avatar(avatarData) {
        this._avatar = avatarData;
    }

    /**
     * Render User view.
     */
    render() {
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/users/' + this.args,
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;

                const header = new HeaderComponent(this.el);
                header.render();

                const forId = (<any>window).location.pathname;
                const context = {
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (PIN_ADRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    username: responseBody.body.user.username,
                    status: responseBody.body.user.status,
                    forID: forId,
                };
                this.el.innerHTML += UserViewTemplate(context);

                const userPinsView = document.getElementById('userPinsView' + String(forId));
                pinsView(responseBody,userPinsView);

                let isFolloweeflag = false;
                if (responseBody.body.user.is_followee) {
                    isFolloweeflag = true;
                    checkFollowee('buttonSub' + String(forId), 'button-already-subscribe', 'Отписаться');
                }

                const subscribeForm = document.getElementById('userData' + String(forId));
                subscribeForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    if (!isFolloweeflag) {
                        fetchModule.Post({
                            url: BACKEND_ADDRESS + '/subscribe/' + responseBody.body.user.username,
                            body: null,
                        })
                            .then((response) => {
                                if (response.ok) {
                                    isFolloweeflag = true;
                                    checkFollowee('buttonSub' + String(forId), 'button-already-subscribe', 'Отписаться');
                                }
                            });
                    } else {
                        fetchModule.Delete({
                            url: BACKEND_ADDRESS + '/subscribe/' + responseBody.body.user.username,
                            body: null,
                        })
                            .then((response) => {
                                if (response.ok) {
                                    isFolloweeflag = false;
                                    checkFollowee('buttonSub' + String(forId), 'button-subscribe', 'Подписаться');
                                }
                            });
                    }                   
                });
            });
    }
}

/**
 * checkFollowee
 * @param {*} elementID
 * @param {*} className
 * @param {*} text
 */
function checkFollowee(elementID, className, text) {
    const element = <HTMLInputElement> document.getElementById(elementID);
    element.className = className;
    element.value = text;
}

/**
 * pinsView
 * @param responseBody 
 * @param userPinsView 
 */
function pinsView(responseBody, userPinsView) {
    const pinsUser = responseBody.body.pins;
    for (let i = 0; i < pinsUser.length; i++) {
        const pinForUserView = new PinForIndex(userPinsView);
        pinForUserView.render({id: pinsUser[i].id, pinImg: PIN_ADRESS + '/' + pinsUser[i].pin_dir,
            content: pinsUser[i].title});
    }
}