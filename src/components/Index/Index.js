/** Class representing an Index component. */
export default class IndexComponent {
    /**
     * Index page component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
    }

    /**
     * Render Index component.
     */
    render() {
        const comma = document.createElement('div');
        comma.textContent = 'Здесь будет главная страница';

        this._parent.appendChild(comma);
    }
}
