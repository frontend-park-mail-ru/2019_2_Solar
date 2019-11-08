import './PinForBoardEditing.scss';
import PinForBoardEditingTemplate from '../PinForBoardEditing/PinForBoardEditing.hbs';

/** Class representing a PinForBoardEditing component. */
export default class PinForBoardEditingComponent {
    /**
     * PinForBoardEditing component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PinForBoardEditing component data.
     * @return {object} PinForBoardEditing component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PinForBoardEditing component.
     * @param {object} context - Context to render with.
     * @return {string}
     */
    render(context) {
        return PinForBoardEditingTemplate(context);
    }
}
