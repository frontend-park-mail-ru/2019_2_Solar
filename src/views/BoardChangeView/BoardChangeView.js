import BaseView from '../BaseView/BaseView.js';

import BoardChangeViewTemplate from './BoardChangeView.hbs';
import './BoardChangeView.scss';

import PinForBoardEditingComponent from '../../components/PinForBoardEditing/PinForBoardEditing.js';
import HeaderComponent from '../../components/Header/Header.js';

import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

/** Class representing a BoardChange view. */
export default class BoardChangeView extends BaseView {
    /**
     * BoardChange view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get BoardChange view data.
     * @return {object} BoardChange view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set BoardChange view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render BoardChange view.
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

                const pinForBoardEditing = new PinForBoardEditingComponent();

                // Вставить нормальные значения
                const context = {
                    boardName: 'Название доски',
                    content: 'Интересный контент',
                    pinForBoardEditing: pinForBoardEditing.render({pinImg: bg,
                        content: 'Какое-нибудь название с продолжением'}),
                };

                this.el.innerHTML += BoardChangeViewTemplate(context);

                const boardChangeForm = document.getElementById('BoardChangeData');
                boardChangeForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    bus.emit('/profile');
                });
            });
    }
}
