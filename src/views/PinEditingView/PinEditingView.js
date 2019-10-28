import BaseView from '../BaseView/BaseView.js';

import PinEditingViewTemplate from './PinEditingView.hbs';
import './PinEditingView.scss';
import '../CreatePinView/CreatePinView.scss';

import BoardForCreatePinComponent from '../../components/BoardForCreatePin/BoardForCreatePin.js';
import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a PinEditing view. */
export default class PinEditingView extends BaseView {
    /**
     * PinEditing view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get PinEditing view data.
     * @return {object} PinEditing view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set PinEditing view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render PinEditing view.
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

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                this.data = responseBody;

                const board = new BoardForCreatePinComponent();

                // Вставить нормальные значения
                const context = {
                    pinName: 'Название пина',
                    content: 'Интересный контент',
                    boardForPins: board.render({boardTitle: 'Какое-нибудь название с продолжением'}),
                };

                this.el.innerHTML = PinEditingViewTemplate(context);
            });
    }
}
