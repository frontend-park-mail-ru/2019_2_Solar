import BaseView from '../BaseView/BaseView.js';

import UserViewTemplate from './UserView.hbs';
import './UserView.scss';
import '../ProfileView/ProfileView.scss';

import HeaderComponent from '../../components/Header/Header.js';
// import PinForIndexComponent from '../../components/PinForIndex/PinForIndex.js';

// import bus from '../../utils/bus.js';
import {BACKEND_ADDRESS} from '../../config/Config.js';

import bg from '../../images/bg.png';

/** Class representing a User view. */
export default class UserView extends BaseView {
    /**
     * User page view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el);
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
                CSRFtoken = responseBody.csrf_token;

                const header = new HeaderComponent(this.el);
                header.render();

                const context = {
                    avatarphoto: (responseBody.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + responseBody.body.user.avatar_dir) : bg,
                    username: responseBody.body.user.username,
                    status: responseBody.body.user.status,
                };
                this.el.innerHTML += UserViewTemplate(context);

                const subscribeForm = document.getElementById('userData');
                subscribeForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/subscribe/' + responseBody.body.user.username,
                        body: null,
                    })
                        .then((response) => {
                            if (response.ok) {
                                document.getElementById('buttonSub').disabled = true;
                                const message = 'На вас подписался ' + GlobalUser.body.user.username;

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
