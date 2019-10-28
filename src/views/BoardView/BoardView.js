import BaseView from '../BaseView/BaseView.js';

import BoardViewTemplate from './BoardView.hbs';
import './BoardView.scss';

import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView.js';
import HeaderComponent from '../../components/Header/Header.js';

import plusImg from '../../images/plus2.png';
import grayPenImg from '../../images/grey-pen.png';
import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

/** Class representing a BoardView view. */
export default class BoardView extends BaseView {
    /**
     * BoardView view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get BoardView view data.
     * @return {object} BoardView view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set BoardView view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render BoardView view.
     */
    render() {
        fetch(BACKEND_ADDRESS + '/profile/data', {
            method: 'GET',
            body: null,
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                this.data = responseBody;

                const context = {
                    username: this._data.body.user.username,
                    boardName: 'Название доски',
                    pinCount: 1,

                    PHGrayPen: grayPenImg,
                    PHPlus: plusImg,
                };

                this.el.innerHTML += BoardViewTemplate(context);

                const boardViewPinsList = document.getElementById('boardViewPins');
                const pinForUserView = new PinForUserViewComponent(boardViewPinsList);
                pinForUserView.render({pinImg: bg,
                    content: 'Какое-нибудь название с продолжением'});

                /* for picture settings */
                const toSettings = document.getElementById('board-page').querySelectorAll('[data-section=\'settings\']')[0];
                toSettings.addEventListener('click', (e) => {
                    e.preventDefault();
                    bus.emit('/settings');
                });

                /* for pin plus */
                const toCreatePin = document.getElementById('board-page').querySelectorAll('[data-section=\'createPin\']')[0];
                toCreatePin.addEventListener('click', (e) => {
                    e.preventDefault();
                    bus.emit('/create_pin');
                });
            });
    }
}
