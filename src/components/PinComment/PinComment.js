import PinCommentTemplate from '../PinComment/PinComment.hbs';
import '../PinComment/PinComment.scss';

/** Class representing a PinComment component. */
export default class PinCommentComponent {
    /**
     * PinComment component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PinComment component data.
     * @return {object} PinComment component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PinComment component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += PinCommentTemplate(context);
    }
}
