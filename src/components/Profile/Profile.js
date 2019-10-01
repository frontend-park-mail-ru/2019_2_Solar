import './Profile.scss';
import ProfileTemplate from '../Profile/Profile.hbs';

// import AvatarPhotoImg from '../../images/bg.png';
import SetImg from '../../images/grey-pen.png';
import PlusImgFAdd from '../../images/plus2.png';

export class ProfileComponent {
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

    set avatar(avatardata) {
        this._avatar = avatardata;
    }

    render() {
    // ${this._data.username} ${this._data.avatarphoto}

        const context = {
            username: this._data.body.user.username,
            // avatarphoto: this._avatar,
            status: this._data.body.user.status,

            PHsetimg: SetImg,
            PHplus: PlusImgFAdd,
        };
        const html = ProfileTemplate(context);

        this._parent.innerHTML += html;
    }
}
