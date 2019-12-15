import BaseView from '../BaseView/BaseView';

import BoardViewTemplate from './BoardView.hbs';
import './BoardView.scss';

import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView';
import HeaderComponent from '../../components/Header/Header';

import plusImg from '../../images/grayplus.svg';
import grayPenImg from '../../images/graypen.svg';
import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config';
import fetchModule from '../../utils/fetchModule';

/** Class representing a BoardView view. */
export default class BoardView extends BaseView {
    _args: object;
    _data: object;

    /**
     * BoardView view constructor.
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
                (<any>window).CSRFtoken = responseBody.csrf_token;

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                const header = new HeaderComponent(this.el);
                header.render();

                this.data = responseBody;

                const context = {
                    username: (<any>window).GlobalUser.body.user.username,
                    boardName: responseBody.body.board.title,
                    boardDis: responseBody.body.board.description,
                    pinCount: responseBody.body.pins.length,
                    avatarImg: ((<any>window).GlobalUser.body.user.avatar_dir) ? (BACKEND_ADDRESS + '/' + (<any>window).GlobalUser.body.user.avatar_dir) : bg,
                    forID: (<any>window).location.pathname,

                    PHGrayPen: grayPenImg,
                    PHPlus: plusImg,
                };

                this.el.innerHTML += BoardViewTemplate(context);

                const boardViewPinsList = document.getElementById('boardViewPins' + (<any>window).location.pathname);
                const pinsBoard = responseBody.body.pins;
                for (let i = 0; i < pinsBoard.length; i++) {
                    const pinForUserView = new PinForUserViewComponent(boardViewPinsList);
                    pinForUserView.render({id: pinsBoard[i].id, pinImg: BACKEND_ADDRESS + '/' + pinsBoard[i].pin_dir,
                        content: pinsBoard[i].title});
                }
            });
    }
}
