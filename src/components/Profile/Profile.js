import './Profile.scss';
import profiletemplate from '../../templates/profile.hbs';

import AvatarPhotoImg from '../../images/bg.png';
import SetImg from '../../images/baseline_edit_black_48dp.png';
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

    render() {
        //${this._data.username} ${this._data.avatarphoto}
        console.log(this._data);
        console.log(this._data.body.user.email);

        const context = { 
            username: this._data.body.user.username, 
            avatarphoto: AvatarPhotoImg,
            status: this._data.body.user.status,

            PHsetimg: SetImg,
            PHplus: PlusImgFAdd,
        };
        const html = profiletemplate(context);

        this._parent.innerHTML += html;
    }
}