import BaseView from '../BaseView/BaseView';
import HeaderComponent from '../../components/Header/Header';

import Lupa from '../../images/search.svg';
import bg from '../../images/bg.png';

import PinForIndex from '../../components/PinForIndex/PinForIndex';
import UserForSearch from '../../components/UserForSearch/UserForSearch';

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

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.render();

                const context = {
                    PHLupa: Lupa,
                }

                const search = SearchViewTemplate(context);
                this.el.innerHTML += search;

                const viewSearchPageForm = <HTMLFormElement> document.getElementById('pageSearchData');
                const searchPage = document.getElementById('search-list');

                viewSearchPageForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    searchPage.innerHTML = '';

                    const searchText = viewSearchPageForm.elements['searchtext'].value;
                    const style = viewSearchPageForm.elements['style'].value;

                    if (style == 'Tag') {
                        fetchModule.Get({
                            url: BACKEND_ADDRESS + '/find/pins/by/tag/' + searchText,
                            body: null,
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((responseBody) => {
                                if (responseBody.body.pins.length != 0) {
                                    const pinsSearch = responseBody.body.pins;
        
                                    for (let i = 0; i < pinsSearch.length; i++) {
                                        const pinForIndexView = new PinForIndex(searchPage);
                                        pinForIndexView.render({
                                            id: pinsSearch[i].id,
                                            pinImg: BACKEND_ADDRESS + '/' + pinsSearch[i].pin_dir,
                                            content: pinsSearch[i].title});
                                    }
                                } else {
                                    searchPage.textContent = 'Поиск не дал результатов :с';
                                }
                            });
                    } else if (style == 'Username') {
                        fetchModule.Get({
                            url: BACKEND_ADDRESS + '/find/users/by/username/' + searchText,
                            body: null,
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((responseBody) => {
                                if (responseBody.body.users.length != 0) {
                                    const usersSearch = responseBody.body.users;
        
                                    for (let i = 0; i < usersSearch.length; i++) {
                                        const UserForSearchView = new UserForSearch(searchPage);
                                        UserForSearchView.render({
                                            username: usersSearch[i].username,
                                            userImg: (usersSearch[i].avatar_dir) ? (BACKEND_ADDRESS + '/' + usersSearch[i].avatar_dir) : bg});
                                    }
                                } else {
                                    searchPage.textContent = 'Поиск не дал результатов :с';
                                }
                            });
                    }
                    
                });
            });
    }
}
