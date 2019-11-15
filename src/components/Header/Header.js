import './Header.scss';
import HeaderTemplate from '../Header/Header.hbs';

import Logo from '../../images/logo.png';
import Lupa from '../../images/zoom.png';
import PadIm from '../../images/arrow.png';
import Plus from '../../images/plus.png';
import Question from '../../images/question.png';
import Dialog from '../../images/dilog.png';
import Setting from '../../images/more.png';
import Bell from '../../images/bell.png';

import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a Header component. */
export default class HeaderComponent {
    /**
     * Header component constructor.
     * @param {object} parent - Root application div.
     * @constructor
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Header component data.
     * @return {object} Header component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Header component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Header component.
     */
    render() {
        this._data = GlobalUser;

        const context = {
            username: this._data.body.user.username,
            avatarPhoto: (this._data.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + this._data.body.user.avatar_dir) : bg,
            notice: 0,

            PHlogo: Logo,
            PHLupa: Lupa,
            PHpadim: PadIm,
            PHplus: Plus,
            PHquestion: Question,
            PHdialog: Dialog,
            PHsetting: Setting,
            PHbell: Bell,
        };
        const html = HeaderTemplate(context);

        this._parent.innerHTML = html;

        // document.getElementById('spanNum').textContent = String(0);
        // setInterval(() => {
        //     fetchModule.Get({
        //         url: BACKEND_ADDRESS + '/notice',
        //         body: null,
        //     })
        //         .then((response) => {
        //             return response.json();
        //         })
        //         .then((responseBody) => {
        //             CSRFtoken = responseBody.csrt_token;

        //             const noticelen = responseBody.body.notices;
        //             document.getElementById('spanNum').textContent = String(noticelen.length);

        //             const list = document.getElementById('list');
        //             for (let i = 0; i < noticelen.length; i++) {
        //                 list.innerHTML += '<li><a href="#">'+ noticelen[i].message + '</li>';
        //             }
        //         });
        // }, 30000);

        const viewSearchForm = document.getElementById('headerSearch');

        viewSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const searchText = viewSearchForm.elements['searchtext'].value;
            fetchModule.Post({
                url: BACKEND_ADDRESS + '/find/pins/by/tag/' + searchText,
                body: null,
            })
                .then((response) => {
                    return response.json();
                })
                .then((responseBody) => {
                    console.log(responseBosy);
                });
        });
    }
}
