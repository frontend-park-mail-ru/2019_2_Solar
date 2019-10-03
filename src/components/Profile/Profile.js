import './Profile.scss';
import ProfileTemplate from '../Profile/Profile.hbs';

// import AvatarPhotoImg from '../../images/bg.png';
import SetImg from '../../images/grey-pen.png';
import PlusImgFAdd from '../../images/plus2.png';

/** Class representing a Profile component. */
export class ProfileComponent {
    /**
     * Profile page component constructor.
     * @constructor
     * @param {object} parent - Root application div.
     */
    constructor(parent = document.body) {
        this._parent = parent;
        this._data = {};
    }

    /**
     * Get Profile component data.
     * @return {object} Profile component data.
     */
    get data() {
        return this._data;
    }

    /**
     * Set Profile component data.
     * @param {object} dataToSet
     */
    set data(dataToSet) {
        this._data = {...dataToSet};
    }

    /**
     * Set Profile component avatar.
     * @param {object} avatarData
     */
    set avatar(avatarData) {
        this._avatar = avatarData;
    }

    /**
     * Render Profile component.
     */
    render() {
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
