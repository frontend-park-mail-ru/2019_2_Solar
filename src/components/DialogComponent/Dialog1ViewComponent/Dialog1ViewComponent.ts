import Dialog1ViewTemplate from '../Dialog1ViewComponent/Dialog1ViewComponent.hbs';
import '../Dialog1ViewComponent/Dialog1ViewComponent.scss';

/** Class representing a Dialog1View component. */
export default class Dialog1ViewComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * Dialog1View component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Dialog1View component data.
     * @return {object} Dialog1View component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render Dialog1View component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += Dialog1ViewTemplate(context);
    }
}
