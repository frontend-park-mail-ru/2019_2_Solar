import BaseView from '../BaseView/BaseView.js';

import UserViewTemplate from './UserView.hbs';
import './UserView.scss';
import '../ProfileView/ProfileView.scss';

import HeaderComponent from '../../components/Header/Header.js';
// import PinForIndexComponent from '../../components/PinForIndex/PinForIndex.js';

/* import bus from '../../utils/bus.js';
import {BACKEND_ADDRESS} from '../../config/Config.js'; */

import bg from '../../images/bg.png';

/** Class representing a User view. */
export default class UserView extends BaseView {
    /**
     * User page view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
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
        const header = new HeaderComponent(this.el);
        header.render();

        const context = {
            avatarphoto: bg,
            username: 'Username',
            status: 'Status',
        };
        this.el.innerHTML += UserViewTemplate(context);
    }
}