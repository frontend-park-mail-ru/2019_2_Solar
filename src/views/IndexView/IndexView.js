import BaseView from '../BaseView/BaseView.js';

import './IndexView.scss';

/** Class representing an Index view. */
export default class IndexView extends BaseView {
    /**
     * Index view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._parent = parent;
    }

    /**
     * Render Index view.
     */
    render() {
        const comma = document.createElement('div');
        comma.textContent = 'Здесь будет главная страница';
        document.body.className ='backgroundIndex';

        this.el.innerHTML = comma;
        const header = new HeaderComponent(this.el);
        header.render();
    }
}
