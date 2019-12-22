import CreateBoardCompTemplate from '../CreateBoardPopup/CreateBoardPopup.hbs';
import '../CreateBoardPopup/CreateBoardPopup.scss';

/** Class representing a CreateBoardPopup component. */
export default class CreateBoardPopupComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * CreateBoardPopup component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get CreateBoardPopup component data.
     * @return {object} CreateBoardPopup component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render CreateBoardPopup component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML += CreateBoardCompTemplate(context);
    }
}
