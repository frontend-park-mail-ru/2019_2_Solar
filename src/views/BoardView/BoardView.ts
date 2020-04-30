import BaseView from '../BaseView/BaseView';

import BoardViewTemplate from './BoardView.hbs';
import './BoardView.scss';

import PinForUserViewComponent from '../../components/PinForUserView/PinForUserView';

import plusImg from '../../images/grayplus.svg';
import grayPenImg from '../../images/graypen.svg';
import bg from '../../images/bg.png';

import {BACKEND_ADDRESS} from '../../config/Config';
import {PIN_ADRESS} from '../../config/Config';
import fetchModule from '../../utils/fetchModule';
import {createHeader} from '../../utils/headerFunc';

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
                createHeader();

                document.body.className ='backgroundIndex';
                this.el.innerHTML = '';

                this.data = responseBody;
                const numS = getNumS(responseBody.body.pins.length);

                // Очень неприятный костыль
                const headerNick = document.getElementById('nicknameHeader');
                if (headerNick == null) {
                    document.location.reload();
                }

                const context = {
                    // username: (<any>window).GlobalUser.body.user.username,
                    username: headerNick.innerText,
                    boardName: responseBody.body.board.title,
                    boardDis: responseBody.body.board.description,
                    pinCount: responseBody.body.pins.length,
                    avatarImg: ((<any>window).GlobalUser.body.user.avatar_dir) ? (PIN_ADRESS + '/' + (<any>window).GlobalUser.body.user.avatar_dir) : bg,
                    forID: (<any>window).location.pathname,
                    pinnum: numS,

                    PHGrayPen: grayPenImg,
                    PHPlus: plusImg,
                };

                this.el.innerHTML += BoardViewTemplate(context);

                const boardViewPinsList = document.getElementById('boardViewPins' + (<any>window).location.pathname);
                const pinsBoard = responseBody.body.pins;
                for (let i = 0; i < pinsBoard.length; i++) {
                    const pinForUserView = new PinForUserViewComponent(boardViewPinsList);
                    pinForUserView.render({id: pinsBoard[i].id, pinImg: PIN_ADRESS + '/' + pinsBoard[i].pin_dir,
                        content: pinsBoard[i].title});
                }
            });
    }
}

/**
 * get num
 * @param count 
 */
function getNumS(count) {
    const newCount = count%10;
    if (newCount == 0 || (newCount >=5 && newCount <= 9)) {
        return 'пинов';
    } else if (newCount == 1) {
        return 'пин';
    } else {
        return 'пина';
    }
}
