import BaseView from '../BaseView/BaseView.js';

import CreatePinViewTemplate from './CreatePinView.hbs';
import './CreatePinView.scss';

import BoardForCreatePinComponent from '../../components/BoardForCreatePin/BoardForCreatePin.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a CreatePin view. */
export default class CreatePinView extends BaseView {
    /**
     * CreatePin view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get CreatePin view data.
     * @return {object} CreatePin view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreatePin view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreatePin view.
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
                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                const board = new BoardForCreatePinComponent();

                const context = {
                    title: 'Создание пина',
                    board: board.render({boardTitle: 'Какое-нибудь название с продолжением'}),
                };

                this.el.innerHTML = CreatePinViewTemplate(context);
            });
    }
}