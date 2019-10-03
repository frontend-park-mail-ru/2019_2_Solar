import './CreatePin.scss';
import CreatePinTemplate from '../CreatePin/CreatePin.hbs';

/** Class representing a CreatePin component. */
export class CreatePinComponent {
    /**
     * CreatePin component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get CreatePin component data.
     * @return {object} CreatePin component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreatePin component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreatePin component.
     */
    render() {
        const context = {
            title: 'Создание пина',
        };

        const html = CreatePinTemplate(context);

        this._parent.innerHTML += html;
    }
}
