import BaseView from '../BaseView/BaseView.js';

import CreateBoardViewTemplate from './CreateBoardView.hbs';
import './CreateBoardView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

/** Class representing a CreateBoard view. */
export default class CreateBoardView extends BaseView {
    /**
     * CreateBoardView view constructor.
     * @constructor
     * @param {object} el - Root application div.
     */
    constructor(el) {
        super(el);
        this._data = {};
    }

    /**
     * Get CreateBoardView view data.
     * @return {object} CreateBoardView view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreateBoardView view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreateBoardView view.
     */
    render() {
        fetch(BACKEND_ADDRESS + '/profile/data', {
            method: 'GET',
            body: null,
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.data = responseBody;
                header.render();

                const context = {};
                this.el.innerHTML += CreateBoardViewTemplate(context);

                const createBoardForm = document.getElementById('createBoardData');

                createBoardForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const data = {
                        'title': createBoardForm.elements['boardname'].value,
                        'description': createBoardForm.elements['boardcontent'].value,
                        'category': 'something',
                    };

                    fetch(BACKEND_ADDRESS + '/board', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    })
                        .then((response) => {
                            if (response.ok) {
                                bus.emit('/profile');
                            }
                        });
                });
            });
    }
}
