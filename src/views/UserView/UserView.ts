import BaseView from '../BaseView/BaseView';

import UserViewTemplate from './UserView.hbs';
import './UserView.scss';
import '../ProfileView/ProfileView.scss';

import HeaderComponent from '../../components/Header/Header';
// import PinForIndexComponent from '../../components/PinForIndex/PinForIndex';

// import bus from '../../utils/bus';
import {BACKEND_ADDRESS} from '../../config/Config';

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

                const context = {
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    username: responseBody.body.user.username,
                    status: responseBody.body.user.status,
                };
                this.el.innerHTML += UserViewTemplate(context);

                if (responseBody.body.user.is_followee) {
                    checkFollowee('buttonSub', 'button-already-subscribe');
                }

                const subscribeForm = document.getElementById('userData');
                subscribeForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/subscribe/' + responseBody.body.user.username,
                        body: null,
                    })
                        .then((response) => {
                            if (response.ok) {
                                checkFollowee('buttonSub', 'button-already-subscribe');
                                const message = 'На вас подписался ' + (<any>window).GlobalUser.body.user.username;

                                fetchModule.Post({
                                    url: BACKEND_ADDRESS + '/notice/' + responseBody.body.user.id,
                                    body: JSON.stringify({message: message}),
                                });
                            }
                        });
                });
            });
    }
}

/**
 * checkFollowee
 * @param {*} elementID
 * @param {*} className
 */
function checkFollowee(elementID, className) {
    const element = <HTMLInputElement> document.getElementById(elementID);
    element.disabled = true;
    element.className = className;
    element.value = 'Вы подписаны';
}