import bus from '../../utils/bus.js';
import './CreatePinView.scss';
import CreatePinViewTemplate from './CreatePinView.hbs';
import BoardForCreatePinComponent from '../../components/BoardForCreatePin/BoardForCreatePin.js';

/** Class representing a CreatePin view. */
export default class CreatePinView {
    /**
     * CreatePin view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
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
        const board = new BoardForCreatePinComponent();

        const context = {
            title: 'Создание пина',
            board: board.render({boardTitle: 'Какое-нибудь название с продолжением'}),
        };

        const html = CreatePinViewTemplate(context);

        this._parent.innerHTML += html;

        const toProfile = document.getElementById('createpin-page').querySelectorAll('[data-section=\'profile\']')[0];
        toProfile.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('create-profile');
        });
    }
}
