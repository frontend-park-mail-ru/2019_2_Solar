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

        if (this._data.body) {
            context['username'] = this._data.body.user.username;
            context['avatarPhoto'] = (this._data.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + this._data.body.user.avatar_dir) : bg;
            
            const html = HeaderTemplate(context);
            this._parent.innerHTML = html;

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
        } else {
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
                    (<any>window).GlobalUser = responseBody;
                    this.data(responseBody);

                    context['username'] = this._data.body.user.username;
                    context['avatarPhoto'] = (this._data.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + this._data.body.user.avatar_dir) : bg;
                    
                    const html = HeaderTemplate(context);
                    this._parent.innerHTML = html;

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
                });
        }

        // const section = document.querySelectorAll('[data-page=\''+ (<any>window).location.pathname + '\']')[0];
        // const searchForm = <HTMLFormElement>section.querySelectorAll('[id=\'headerSearch\']')[0];
        // searchForm.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     console.log('ok');
        // });


        // console.log(section);
    }
}
