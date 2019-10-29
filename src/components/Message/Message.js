import MessageTemplate from '../Message/Message.hbs';
import '../Message/Message.scss';

/** Class representing a Message component. */
export default class MessageComponent {
    /**
     * Message component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Message component data.
     * @return {object} Message component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render Message component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += MessageTemplate(context);
    }
}
