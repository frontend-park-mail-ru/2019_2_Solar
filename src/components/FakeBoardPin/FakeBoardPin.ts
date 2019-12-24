import FakeBoardTemplate from '../FakeBoardPin/FakeBoard.hbs';
import FakePinTemplate from '../FakeBoardPin/FakePin.hbs';

import '../FakeBoardPin/FakeBoardPin.scss';

/** Class representing a FakeBoardPin component. */
export default class FakeBoardPinComponent {
    _parent: HTMLElement;
    _data: object;
    
    /**
     * FakeBoardPin component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get FakeBoardPin component data.
     * @return {object} FakeBoardPin component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Render FakeBoardPin component.
     * @param {object} context - Context to render with.
     */
    renderPin(context) {
        this._parent.innerHTML += FakePinTemplate(context);
    }

    /**
     * Render FakeBoardPin component.
     * @param {object} context - Context to render with.
     */
    renderBoard(context) {
        this._parent.innerHTML += FakeBoardTemplate(context);
    }
}
