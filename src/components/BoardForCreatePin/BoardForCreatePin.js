import './BoardForCreatePin.scss';
import BoardForCreatePinTemplate from '../BoardForCreatePin/BoardForCreatePin.hbs';

/** Class representing a BoardForCreatePin component. */
export class BoardForCreatePinComponent {
    /**
     * BoardForCreatePin component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get BoardForCreatePin component data.
     * @return {object} BoardForCreatePin component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render BoardForCreatePin component.
     * @param {object} context - Context to render with.
     * @return {string}
     */
    render(context) {
        return BoardForCreatePinTemplate(context);
    }
}
