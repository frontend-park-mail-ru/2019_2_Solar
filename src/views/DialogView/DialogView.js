import BaseView from '../BaseView/BaseView.js';
import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

import './DialogView.scss';
import DialogViewTemplate from '../DialogView/DialogView.hbs';

import Dialog1ViewComponent from '../../components/DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent.js';
import Dialog3ViewComponent from '../../components/DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent.js';
import MessageComponent from '../../components/Message/Message.js';


/** Class representing an Dialog view. */
export default class DialogView extends BaseView {
    /**
     * Dialog view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el);
        this.args = args;
        this._parent = parent;
    }

    /**
     * Render Dialog view.
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
                CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                const dialog = DialogViewTemplate();

                this.el.innerHTML += dialog;

                /* Заглушка для отображения диалога */
                const messageView = document.getElementById('dialogview-page');
                messageView.className = 'dialogview__flex-container';

                const dialog1 = new Dialog1ViewComponent(messageView);
                dialog1.render();

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
                        newMessage.render({messageAuthor: 'Username', messageContent: message});

                        createMessageForm.elements['message'].value = '';
                    });
                });
            });
    }
}
