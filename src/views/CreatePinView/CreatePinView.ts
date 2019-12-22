import BaseView from '../BaseView/BaseView';
import CreateBoardPopupComponent from '../../components/CreateBoardPopup/CreateBoardPopup';

import CreatePinViewTemplate from './CreatePinView.hbs';
import './CreatePinView.scss';

import {BACKEND_ADDRESS} from '../../config/Config';
import bus from '../../utils/bus';
import showFile from '../../utils/readFile';
import fetchModule from '../../utils/fetchModule';
import {createHeader} from '../../utils/headerFunc';

import PHdelete from '../../images/delete.svg';

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
                createHeader();

                const boardsNames = [];
                if (responseBody.body.boards) {
                    const boardsCreatePin = responseBody.body.boards;
                    for (let i = 0; i < boardsCreatePin.length; i++) {
                        boardsNames.push({board: boardsCreatePin[i].title, board_id: boardsCreatePin[i].id});
                    }
                }

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

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
                    const createPinError = document.getElementById('createPinError');
                    cleanElement(createPinError);

                    const boardFromHbs = createPinForm.elements['board'].value;

                    if (boardFromHbs == 0) {
                        createPinElError(createPinError, 'Не выбрана доска для пина!', 'createpin-error');
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
                                createPinElError(createPinError, responseBody.body.info ? responseBody.body.info : responseBody.body, 'createpin-error');
                            }
                        });
                });

                const createBoard = document.getElementById('createPinCreateBoard');
                const createBoarrView = document.getElementById('createPinBoardPopup');
                const boardSelect = document.getElementById('createPinBoardSelect');

                createBoardFunc(window.location.pathname, createBoarrView, boardSelect, 'componentCreateBoardError');
                createBoard.addEventListener('click', (e) => {
                    e.preventDefault();
                    createBoarrView.className = '';
                });
            });
    }
}

/**
 * create board func
 * @param forID 
 * @param el
 * @param placeSelect
 * @param errID
 */
function createBoardFunc(forID, el, placeSelect, errID) {
    const boardTemp = new CreateBoardPopupComponent(el);
    boardTemp.render({forID: forID, PHdelete: PHdelete});

    const createBoardErr = document.getElementById(errID + forID);

    const exit = document.getElementById('componentCloseBoard' + forID);
    exit.addEventListener('click', (e) => {
        e.preventDefault();
        el.className = 'createpin__right-column__create-board_none';
        cleanElement(createBoardErr);
    });

    const createBoardForm = <HTMLFormElement>document.getElementById('createBoardDataFAnother' + forID);
    createBoardForm.addEventListener('submit', (e) => {
        e.preventDefault();
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
                return response.json();
            })
            .then((responseBody) => {
                if (responseBody.csrf_token) {
                    const idBoard = responseBody.body.board.id;
                    const nameBoard = responseBody.body.board.title;

                    el.className = 'createpin__right-column__create-board_none';
                    placeSelect.innerHTML += '<option value=' + String(idBoard) + '>' + String(nameBoard) + '</option>';

                    createBoardForm.elements['boardname'].value = '';
                    createBoardForm.elements['boardcontent'].value = '';

                    cleanElement(createBoardErr);
                } else {
                    createPinElError(createBoardErr, responseBody.body.info ? responseBody.body.info : responseBody.body, 'createboard-anotherview__form__error-mes');
                }
            });
    });
}

/**
 * createPinError
 * @param {string} elementId
 * @param {string} errorMessage
 * @param {string} classname
 */
function createPinElError(elementId, errorMessage, classname) {
    elementId.textContent = errorMessage;
    elementId.className = classname;
}

/**
 * clean element
 * @param {string} elementId
 */
function cleanElement(elementId) {
    elementId.textContent = '';
    elementId.className = '';
}
