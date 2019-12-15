import Dialog3ViewTemplate from '../Dialog3ViewComponent/Dialog3ViewComponent.hbs';
import '../Dialog3ViewComponent/Dialog3ViewComponent.scss';
import Smile from '../../../images/smile-face.svg';

/** Class representing a Dialog3View component. */
export default class Dialog3ViewComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * Dialog3View component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Dialog3View component data.
     * @return {object} Dialog3View component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render Dialog3View component.
     * @param {object} context - Context to render with.
     */
    render(context) {
        context['PHsmile'] = Smile;
        this._parent.innerHTML += Dialog3ViewTemplate(context);
    }
}
