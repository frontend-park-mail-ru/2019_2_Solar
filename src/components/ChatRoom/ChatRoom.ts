import ChatRoomTemplate from '../ChatRoom/ChatRoom.hbs';
import '../ChatRoom/ChatRoom.scss';

/** Class representing a ChatRoom component. */
export default class ChatRoomComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * ChatRoom component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get ChatRoom component data.
     * @return {object} ChatRoom component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render ChatRoom component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += ChatRoomTemplate(context);
    }
}
