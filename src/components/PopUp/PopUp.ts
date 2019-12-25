import PopUpCompTemplate from '../PopUp/PopUp.hbs';
import '../PopUp/PopUp.scss';

/** Class representing a PopUp component. */
export default class PopupComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * PopUp component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PopUp component data.
     * @return {object} PopUp component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PopUp component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        this._parent.innerHTML = PopUpCompTemplate(context);
    }

    /**
     * Change popUp
     * @param text
     * @param forId
     */
    change(text, forId) {
        document.getElementById('componentPopUpText' + forId).innerHTML = text;
    }
}
