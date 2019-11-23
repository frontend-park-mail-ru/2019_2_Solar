import './PinForIndex.scss';
import PinForIndexTemplate from '../PinForIndex/PinForIndex.hbs';
import PlusImg from '../../images/grayplus.svg';

/** Class representing a PinForIndex component. */
export default class PinForIndexComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * PinForIndex component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get PinForIndex component data.
     * @return {object} PinForIndex component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render PinForIndex component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        context['PHPlus'] = PlusImg;
        this._parent.innerHTML += PinForIndexTemplate(context);
    }
}
