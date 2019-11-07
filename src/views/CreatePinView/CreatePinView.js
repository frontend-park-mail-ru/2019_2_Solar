import BaseView from '../BaseView/BaseView.js';

import CreatePinViewTemplate from './CreatePinView.hbs';
import './CreatePinView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

/** Class representing a CreatePin view. */
export default class CreatePinView extends BaseView {
    /**
     * CreatePin view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el);
        this.args = args;
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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                const context = {
                    title: 'Создание пина',
                };

                this.el.innerHTML += CreatePinViewTemplate(context);

                const createPinForm = document.getElementById('createPinData');

                createPinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    bus.emit('/profile');
                });
            });
    }
}
