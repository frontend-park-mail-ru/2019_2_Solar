import BaseView from '../BaseView/BaseView';

import PinEditingViewTemplate from './PinEditingView.hbs';
import './PinEditingView.scss';
import '../CreatePinView/CreatePinView.scss';

import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';

import bg from '../../images/bg.png';
import fetchModule from '../../utils/fetchModule';
import bus from '../../utils/bus';
import {createHeader} from '../../utils/headerFunc';

/** Class representing a PinEditing view. */
export default class PinEditingView extends BaseView {
    args: object;
    _data: object;

    /**
     * PinEditing view constructor.
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
     * Get PinEditing view data.
     * @return {object} PinEditing view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set PinEditing view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render PinEditing view.
     */
    render() {
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/pin/' + this.args,
            body: null,
        })
            .then((response) => {
                if(!response.ok) {
                    bus.emit('/profile', {});
                }
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;
                createHeader();

                const boardsNames = [];
                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/board/list/my',
                    body: null,
                })
                    .then((responseBoards) => {
                        return responseBoards.json();
                    })
                    .then((responseBoardsBody) => {
                        (<any>window).CSRFtoken = responseBoardsBody.csrf_token;

                        if (responseBoardsBody.body.boards) {
                            const boardsViewPin = responseBoardsBody.body.boards;
                            for (let i = 0; i < boardsViewPin.length; i++) {
                                boardsNames.push({board: boardsViewPin[i].title, board_id: boardsViewPin[i].id});
                            }
                        }

                        document.body.className ='backgroundIndex';
                        this.el.innerHTML = '';

                        const forId = (<any>window).location.pathname;
                        const context = {
                            pinImg: PIN_ADRESS + '/' + responseBody.body.pins.pin_dir,
                            forID: forId,
                            pinName: responseBody.body.pins.title,
                            pinAuthor: responseBody.body.pins.owner_username,
                            pinContent: responseBody.body.pins.description,
                            boardsNames: boardsNames,
                        };

                        this.el.innerHTML += PinEditingViewTemplate(context);
                        document.getElementById('changeThemeToLight').addEventListener('click', () => {
                            document.body.removeAttribute('data-theme');
                        });
                        document.getElementById('changeThemeToDark').addEventListener('click', () => {
                            document.body.setAttribute('data-theme', 'dark');
                        });
                        const editingPinForm = <HTMLFormElement> document.getElementById('PinEditingData' + String(forId));
                        editingPinForm.addEventListener('submit', (e) => {
                            e.preventDefault();
                            const boardFromHbs = editingPinForm.elements['board-select'].value;

                            if (boardFromHbs == 0) {
                                return;
                            }
                            const pin = {
                                'board_id': Number(boardFromHbs),
                                'title': editingPinForm.elements['pinname'].value,
                                'description': editingPinForm.elements['pincontent'].value,
                            };

                            fetchModule.Put({
                                url: BACKEND_ADDRESS + '/pin/' + this.args,
                                body: JSON.stringify(pin),
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'csrf-token': (<any>window).CSRFtoken,
                                },
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        return null;
                                    }
                                    return response.json();
                                })
                                .then((responsePutBody) => {
                                    if(responsePutBody == null) {
                                        bus.emit('/profile', {});
                                    }
                                });
                        });

                        const delPinForm = document.getElementById('PinDel' + String(forId));
                        delPinForm.addEventListener('click', (e) => {
                            e.preventDefault();
                            console.log('del');
                            fetchModule.Delete({
                                url: BACKEND_ADDRESS + '/pin/' + this.args,
                                body: null,
                            })
                                .then((response) => {
                                    editingPinForm.removeEventListener('submit', ()=>{});
                                    bus.emit('/profile', {});
                                });
                        })

                    });
            })
            .catch((err) => {
                bus.emit('/profile', {});
            });
        }
}
