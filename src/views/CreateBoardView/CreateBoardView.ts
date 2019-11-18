import BaseView from '../BaseView/BaseView';

import CreateBoardViewTemplate from './CreateBoardView.hbs';
import './CreateBoardView.scss';

import HeaderComponent from '../../components/Header/Header';

import {BACKEND_ADDRESS} from '../../config/Config';
import bus from '../../utils/bus';
import fetchModule from '../../utils/fetchModule';

/** Class representing a CreateBoard view. */
export default class CreateBoardView extends BaseView {
    args: object;
    _data: object;

    /**
     * CreateBoardView view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el, {});
        this.args = args;
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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/profile/data',
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
                header.data = responseBody;
                header.render();

                const context = {};
                this.el.innerHTML += CreateBoardViewTemplate(context);

                const createBoardForm = <HTMLFormElement> document.getElementById('createBoardData');
                const errorEl = document.getElementById('createBoardError');

                createBoardForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    cleanBoardElement(errorEl);

                    const data = {
                        'title': createBoardForm.elements['boardname'].value,
                        'description': createBoardForm.elements['boardcontent'].value,
                        'category': 'cars',
                    };

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/board',
                        body: JSON.stringify(data),
                    })
                        .then((response) => {
                            if (response.ok) {
                                return null;
                            }
                            return response.json();
                        })
                        .then((responseBody) => {
                            if (responseBody == null) {
                                bus.emit('/profile', {});
                            } else {
                                createBoardError(errorEl, responseBody.body.info ? responseBody.body.info : responseBody.body, 'createboard-error');
                            }
                        });
                });
            });
    }
}

/**
 * createPinError
 * @param {*} element
 * @param {string} errorMessage
 * @param {string} classname
 */
function createBoardError(element, errorMessage, classname) {
    element.textContent = errorMessage;
    element.className = classname;
}

/**
 * clean element
 * @param {*} element
 */
function cleanBoardElement(element) {
    element.textContent = '';
    element.className = '';
}
