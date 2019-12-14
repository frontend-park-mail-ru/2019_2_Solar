import BaseView from '../BaseView/BaseView';
import HeaderComponent from '../../components/Header/Header';

import {BACKEND_ADDRESS} from '../../config/Config';

import './DialogView.scss';
import DialogViewTemplate from '../DialogView/DialogView.hbs';

import Dialog1ViewComponent from '../../components/DialogComponent/Dialog1ViewComponent/Dialog1ViewComponent';
import Dialog3ViewComponent from '../../components/DialogComponent/Dialog3ViewComponent/Dialog3ViewComponent';
import MessageComponent from '../../components/Message/Message';
import ChatRoomComponent from '../../components/ChatRoom/ChatRoom';
import fetchModule from '../../utils/fetchModule';


/** Class representing an Dialog view. */
export default class DialogView extends BaseView {
    args: object;
    _parent: object;

    /**
     * Dialog view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el, {});
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
            .then((responseBodyProfile) => {
                (<any>window).CSRFtoken = responseBodyProfile.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBodyProfile;
                header.render();

                const dialog = DialogViewTemplate();

                this.el.innerHTML += dialog;

                /* Заглушка для отображения диалога */
                const messageView = document.getElementById('dialogview-page');
                messageView.className = 'dialogview__flex-container';

                const dialog1 = new Dialog1ViewComponent(messageView);
                dialog1.render({});

                const allChatsList = document.getElementById('incomingMessagesList');
                chatRoomsView(allChatsList);

                // const chatsList = allChatsList.getElementsByClassName('chatroom');

                /* Далее для обработки сообщений */
                const messageError = document.getElementById('createMessageError');

                const newMessageForm = <HTMLFormElement>document.getElementById('newMessageData');
                newMessageForm.addEventListener('submit', (e)=> {
                    e.preventDefault();
                    createMessageError(messageError, '', '');
                    const username_resipient = newMessageForm.elements['username'].value;

                    fetchModule.Get({
                        url: BACKEND_ADDRESS + '/users/' + username_resipient,
                        body: null,
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseBody) => {
                            if (responseBody.body.user) {
                                messageView.innerHTML = '';
                                const dialog3 = new Dialog3ViewComponent(messageView);
                                dialog3.render({username: username_resipient});
            
                                const messageViewList = document.getElementById('MessagesList');

                                createOldMessages(messageViewList, responseBody.body.user.id, responseBodyProfile.body.user.id);

                                const createMessageForm = <HTMLFormElement> document.getElementById('createMessageData');
                                createMessageForm.addEventListener('submit', (e) => {
                                    e.preventDefault();
            
                                    const message = createMessageForm.elements['message'].value;
                                    if (message != '') {
                                        const newMessage = new MessageComponent(messageViewList);
                                        newMessage.render({messageAuthor: 'Вы:', classForBg: 'your-message_background', messageContent: message});
    
                                        (<any>window).socket1.send(JSON.stringify({id_sender: (<any>window).GlobalUser.body.user.id, username_recipient: responseBody.body.user.username, text: message}));
                
                                        createMessageForm.elements['message'].value = '';
                                    }
                                });
                            } else {
                                createMessageError(messageError, 'Пользователь не найден', 'createmessage-error');
                            }
                        });
                });
            });
    }
}

/**
 * createMessageError
 * @param {*} element
 * @param {string} errorMessage
 * @param {string} classname
 */
function createMessageError(element, errorMessage, classname) {
    element.textContent = errorMessage;
    element.className = classname;
}

/**
 * createOldMessages
 * @param messageViewList 
 */
function createOldMessages(messageViewList, anotherUserId, profileUserId) {
    fetchModule.Get({
        url: BACKEND_ADDRESS + '/chat/messages/' + String(anotherUserId),
        body: null,
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBodyMessages) => {
            if (responseBodyMessages.body.messages) {
                const messages = responseBodyMessages.body.messages;
                for (let i = 0; i < messages.length; i++) {
                    const newMessage = new MessageComponent(messageViewList);
                    if (messages[i].senderId == profileUserId) {
                        newMessage.render({messageAuthor: 'Вы:', classForBg: 'your-message_background', messageContent: messages[i].text});
                    } else {
                        newMessage.render({messageAuthor: messages[i].senderId + '(будет username)' + ':', classForBg: '', messageContent: messages[i].text});
                    }
                }
            }
        });
}

/**
 * chat rooms view
 * @param allChatsList
 */
function chatRoomsView(allChatsList) {
    fetchModule.Get({
        url: BACKEND_ADDRESS + '/chat/recipients',
        body: null,
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            const chats = responseBody;
            for (let i = 0; i < chats.length; i++) {
                if (allChatsList != null) {
                    const newChat = new ChatRoomComponent(allChatsList);
                    newChat.render({chatroomAuthor: chats[i].id_sender + '(будет username)', chatroomContent: chats[i].text});
                }
            }
        });
}
