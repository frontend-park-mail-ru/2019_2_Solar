import './Profile.scss';
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
        const avatarPhoto = document.createElement('img');
        avatarPhoto.src = AvatarPhotoImg;
        avatarPhoto.className = 'avatarPhotoP';

        const usernameSt = document.createElement('div');
        usernameSt.className = 'usernameStyleP';
        usernameSt.textContent = `${this._data.username}`;

        const statusSt = document.createElement('div');
        statusSt.className = 'underusename';
        statusSt.textContent = 'Статус пользователя пуст.';

        const settingsImg = document.createElement('img');
        settingsImg.src = SetImg;
        settingsImg.className = 'sizeIcons';
        settingsImg.style = 'position:absolute;left:597px; top:60px';

        const plusImg = document.createElement('img');
        plusImg.src = PlusImgFAdd;
        plusImg.className = 'sizeIcons';
        plusImg.style = 'position:absolute;left:597px; top:125px';


        const settingsImgA = document.createElement('a');
        settingsImgA.href = '/settings';
        settingsImgA.dataset.section = 'settings';


        const plusImgA = document.createElement('a');
        plusImgA.href = '/createpin';
        plusImgA.dataset.section = 'createpin';

        settingsImgA.appendChild(settingsImg);
        plusImgA.appendChild(plusImg);


        const boardText = document.createElement('span');
        boardText.className = 'textPad';
        boardText.textContent = 'Доски';

        const pinText = document.createElement('span');
        pinText.className = 'textPad';
        pinText.textContent = 'Пины';


        const boardTextA = document.createElement('a');
        boardTextA.className = 'butwithoutCol';
        boardTextA.style = 'left:188px;top:203px;';
        boardTextA.href = '';

        const pinTextA = document.createElement('a');
        pinTextA.className = 'butwithoutCol';
        pinTextA.style = 'left:332px;top:203px;';
        pinTextA.href = '';

        boardTextA.appendChild(boardText);
        pinTextA.appendChild(pinText);

        
        const profileIconsSt = document.createElement('div');
        profileIconsSt.className = 'profileIcons';

        profileIconsSt.appendChild(avatarPhoto);
        profileIconsSt.appendChild(usernameSt);
        profileIconsSt.appendChild(statusSt);
        profileIconsSt.appendChild(settingsImgA);
        profileIconsSt.appendChild(plusImgA);
        profileIconsSt.appendChild(boardTextA);
        profileIconsSt.appendChild(pinTextA);

        const underHeaderSt = document.createElement('div');
        underHeaderSt.className = 'underheader';

        underHeaderSt.appendChild(profileIconsSt);
        this._parent.appendChild(underHeaderSt);

    }
}