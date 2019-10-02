import './CreatePin.scss';
import CreatePinTemplate from '../CreatePin/CreatePin.hbs';

export class CreatePinComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    get data() {
        return this._data;
    }

    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    render() {
        const context = {
            title: 'Создание пина',
        };

        const html = CreatePinTemplate(context);

        this._parent.innerHTML += html;
    }
}
