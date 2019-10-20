import BaseView from '../BaseView/BaseView.js';

import CreateBoardViewTemplate from './CreateBoardView.hbs';
import './CreateBoardView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a CreateBoard view. */
export default class CreateBoardView extends BaseView {
    /**
     * CreateBoardView view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get CreateBoardView view data.
     * @return {object} CreateBoardView view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreateBoardView view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreateBoardView view.
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

                document.body.className = 'backgroundIndex';
                const context = {};
                this.el.innerHTML = CreateBoardViewTemplate(context);
            });
    }
}
