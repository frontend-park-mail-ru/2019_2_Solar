import './UserForSearch.scss';
import UserForSearchTemplate from '../UserForSearch/UserForSearch.hbs';

/** Class representing a UserForSearch component. */
export default class UserForSearchComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * UserForSearch component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get UserForSearch component data.
     * @return {object} UserForSearch component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render UserForSearch component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += UserForSearchTemplate(context);
    }
}