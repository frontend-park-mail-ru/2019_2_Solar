/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
    /**
     * BaseView constructor.
     * @constructor
     * @param {object} el 
     */
	constructor (el) {
		this.el = el;

		this.el.dataset.view = this.constructor.name;
		this.el.hidden = true;
	}

    /**
     * Check if this view is active.
     * @return {bool} - Whether this view is active.
     */
	get active() {
		return !this.el.hidden;
	}

    /**
     * Hide this view.
     */
	hide () {
		this.el.hidden = true;
	}

    /**
     * Show this view.
     */
	show () {
		this.el.hidden = false;
		this.render();
	}
}