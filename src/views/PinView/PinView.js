import './PinView.scss';
import PinViewTemplate from './PinView.hbs';

/** Class representing a Pin view. */
export default class PinView {
    /**
     * Pin view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Pin view data.
     * @return {object} Pin view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Pin view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Pin view.
     */
    render() {
        const context = {};

        const html = PinViewTemplate(context);

        this._parent.innerHTML += html;
    }
}
