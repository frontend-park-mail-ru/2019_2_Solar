/** Class representing an Index view. */
export default class IndexView {
    /**
     * Index view constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
    }

    /**
     * Render Index view.
     */
    render() {
        const comma = document.createElement('div');
        comma.textContent = 'Здесь будет главная страница';

        this._parent.appendChild(comma);
    }
}
