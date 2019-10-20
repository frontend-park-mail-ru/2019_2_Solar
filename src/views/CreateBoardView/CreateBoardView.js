import CreateBoardViewTemplate from './CreateBoardView.hbs';
import './CreateBoardView.scss';

import bus from '../../utils/bus.js';

/** Class representing a CreateBoard view. */
export default class CreateBoardView {
    /**
     * CreateBoardView view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
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
        const context = {};

        const html = CreateBoardViewTemplate(context);

        this._parent.innerHTML += html;

        const toProfile = document.getElementById('createboard-page').querySelectorAll('[data-section=\'profile\']')[0];
        toProfile.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-profile');
        });
    }
}
