import bus from './utils/bus.js';
import FetchModule from './utils/fetchModule.js';
import ProfileView from './views/ProfileView/ProfileView.js';
import LoginView from './views/LoginView/LoginView.js';
import SignUpView from './views/SignUpView/SignUpView.js';
import IndexView from './views/IndexView/IndexView.js';
import SettingsView from './views/SettingsView/SettingsView.js';
import CreatePinView from './views/CreatePinView/CreatePinView.js';
import BoardView from './views/BoardView/BoardView.js';
import BoardChangeView from './views/BoardChangeView/BoardChangeView.js';
import PinEditingView from './views/PinEditingView/PinEditingView.js';
import PinView from './views/PinView/PinView.js';
import DialogView from './views/DialogView/DialogView.js';
import UserView from './views/UserView/UserView.js';
import {deleteCookie} from './utils/deleteCookies.js';
import './scss/base.scss';
import Router from './utils/router.js';
import {BACKEND_ADDRESS} from './config/Config.js';
import CreateBoardView from './views/CreateBoardView/CreateBoardView.js';

const application = document.getElementById('application');

bus.on('create-logout', () => {
    deleteCookie();
    bus.emit('/login');
});

// Create a router, register paths and start it.
const router = new Router(application);
router
    .register('/', SignUpView)
    .register('/login', LoginView)
    .register('/settings', SettingsView)
    .register('/profile', ProfileView)
    .register('/create_pin', CreatePinView)
    .register('/pin_editing', PinEditingView)
    .register('/create_board', CreateBoardView)
    .register('/board', BoardView)
    .register('/pin', PinView)
    .register('/board_change', BoardChangeView)
    .register('/dialog', DialogView)
    .register('/user', UserView)
    .register('/board/:id', BoardView)
    .register('/index', IndexView);

window.CSRFtoken = "";
window.fetchModule = new FetchModule(application);

// Startup logic
fetchModule.Get({
    url: BACKEND_ADDRESS + '/profile/data',
    body: null,
})
    .then((response) => {
        if (response.ok) {
            window.socket = new WebSocket('ws://localhost:8080' + '/chat');

            socket.onopen = function(result) {
                console.log('onopen');
            };
            socket.onmessage = function(result) {
                console.log(result);
            };

            router.open('/profile');
            return response.json();
        } else {
            router.open('/');
        }
    })
    .then((responseBody) => {
        window.GlobalUser = responseBody;
    });

router.start();
