import BaseView from '../BaseView/BaseView';
import HeaderComponent from '../../components/Header/Header';

import Lupa from '../../images/search.svg';

// import PinForIndex from '../../components/PinForIndex/PinForIndex';

import {BACKEND_ADDRESS} from '../../config/Config';

import './SearchView.scss';
import SearchViewTemplate from '../SearchView/SearchView.hbs';
import fetchModule from '../../utils/fetchModule';

/** Class representing an Search view. */
export default class SearchView extends BaseView {
    args: object;
    _parent: HTMLElement;

    /**
     * Search view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args, parent = document.body) {
        super(el, {});
        this.args = args;
        this._parent = parent;
    }

    /**
     * Render Search view.
     */
    render() {
        fetchModule.Get ({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).GlobalUser = responseBody;
                (<any>window).CSRFtoken = responseBody.csrf_token;

                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/pin/list/' + this.args,
                    body: null,
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseBody) => {
                        (<any>window).CSRFtoken = responseBody.csrf_token;

                        document.body.className ='backgroundIndex';
                        this.el.innerHTML = '';

                        const header = new HeaderComponent(this.el);
                        header.render();

                        const context = {
                            PHLupa: Lupa,
                        }

                        const search = SearchViewTemplate(context);

                        this.el.innerHTML += search;
                    });
                });
    }
}
