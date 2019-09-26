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
        const hello = document.createElement('div')
        hello.className = 'p';
        hello.textContent = `Привет ${this._data.email}, здесь будет твой профиль`;
        this._parent.appendChild(hello);

        // this._parent.innerHTML=`

        // <div class="underheader">
        //     <div class="profileIcons">
        //         <img src="./images/bg.png" class="avatarPhotoP">
        //         <div class="usernameStyleP">${this._data.username}</div>
        //         <div class="underusename">Статус пользователя пуст</div>

        //         <a href='/settings' data-section='settings'><img src="images/baseline_edit_black_48dp.png" class="sizeIcons" style="position:absolute;left:597px; top:60px"></a>
        //         <a href=""><img src="images/plus2.png" class="sizeIcons" style="position:absolute;left:597px; top:125px"></a>

        //         <a href="" class="butwithoutCol" style="left:188px;top:203px;"><span class="textPad">Доски</span></a>
        //         <a href="" class="butwithoutCol" style="left:332px;top:203px;"><span class="textPad">Пины</span></a>

                
        //     </div>
        //     </div>

        // </div>`

        const set = document.createElement('a');
        set.href = '/settings';
        set.textContent = 'Войти в настройки';
        set.dataset.section = 'settings';

        this._parent.appendChild(set);

    }
}