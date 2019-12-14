import BaseView from '../BaseView/BaseView';
import HeaderComponent from '../../components/Header/Header';

import PinForIndex from '../../components/PinForIndex/PinForIndex';

import {BACKEND_ADDRESS} from '../../config/Config';

import './IndexView.scss';
import IndexViewTemplate from '../IndexView/IndexView.hbs';
import fetchModule from '../../utils/fetchModule';

/** Class representing an Index view. */
export default class IndexView extends BaseView {
    args: object;
    _parent: HTMLElement;

    /**
     * Index view constructor.
     * @constructor
     * @param {object} el - Root application div.
     * @param {*} args
     */
    constructor(el, args, parent = document.body) {
        super(el, {});
        this.args = args;
        this._parent = parent;
    }

    /**
     * Render Index view.
     */
    render() {
        fetchModule.Get ({
            url: BACKEND_ADDRESS + '/profile/data',
            body: null,
        })
            .then((response) => {
                return response.json();
            })
            .then((responseBody) => {
                (<any>window).GlobalUser = responseBody;
                (<any>window).CSRFtoken = responseBody.csrf_token;

                fetchModule.Get({
                    url: BACKEND_ADDRESS + '/pin/list/' + this.args + '?limit=10&id=9',
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

                        const index = IndexViewTemplate({arg: this.args});

                        this.el.innerHTML += index;

                        const indexPage = document.getElementById('index-page:' + this.args);
                        if (responseBody.body.pins) {
                            const pinsIndex = responseBody.body.pins;

                            for (let i = 0; i < pinsIndex.length; i++) {
                                const pinForIndexView = new PinForIndex(indexPage);
                                pinForIndexView.render({
                                    id: pinsIndex[i].id,
                                    pinImg: BACKEND_ADDRESS + '/' + pinsIndex[i].pin_dir,
                                    content: pinsIndex[i].title});
                            }
                        } else {
                            indexPage.textContent = 'Ещё нет пинов для Вашего просмотра :с';
                        }

                        if (String(this.args) == 'new') {
                            createScroll(this.args);
                        }
                    });
                });
    }
}

/**
 * createScroll
 * @param args 
 */
function createScroll(args) {
    window.addEventListener("scroll", function(){
        
        if (window.location.pathname != '/index/new') {
            window.removeEventListener("scroll", function() {});
            return;
        }

        const block = document.getElementById('index-page:' + args);
       
        let contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
        let yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
        let window_height = window.innerHeight;      // 3) высота внутренней области окна документа
        let y             = yOffset + window_height;
       
        // если пользователь достиг конца
        if(y >= contentHeight)
        {
            fetchModule.Get({
                url: BACKEND_ADDRESS + '/pin/list/' + args + '?limit=10&id=9',
                body: null,
            })
                .then((response) => {
                    return response.json();
                })
                .then((responseBody) => {
                    (<any>window).CSRFtoken = responseBody.csrf_token;


                    const indexPage = document.getElementById('index-page:' + args);
                    if (responseBody.body.pins) {
                        const pinsIndex = responseBody.body.pins;

                        for (let i = 0; i < pinsIndex.length; i++) {
                            const pinForIndexView = new PinForIndex(indexPage);
                            pinForIndexView.render({
                                id: pinsIndex[i].id,
                                pinImg: BACKEND_ADDRESS + '/' + pinsIndex[i].pin_dir,
                                content: pinsIndex[i].title});
                        }
                    }
                });
        }
    });
}
