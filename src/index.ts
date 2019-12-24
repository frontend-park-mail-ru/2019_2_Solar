import bus from './utils/bus';
import MessageComponent from './components/Message/Message';
import ProfileView from './views/ProfileView/ProfileView';
import LoginView from './views/LoginView/LoginView';
import SignUpView from './views/SignUpView/SignUpView';
import IndexView from './views/IndexView/IndexView';
import SubscribeView from './views/SubscribeView/SubscribeView';
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
import chatModule from './utils/chatModule';
import {createHeader} from './utils/headerFunc';
import {deleteHeader} from './utils/headerFunc';
import preloaderImg from './images/preload.svg';

const application = document.getElementById('application');
const applicationHeader = document.getElementById('applicationHeader');

bus.on('create-logout', () => {
    deleteCookie();
    bus.emit('/login', {});
});

// Create a router, register paths and start it.
const router = new Router(application, applicationHeader);
router
    .register('/', SignUpView)
    .register('/login', LoginView)
    .register('/settings', SettingsView)
    .register('/profile', ProfileView)
    .register('/create_pin', CreatePinView)
    .register('/pin/:id', PinView)
    .register('/pin_change/:id', PinEditingView)
    .register('/create_board', CreateBoardView)
    .register('/board_change', BoardChangeView)
    .register('/dialog', DialogView)
    .register('/board/:id', BoardView)
    .register('/users/:username', UserView)
    .register('/search/:type', SearchView)
    .register('/index/:type', IndexView)
    .register('/subscribe:type', SubscribeView);

(<any>window).CSRFtoken = '';

document.getElementById("preloaderImg").setAttribute('src',preloaderImg);
(<any>window).addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    loader.className += ' hidden';
});

// ServiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('ServiceWorker registration', registration);
        })
        .catch((err) => {
            console.error(err);
        });
}

// Startup logic
fetchModule.Get({
    url: BACKEND_ADDRESS + '/profile/data',
    body: null,
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            deleteHeader();
            router.open('/');
        }
    })
    .then((responseBody) => {
        (<any>window).GlobalUser = responseBody;
        createHeader();
    });

router.start();

// CHAT
(<any>window).socket1 = new WebSocket(WS_BACKEND_ADDRESS + '/chat');
(<any>window).chatMessages = new chatModule();

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
            newMessage.render({messageAuthor: data.user_name_sender + ':', classForBg: '', messageContent: data.text});
        }
    }

    const imgNotice = document.getElementById('noticeView');
    const notice = document.getElementById('spanNum');

    imgNotice.className = 'bell-img dialog__items';
    notice.className = 'alerts-count';

    if (notice != null) {
        notice.textContent = String(Number(notice.textContent) + 1);
        const list = document.getElementById('list');
        list.innerHTML += '<li><a href="#">Вам написал '+ data.user_name_sender + ': "' + data.text + '"</li>';
    }

    (<any>window).chatMessages.addData(data.user_name_sender, data.text);
};

(<any>window).socket1.onerror = function(event) {
    console.log("ошибка " + event.message);
};
