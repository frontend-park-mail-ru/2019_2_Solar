/**
 * BaseView class.
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
    /**
     * Constructor for a BaseView.
     * @constructor
     * @param {object} el
     */
    constructor(el) {
        this.el = el;

        this.el.dataset.view = this.constructor.name;
        this.el.hidden = true;
    }

    /**
     * Check whether this view is active or not.
     * @return {boolean} - Whether this view is active or not.
     */
    get active() {
        return !this.el.hidden;
    }

    /**
     * Hide a view.
     */
    hide() {
        this.el.hidden = true;
    }

    /**
     * Show this view.
     */
    show() {
        this.el.hidden = false;
        this.render();
    }

    /**
     * Empty render view function to be implemented.
     */
    render() {

    }
}
