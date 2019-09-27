import './Settings.scss';
import FImg from '../../images/24px.svg';
import SImg from '../../images/24px (3).svg';
import TImg from '../../images/24px (1).svg';
import FoImg from '../../images/bg.png';


export class SettingsComponent {
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
        const leftColumnS = document.createElement('div'); //
        leftColumnS.className = 'leftColumn';

        const margin1 = document.createElement('div');
        margin1.className = 'marginTopF';

        const penImg = document.createElement('img');
        penImg.src = FImg;
        penImg.className = 'marginLeftCol';

        const setP = document.createElement('a');
        setP.href = '';
        setP.className = 'leftTextSt';
        setP.textContent = 'Изменить профиль';

        margin1.appendChild(penImg);
        margin1.appendChild(setP);


        const margin2 = document.createElement('div');
        margin2.className = 'marginTopT';

        const profImg = document.createElement('img');
        profImg.src = SImg;
        profImg.className = 'marginLeftCol';

        const settingsA = document.createElement('a');
        settingsA.href = '';
        settingsA.className = 'leftTextSt';
        settingsA.textContent = 'Настройки аккаунта';

        margin2.appendChild(profImg);
        margin2.appendChild(settingsA);


        const margin3 = document.createElement('div');
        margin3.className = 'marginTopT';

        const sunImg = document.createElement('img');
        sunImg.src = TImg;
        sunImg.className = 'marginLeftCol';

        const setSun = document.createElement('a');
        setSun.href = '';
        setSun.className = 'leftTextSt';
        setSun.textContent = 'Настроить тему';

        margin3.appendChild(sunImg);
        margin3.appendChild(setSun);

        leftColumnS.appendChild(margin1);
        leftColumnS.appendChild(margin2);
        leftColumnS.appendChild(margin3);
        this._parent.appendChild(leftColumnS);


        const rightColumnS = document.createElement('div');
        rightColumnS.className = 'rightColumn';

        const changeP = document.createElement('div');
        changeP.className = 'setTitle';
        changeP.textContent = 'Изменить профиль';

        rightColumnS.appendChild(changeP);

        const form = document.createElement('form');
        form.id = 'UserSettings';

        const butOK = document.createElement('input');
        butOK.type = 'submit';
        butOK.className = 'botOut';
        butOK.value = 'Готово';

        const butOUT = document.createElement('input');
        butOUT.type = 'submit';
        butOUT.className = 'botNoOut';
        butOUT.value = 'Отмена';
        
        form.appendChild(butOK);
        form.appendChild(butOUT);

        const photoBlock = document.createElement('div');
        photoBlock.className = 'withPhotoBlock';

        const avatarPhotoS = document.createElement('img');
        avatarPhotoS.src = FoImg;
        avatarPhotoS.className = 'avatarPhoto';

        const usernameT = document.createElement('div');
        usernameT.className = 'underAvatar';
        usernameT.textContent = 'Username';

        const butChangeAv = document.createElement('input');
        butChangeAv.type = 'button';
        butChangeAv.id = 'changeAvatar';
        butChangeAv.value = 'Изменить';
        butChangeAv.onclick = "document.getElementById('avatarphoto').click();";
        butChangeAv.className = 'avatarBot';

        const loadAv = document.createElement('input');
        loadAv.type = 'file';
        loadAv.name = 'avatarphoto';
        loadAv.id = 'avatarphoto';
        loadAv.accept = 'image/*';
        loadAv.multiple;
        loadAv.style = 'display:none';

        photoBlock.appendChild(avatarPhotoS);
        photoBlock.appendChild(usernameT);
        photoBlock.appendChild(butChangeAv);
        photoBlock.appendChild(loadAv);

        form.appendChild(photoBlock);

        const nameText = document.createElement('div');
        nameText.className = 'normText';
        nameText.style = 'margin-left:35px; margin-top:448px';
        nameText.textContent = 'Имя';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'firstname';
        nameInput.placeholder = 'Иван';
        nameInput.value = '';
        nameInput.className = 'inputForm';
        nameInput.style = 'margin-left:35px;margin-top:10px';

        const fumText = document.createElement('div');
        fumText.className = 'normText';
        fumText.style = 'margin-left:379px; margin-top:-20px';
        fumText.textContent = 'Фамилия';

        const fumInput = document.createElement('input');
        fumInput.type = 'text';
        fumInput.id = 'lastname';
        fumInput.placeholder = 'Иванов';
        fumInput.value = '';
        fumInput.className = 'inputForm';
        fumInput.style = 'margin-left:379px;margin-top:10px';

        const usernameText = document.createElement('div');
        usernameText.className = 'normText';
        usernameText.style = 'margin-left:35px; margin-top:100px';
        usernameText.textContent = 'Имя пользователя';

        const siteText = document.createElement('div');
        siteText.className = 'normText';
        siteText.style = 'margin-left:35px;padding-top:20px';
        siteText.textContent = 'wwww.sunrise.com/';

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.placeholder = 'username';
        usernameInput.value = '';
        usernameInput.className = 'inputForm';
        usernameInput.style = 'margin-left:35px;margin-top:10px';

        const statusText = document.createElement('div');
        statusText.className = 'normText';
        statusText.style = 'margin-left:35px; margin-top:100px';
        statusText.textContent = 'Статус';

        const statusInput = document.createElement('input');
        statusInput.type = 'text';
        statusInput.id = 'status';
        statusInput.placeholder = 'Расскажите о себе';
        statusInput.value = '';
        statusInput.className = 'inputForm';
        statusInput.style = 'margin-left:35px;margin-top:10px; width:679px';

        form.appendChild(nameText);
        form.appendChild(nameInput);
        form.appendChild(fumText);
        form.appendChild(fumInput);
        form.appendChild(usernameText);
        form.appendChild(siteText);
        form.appendChild(usernameInput);
        form.appendChild(statusText);
        form.appendChild(statusInput);

        rightColumnS.appendChild(form);
        this._parent.appendChild(rightColumnS);
    }
}