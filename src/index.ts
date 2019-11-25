import bus from './utils/bus';
import MessageComponent from './components/Message/Message';
import ProfileView from './views/ProfileView/ProfileView';
import LoginView from './views/LoginView/LoginView';
import SignUpView from './views/SignUpView/SignUpView';
import IndexView from './views/IndexView/IndexView';
import SettingsView from './views/SettingsView/SettingsView';
import CreatePinView from './views/CreatePinView/CreatePinView';
import BoardView from './views/BoardView/BoardView';
import BoardChangeView from './views/BoardChangeView/BoardChangeView';
import PinEditingView from './views/PinEditingView/PinEditingView';
import PinView from './views/PinView/PinView';
import DialogView from './views/DialogView/DialogView';
import UserView from './views/UserView/UserView';
import SearchView from './views/SearchView/SearchView';
import {deleteCookie} from './utils/deleteCookies';
import './scss/base.scss';
import Router from './utils/router';
import {BACKEND_ADDRESS} from './config/Config';
import {WS_BACKEND_ADDRESS} from './config/Config';
import CreateBoardView from './views/CreateBoardView/CreateBoardView';
import fetchModule from './utils/fetchModule';

const application = document.getElementById('application');


bus.on('create-logout', () => {
    deleteCookie();
    bus.emit('/login', {});
});

// Create a router, register paths and start it.
const router = new Router(application);
router
    .register('/', SignUpView)
    .register('/login', LoginView)
    .register('/settings', SettingsView)
    .register('/profile', ProfileView)
    .register('/create_pin', CreatePinView)
    .register('/pin/:id', PinView)
    .register('/pin_change', PinEditingView)
    .register('/create_board', CreateBoardView)
    .register('/board_change', BoardChangeView)
    .register('/dialog', DialogView)
    .register('/board/:id', BoardView)
    .register('/users/:username', UserView)
    .register('/search', SearchView)
    .register('/index/:type', IndexView);

(<any>window).CSRFtoken = '';

// Startup logic
fetchModule.Get({
    url: BACKEND_ADDRESS + '/profile/data',
    body: null,
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            router.open('/');
        }
    })
    .then((responseBody) => {
        (<any>window).GlobalUser = responseBody;
    });

router.start();

// CHAT
(<any>window).socket1 = new WebSocket(WS_BACKEND_ADDRESS + '/chat');

(<any>window).socket1.onopen = function(result) {
    console.log('Соединение установлено на 8080');
};

(<any>window).socket1.onclose = function(event) {
if (event.wasClean) {
    console.log('cоединение закрыто чисто на 8080');
} else {
    console.log('соединение - обрыв на 8080');
}
};

(<any>window).socket1.onmessage = function(event) {
    const data = JSON.parse(event.data);

    const messageList = document.getElementById('MessagesList');
    if (messageList != null) {
        const recipientName = document.getElementById('chatUser').textContent;

        if (recipientName == data.user_name_sender) {
            const newMessage = new MessageComponent(messageList);
            newMessage.render({messageAuthor: data.user_name_sender, classForBg: '', messageContent: data.text});
        }
    }

    const allMessageList = document.getElementById('incomingMessagesList'); 
    if (allMessageList != null) {
        const newMessage = new MessageComponent(allMessageList);
        newMessage.render({messageAuthor: data.user_name_sender, classForBg: '', messageContent: data.text});
    }

    const sectionFind = document.querySelectorAll('[data-page=\''+ (<any>window).location.pathname + '\']')[0];
    const notice = sectionFind.querySelectorAll('[id=\'spanNum\']')[0];
    if (notice != null) {
        notice.textContent = String(Number(notice.textContent) + 1);
        const list = sectionFind.querySelectorAll('[id=\'list\']')[0];
        list.innerHTML += '<li><a href="#">Вам написал '+ data.user_name_sender + ': "' + data.text + '"</li>';
    }
};

(<any>window).socket1.onerror = function(event) {
    console.log("ошибка " + event.message);
};
