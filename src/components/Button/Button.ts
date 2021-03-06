import './Button.scss';
import ButtonTemplate from '../Button/Button.hbs';

/** Class representing a Button component. */
export default class ButtonComponent {
    _parent: HTMLElement;
    /**
     * Button component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
    }

    /**
     * Render Button component.
     * @param {object} context - Context to render with.
     * @return {string}
     */
    render(context) {
        return ButtonTemplate(context);
    }
}
