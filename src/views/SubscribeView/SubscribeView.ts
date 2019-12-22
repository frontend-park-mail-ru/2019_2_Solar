import BaseView from '../BaseView/BaseView';

import PinForIndex from '../../components/PinForIndex/PinForIndex';
import UserForSearch from '../../components/UserForSearch/UserForSearch';
import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';

import './SubscribeView.scss';
import SubscribeViewTemplate from '../SubscribeView/SubscribeView.hbs';
import fetchModule from '../../utils/fetchModule';
import {createHeader} from '../../utils/headerFunc';

/** Class representing an Index view. */
export default class subscribeView extends BaseView {
    args: object;
    _parent: HTMLElement;

    /**
     * Index view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args, parent = document.body) {
        super(el, {});
        this.args = args;
        this._parent = parent;
    }

    /**
     * Render Index view.
     */
    render() {
        fetchModule.Get ({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).GlobalUser = responseBody;
                (<any>window).CSRFtoken = responseBody.csrf_token;
                createHeader();

                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/pin/list/subscribe',
                    body: null,
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseBody) => {
                        (<any>window).CSRFtoken = responseBody.csrf_token;

                        document.body.className ='backgroundIndex';
                        this.el.innerHTML = '';

                        const sub = SubscribeViewTemplate({arg: this.args});
                        this.el.innerHTML += sub;

                        const subBody = responseBody;
                        createSubscribe(this.args, subBody);
                    });
                });
    }
}

/**
 * create subscribe
 * @param args
 */
function createSubscribe(args, subBody) {
    const indexPage = document.getElementById('subscribe-page:' + args);
    fetchModule.Get({
        url: BACKEND_ADDRESS + '/followee',
        body: null,
    })
        .then((response) => {
            return response.json();
        })
        .then((responseBody) => {
            if (responseBody.body) {
                if (responseBody.body.length != 0) {
                    const usersSearch = responseBody.body;

                    for (let i = 0; i < usersSearch.length; i++) {
                        const UserForSearchView = new UserForSearch(indexPage);
                        UserForSearchView.render({
                            username: usersSearch[i].username,
                            userImg: (usersSearch[i].avatar_dir) ? (PIN_ADRESS + '/' + usersSearch[i].avatar_dir) : bg});
                    }
                } else {
                    indexPage.innerHTML = '<div class="for-subscribe_none">У вас сейчас нет активных подписок.' + 
                    '<br>Чтобы подписаться на другого пользователя нужно перейти на его личную страницу и нажать на кнопку "Подписаться".</div>';
                }
            }
            createPinsSubscribe(subBody, args);
        });
}

/**
 * create pins
 * @param responseBody 
 */
function createPinsSubscribe(responseBody, args) {
    const subscribePage = document.getElementById('subscribe-page-pins:' + args);
    if (responseBody.body.pins) {
        const pinsIndex = responseBody.body.pins;

        for (let i = 0; i < pinsIndex.length; i++) {
            const pinForIndexView = new PinForIndex(subscribePage);
            pinForIndexView.render({
                id: pinsIndex[i].id,
                pinImg: PIN_ADRESS + '/' + pinsIndex[i].pin_dir,
                content: pinsIndex[i].title});
        }
    } else {
        subscribePage.textContent = 'Ещё нет пинов для Вашего просмотра :с';
    }
}
