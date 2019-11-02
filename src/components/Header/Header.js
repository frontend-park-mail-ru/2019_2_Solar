import './Header.scss';
import HeaderTemplate from '../Header/Header.hbs';

import Dialog1ViewComponent from '../DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent.js';
import Dialog3ViewComponent from '../DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent.js';
import MessageComponent from '../Message/Message.js';

import bus from '../../utils/bus.js';

import Logo from '../../images/logo.png';
import Lupa from '../../images/zoom.png';
import PadIm from '../../images/arrow.png';
import Plus from '../../images/plus.png';
import Question from '../../images/question.png';
import Dialog from '../../images/dilog.png';
import Setting from '../../images/more.png';
import Bell from '../../images/bell.png';

import bg from '../../images/bg.png';

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
        const context = {
            username: this._data.body.user.username,
            alertsCount: 10,
            avatarPhoto: (this._data.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + this._data.body.user.avatar_dir) : bg,

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

        this._parent.innerHTML += html;

        /* for picture logo*/
        const toIndex = document.getElementById('header').querySelectorAll('[data-section=\'index\']')[0];
        toIndex.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('/index');
        });

        /* for picture plus*/
        const toCreatePin = document.getElementById('header').querySelectorAll('[data-section=\'create-pin\']')[0];
        toCreatePin.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('/create_pin');
        });

        /* for picture points*/
        const toSettings = document.getElementById('header').querySelectorAll('[data-section=\'settings\']')[0];
        toSettings.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('/settings');
        });

        /* Заглушка для отображения диалога */
        const messageView = document.getElementById('dialogview-page');
        messageView.className = 'dialogview__flex-container';
        let messageViewIsOpen = false;

        const messageImg = document.getElementById('messageImg');
        messageImg.addEventListener('click', (e) => {
            e.preventDefault();

            if (messageViewIsOpen == false) {
                const dialog1 = new Dialog1ViewComponent(messageView);
                messageView.className = 'dialogview__flex-container_height';
                dialog1.render();
                messageViewIsOpen = true;

                const newMessage = document.getElementById('newMessagwButton');
                newMessage.addEventListener('click', (e)=> {
                    messageView.innerHTML = '';
                    const dialog3 = new Dialog3ViewComponent(messageView);
                    dialog3.render();

                    const messageViewList = document.getElementById('MessagesList');

                    const createMessageForm = document.getElementById('createMessageData');
                    createMessageForm.addEventListener('submit', (e) => {
                        e.preventDefault();

                        const message = createMessageForm.elements['message'].value;
                        const newMessage = new MessageComponent(messageViewList);
                        newMessage.render({messageAuthor: this._data.body.user.username, messageContent: message});

                        createMessageForm.elements['message'].value = '';
                    });
                });
            } else {
                messageView.innerHTML = '';
                messageView.className = 'dialogview__flex-container';
                messageViewIsOpen = false;
            }
        });
    }
}
