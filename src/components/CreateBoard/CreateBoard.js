import CreateBoardTemplate from '../CreateBoard/CreateBoard.hbs';
import './CreateBoard.scss';

import bus from '../../utils/bus.js';

/** Class representing a CreateBoard component. */
export class CreateBoardComponent {
    /**
     * CreateBoard component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get CreateBoard component data.
     * @return {object} CreateBoard component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreateBoard component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreateBoard component.
     */
    render() {
        const context = {};

        const html = CreateBoardTemplate(context);

        this._parent.innerHTML += html;

        const toProfile = document.getElementById('createboard-page').querySelectorAll('[data-section=\'profile\']')[0];
        toProfile.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-profile');
        });
    }
}
