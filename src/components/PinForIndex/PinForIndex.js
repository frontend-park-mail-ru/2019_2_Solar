import './PinForIndex.scss';
import PinForIndexTemplate from '../PinForIndex/PinForIndex.hbs';

/** Class representing a PinForIndex component. */
export default class PinForIndexComponent {
    /**
     * PinForIndex component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PinForIndex component data.
     * @return {object} PinForIndex component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PinForIndex component.
     * @param {object} context - Context to render with.
     * @return {string}
     */
    render(context) {
        return PinForIndexTemplate(context);
    }
}
