import bus from '../../utils/bus.js';
import './CreatePin.scss';
import CreatePinTemplate from '../CreatePin/CreatePin.hbs';
import {BoardForCreatePinComponent} from '../BoardForCreatePin/BoardForCreatePin.js';

/** Class representing a CreatePin component. */
export class CreatePinComponent {
    /**
     * CreatePin component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get CreatePin component data.
     * @return {object} CreatePin component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreatePin component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreatePin component.
     */
    render() {
        const board = new BoardForCreatePinComponent();

        const context = {
            title: 'Создание пина',
            board: board.render({boardTitle: "Какое-нибудь название с продолжением"}),
        };

        const html = CreatePinTemplate(context);

        this._parent.innerHTML += html;

        const toProfile = document.getElementById('createpin-page').querySelectorAll('[data-section=\'profile\']')[0];
        toProfile.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-profile');
        });
    }
}
