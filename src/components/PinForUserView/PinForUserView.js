import './PinForUserView.scss';
import PinForUserViewTemplate from '../PinForUserView/PinForUserView.hbs';
import GrayPen from '../../images/grey-pen.png';

/** Class representing a PinForUserView component. */
export default class PinForUserViewComponent {
    /**
     * PinForUserView component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PinForUserView component data.
     * @return {object} PinForUserView component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PinForUserView component.
     * @param {object} context - Context to render with.
     * @return {string}
     */
    render(context) {
        context['PHGrayPen'] = GrayPen;
        return PinForUserViewTemplate(context);
    }
}
