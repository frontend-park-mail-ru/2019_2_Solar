import bus from './utils/bus';
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
