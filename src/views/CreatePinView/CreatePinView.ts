import BaseView from '../BaseView/BaseView';

import CreatePinViewTemplate from './CreatePinView.hbs';
import './CreatePinView.scss';

import HeaderComponent from '../../components/Header/Header';

import {BACKEND_ADDRESS} from '../../config/Config';
import bus from '../../utils/bus';
import showFile from '../../utils/readFile';
import fetchModule from '../../utils/fetchModule';

/** Class representing a CreatePin view. */
export default class CreatePinView extends BaseView {
    args: object;
    _data: object;

    /**
     * CreatePin view constructor.
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
     * Get CreatePin view data.
     * @return {object} CreatePin view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set CreatePin view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render CreatePin view.
     */
    render() {
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/board/list/my',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;

                const boardsNames = [];
                if (responseBody.body.boards) {
                    const boardsCreatePin = responseBody.body.boards;
                    for (let i = 0; i < boardsCreatePin.length; i++) {
                        boardsNames.push({board: boardsCreatePin[i].title, board_id: boardsCreatePin[i].id});
                    }
                }

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.render();

                const context = {
                    title: 'Создание пина',
                    boardsNames: boardsNames,
                };

                this.el.innerHTML += CreatePinViewTemplate(context);

                const pinImgField = document.getElementById('pinphoto');
                pinImgField.addEventListener('change', (e) => {
                    showFile(e, 'createPinImg');
                });

                const createPinForm = <HTMLFormElement> document.getElementById('createPinData');

                createPinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    cleanElement('createPinError');

                    const boardFromHbs = createPinForm.elements['board'].value;

                    if (boardFromHbs == 0) {
                        createPinError('createPinError', 'Не выбрана доска для пина!', 'createpin-error');
                        return;
                    }

                    const formData = new FormData();
                    const pin = {
                        title: createPinForm.elements['title'].value,
                        description: createPinForm.elements['description'].value,
                        board_id: Number(boardFromHbs),
                    };

                    formData.append('pinPicture', createPinForm.elements['pinPicture'].files[0]);
                    formData.append('pin', JSON.stringify(pin));

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/pin',
                        body: formData,
                        credentials: 'include',
                        headers: {
                            'csrf-token': (<any>window).CSRFtoken,
                        },
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
                                createPinError('createPinError', responseBody.body.info ? responseBody.body.info : responseBody.body, 'createpin-error');
                            }
                        });
                });
            });
    }
}

/**
 * createPinError
 * @param {string} elementId
 * @param {string} errorMessage
 * @param {string} classname
 */
function createPinError(elementId, errorMessage, classname) {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = errorMessage;
    errorEl.className = classname;
}

/**
 * clean element
 * @param {string} elementId
 */
function cleanElement(elementId) {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = '';
    errorEl.className = '';
}
