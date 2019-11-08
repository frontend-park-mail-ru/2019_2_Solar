import BaseView from '../BaseView/BaseView.js';

import CreatePinViewTemplate from './CreatePinView.hbs';
import './CreatePinView.scss';

import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

/** Class representing a CreatePin view. */
export default class CreatePinView extends BaseView {
    /**
     * CreatePin view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args) {
        super(el);
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
                CSRFtoken = responseBody.csrf_token;

                const boardsNames = [];
                if (responseBody.body.boards) {
                    const boardsCreatePin = responseBody.body.boards;
                    console.log(boardsCreatePin);
                    for (let i = 0; i < boardsCreatePin.length; i++) {
                        boardsNames.push(boardsCreatePin[i].title + ':' + boardsCreatePin[i].id);
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

                const createPinForm = document.getElementById('createPinData');

                createPinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const boardFromHbs = createPinForm.elements['board'].value.split(':');

                    const formData = new FormData();
                    const pin = {
                        title: createPinForm.elements['title'].value,
                        description: createPinForm.elements['description'].value,
                        board_id: Number(boardFromHbs[1]),
                    };

                    formData.append('pinPicture', createPinForm.elements['pinPicture'].files[0]);
                    formData.append('pin', JSON.stringify(pin));

                    fetchModule.Post({
                        url: BACKEND_ADDRESS + '/pin',
                        body: formData,
                        credentials: 'include',
                        headers: {
                            'csrf-token': window.CSRFtoken,
                        },
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
