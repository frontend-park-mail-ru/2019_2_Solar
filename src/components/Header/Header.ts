import './Header.scss';
import HeaderTemplate from '../Header/Header.hbs';

import Logo from '../../images/logo.png';
import Lupa from '../../images/search.svg';
import PadIm from '../../images/arrow.png';
import Plus from '../../images/plus.svg';
import Question from '../../images/question2.svg';
import Dialog from '../../images/message.svg';
import Setting from '../../images/more.png';
import Bell from '../../images/notifications.svg';
import bg from '../../images/bg.png';
import fetchModule from '../../utils/fetchModule';

import {BACKEND_ADDRESS} from '../../config/Config';

/** Class representing a Header component. */
export default class HeaderComponent {
    _parent: HTMLElement;
    _data: any;

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
        this._data = (<any>window).GlobalUser;

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

        const viewSearchForm = <HTMLFormElement> document.getElementById('headerSearch');

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
                    console.log(responseBody);
                });
        });

        if ((<any>window).chatMessages) {
            const sectionFind = document.querySelectorAll('[data-page=\''+ (<any>window).location.pathname + '\']')[0];
            const notice = sectionFind.querySelectorAll('[id=\'spanNum\']')[0];
            if (notice != null) {
                const notices = (<any>window).chatMessages.getNotice();
                for (let i =0; i < notices.length; i++) {
                    notice.textContent = String(Number(notice.textContent) + 1);
                    const list = sectionFind.querySelectorAll('[id=\'list\']')[0];
                    list.innerHTML += '<li><a href="#">Вам написал '+ notices[i].username + ': "' + notices[i].text + '"</li>';
                }
            }
        }
    }
}
