import BaseView from '../BaseView/BaseView.js';

import './PinView.scss';
import PinViewTemplate from './PinView.hbs';

import PinCommentComponent from '../../components/PinComment/PinComment.js';
import HeaderComponent from '../../components/Header/Header.js';

import {BACKEND_ADDRESS} from '../../config/Config.js';
import bus from '../../utils/bus.js';

import bg from '../../images/bg.png';

/** Class representing a Pin view. */
export default class PinView extends BaseView {
    /**
     * Pin view constructor.
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
                CSRFtoken = responseBody.csrf_token;

                const boardsNames = [];
                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/board/list/my',
                    body: null,
                })
                    .then((responseBoards) => {
                        return responseBoards.json();
                    })
                    .then((responseBoardsBody) => {
                        CSRFtoken = responseBoardsBody.csrf_token;

                        if (responseBoardsBody.body.boards) {
                            const boardsViewPin = responseBoardsBody.body.boards;
                            for (let i = 0; i < boardsViewPin.length; i++) {
                                boardsNames.push(boardsViewPin[i].title + ':' + boardsViewPin[i].id);
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
                                    commentAuthorImg: bg,
                                    commentAuthor: pinComments[i].author_username,
                                    commentContent: pinComments[i].text});
                            }
                        }

                        /* Обработка форм на странице */
                        const viewPinDataForm = document.getElementById('viewPinData');
                        viewPinDataForm.addEventListener('submit', (e) => {
                            e.preventDefault();
                            bus.emit('/profile');
                        });

                        const viewPinCommentForm = document.getElementById('viewPinCommentData');
                        viewPinCommentForm.addEventListener('submit', (e) => {
                            e.preventDefault();

                            const commentForList = viewPinCommentForm.elements['comment'].value;

                            fetchModule.Post({
                                url: BACKEND_ADDRESS + '/pin/' + responseBody.body.pins.id + '/comment',
                                body: JSON.stringify({text: commentForList}),
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        const commentForAdd = new PinCommentComponent(pinViewCommentsList);
                                        commentForAdd.render({
                                            commentAuthorImg: (GlobalUser.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + GlobalUser.body.user.avatar_dir) : bg,
                                            commentAuthor: GlobalUser.body.user.username,
                                            commentContent: commentForList});

                                        viewPinCommentForm.elements['comment'].value = '';
                                    }
                                });
                        });
                    });
            });
    }
}
