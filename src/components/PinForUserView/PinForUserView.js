import './PinForUserView.scss';
import PinForUserViewTemplate from '../PinForUserView/PinForUserView.hbs';
import GrayPen from '../../images/grey-pen.png';
import bus from '../../utils/bus.js';

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
     */
    render(context) {
        context['PHGrayPen'] = GrayPen;
        this._parent.innerHTML += PinForUserViewTemplate(context);

        const toPinSettings = document.querySelectorAll('[data-section=\'pinSettings\']')[0];
        toPinSettings.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('/pin_editing');
        });

        const toPinView = document.querySelectorAll('[data-section=\'pinView\']')[0];
        toPinView.addEventListener('click', (e) => {
            e.preventDefault();
            bus.emit('/pin');
        });
    }
}
