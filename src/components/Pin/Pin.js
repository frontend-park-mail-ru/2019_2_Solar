import './Pin.scss';
import PinTemplate from '../Pin/Pin.hbs';

/** Class representing a Pin component. */
export class PinComponent {
    /**
     * Pin component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Pin component data.
     * @return {object} Pin component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Pin component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Pin component.
     */
    render() {
        const context = {};

        const html = PinTemplate(context);

        this._parent.innerHTML += html;
    }
}
