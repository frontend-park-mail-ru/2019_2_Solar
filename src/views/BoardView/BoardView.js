import BaseView from '../BaseView/BaseView.js';

import BoardViewTemplate from './BoardView.hbs';
import './BoardView.scss';

import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView.js';
import HeaderComponent from '../../components/Header/Header.js';

import plusImg from '../../images/plus2.png';
import grayPenImg from '../../images/grey-pen.png';
import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config.js';

/** Class representing a BoardView view. */
export default class BoardView extends BaseView {
    /**
     * BoardView view constructor.
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
     * Get BoardView view data.
     * @return {object} BoardView view data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set BoardView view data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Render BoardView view.
     */
    render() {
        fetchModule.Get({
            url: BACKEND_ADDRESS + '/board/' + this.args,
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.render();

                this.data = responseBody;

                const context = {
                    username: GlobalUser.body.user.username,
                    boardName: responseBody.body.board.title,
                    pinCount: responseBody.body.pins.length,
                    avatarImg: (GlobalUser.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + GlobalUser.body.user.avatar_dir) : bg,

                    PHGrayPen: grayPenImg,
                    PHPlus: plusImg,
                };

                this.el.innerHTML += BoardViewTemplate(context);

                const boardViewPinsList = document.getElementById('boardViewPins');
                const pinsBoard = responseBody.body.pins;
                for (let i = 0; i < pinsBoard.length; i++) {
                    const pinForUserView = new PinForUserViewComponent(boardViewPinsList);
                    pinForUserView.render({id: pinsBoard[i].id, pinImg: BACKEND_ADDRESS + '/' + pinsBoard[i].pin_dir,
                        content: pinsBoard[i].title});
                }
            });
    }
}
