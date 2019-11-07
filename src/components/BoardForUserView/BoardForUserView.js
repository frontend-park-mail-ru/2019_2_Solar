import './BoardForUserView.scss';
import BoardForUserViewTemplate from '../BoardForUserView/BoardForUserView.hbs';
import GrayPen from '../../images/grey-pen.png';

/** Class representing a BoardForUserView component. */
export default class BoardForUserViewComponent {
    /**
     * BoardForUserView component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get BoardForUserView component data.
     * @return {object} BoardForUserView component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render BoardForUserView component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        context['PHGrayPen'] = GrayPen;
        this._parent.innerHTML += BoardForUserViewTemplate(context);
    }
}
