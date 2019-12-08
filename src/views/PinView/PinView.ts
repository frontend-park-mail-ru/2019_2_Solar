import BaseView from '../BaseView/BaseView';

import './PinView.scss';
import PinViewTemplate from './PinView.hbs';

import PinCommentComponent from '../../components/PinComment/PinComment';
import HeaderComponent from '../../components/Header/Header';

import {BACKEND_ADDRESS} from '../../config/Config';
import bus from '../../utils/bus';

import bg from '../../images/bg.png';
import fetchModule from '../../utils/fetchModule';

/** Class representing a Pin view. */
export default class PinView extends BaseView {
    args: object;
    _data: object;

    /**
     * Pin view constructor.
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
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/pin/' + this.args,
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).CSRFtoken = responseBody.csrf_token;

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

                        const header = new HeaderComponent(this.el);
                        header.render();

                        const context = {
                            pinImg: BACKEND_ADDRESS + '/' + responseBody.body.pins.pin_dir,
                            pinName: responseBody.body.pins.title,
                            pinAuthor: responseBody.body.pins.owner_username,
                            pinContent: responseBody.body.pins.description,
                            boardsNames: boardsNames,
                        };

                        this.el.innerHTML += PinViewTemplate(context);

                        /* заполнение поля комментариев */
                        const pinViewCommentsList = document.getElementById('pinViewComments');
                        const pinComments = responseBody.body.comments;

                        if (pinComments) {
                            for (let i = 0; i < pinComments.length; i++) {
                                const comment = new PinCommentComponent(pinViewCommentsList);
                                comment.render({
                                    commentAuthorImg: (pinComments[i].author_dir) ? (BACKEND_ADDRESS + '/' + pinComments[i].author_dir) : bg,
                                    commentAuthor: pinComments[i].author_username,
                                    commentContent: pinComments[i].text});
                            }
                        }

                        /* Обработка форм на странице */
                        const viewPinDataForm = document.getElementById('viewPinData');
                        viewPinDataForm.addEventListener('submit', (e) => {
                            e.preventDefault();
                            bus.emit('/profile', {});
                        });

                        const viewPinCommentForm = <HTMLFormElement> document.getElementById('viewPinCommentData');
                        viewPinCommentForm.addEventListener('submit', (e) => {
                            e.preventDefault();

                            const commentForList = viewPinCommentForm.elements['comment'].value;

                            if (commentForList != '') {
                                fetchModule.Post({
                                    url: BACKEND_ADDRESS + '/pin/' + responseBody.body.pins.id + '/comment',
                                    body: JSON.stringify({text: commentForList}),
                                })
                                    .then((response) => {
                                        if (response.ok) {
                                            const commentForAdd = new PinCommentComponent(pinViewCommentsList);
                                            commentForAdd.render({
                                                commentAuthorImg: ((<any>window).GlobalUser.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + (<any>window).GlobalUser.body.user.avatar_dir) : bg,
                                                commentAuthor: (<any>window).GlobalUser.body.user.username,
                                                commentContent: commentForList});
    
                                            viewPinCommentForm.elements['comment'].value = '';
                                        }
                                    });
                            }
                        });
                    });
            });
    }
}
