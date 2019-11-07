import BaseView from '../BaseView/BaseView.js';
import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';

import './IndexView.scss';
import IndexViewTemplate from '../IndexView/IndexView.hbs';

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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                const index = IndexViewTemplate();

                this.el.innerHTML += index;
            });
    }
}
