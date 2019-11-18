import BaseView from '../BaseView/BaseView';

import PinEditingViewTemplate from './PinEditingView.hbs';
import './PinEditingView.scss';
import '../CreatePinView/CreatePinView.scss';

import HeaderComponent from '../../components/Header/Header';

import {BACKEND_ADDRESS} from '../../config/Config';
import bus from '../../utils/bus';

import bg from '../../images/bg.png';
import fetchModule from '../../utils/fetchModule';

/** Class representing a PinEditing view. */
export default class PinEditingView extends BaseView {
    args: object;
    _data: object;

    /**
     * PinEditing view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el, {});
        this.args = args;
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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                this.data = responseBody;

                // Вставить нормальные значения
                const context = {
                    pinName: 'Название пина',
                    content: 'Интересный контент',
                    pinImg: bg,
                };

                this.el.innerHTML += PinEditingViewTemplate(context);

                const pinEditingForm = document.getElementById('PinEditingData');
                pinEditingForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    bus.emit('/profile', {});
                });
            });
    }
}
