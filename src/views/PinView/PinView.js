import BaseView from '../BaseView/BaseView.js';

import './PinView.scss';
import PinViewTemplate from './PinView.hbs';

import PinCommentComponent from '../../components/PinComment/PinComment.js';

import bg from '../../images/bg.png';

/** Class representing a Pin view. */
export default class PinView extends BaseView {
    /**
     * Pin view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get Pin view data.
     * @return {object} BoardView view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Pin view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render Pin view.
     */
    render() {
        document.body.className ='backgroundIndex';
        this.el.innerHTML = '';

        const comment = new PinCommentComponent();

        const context = {
            pinName: 'Название',
            pinAuthor: 'Username',
            pinContent: 'Описание',
            comment: comment.render({commentAuthorImg: bg, commentAuthor: 'Username', commentContent: 'Описание'}),
        };

        this.el.innerHTML += PinViewTemplate(context);
    }
}
