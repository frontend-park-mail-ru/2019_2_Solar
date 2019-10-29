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
     */
    constructor(el) {
        super(el);
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

                const context = {
                    pinName: 'Название',
                    pinAuthor: 'Username',
                    pinContent: 'Описание',
                };

                this.el.innerHTML += PinViewTemplate(context);

                /* заполнение поля комментариев */
                const pinViewCommentsList = document.getElementById('pinViewComments');
                const comment = new PinCommentComponent(pinViewCommentsList);
                comment.render({commentAuthorImg: bg, commentAuthor: 'Username', commentContent: 'Описание'});

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
                    const commentForAdd = new PinCommentComponent(pinViewCommentsList);
                    commentForAdd.render({commentAuthorImg: bg, commentAuthor: 'Username', commentContent: commentForList});

                    viewPinCommentForm.elements['comment'].value = '';
                });
            });
    }
}
