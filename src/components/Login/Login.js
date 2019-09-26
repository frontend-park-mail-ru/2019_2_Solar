export class LoginComponent {
    constructor(parent = document.body) {
        this._parent = parent;
        this._form = null;
    }

    get form() {
        return document.querySelector('#inputdata')
    }

    render() {
        const logoImg = document.createElement('img');
        logoImg.src = '/images/logo.jpg';
        logoImg.className = 'logoStyle';
    
        const underBlockLogin = document.createElement('div');
        underBlockLogin.className ='underBlockLoginCl';
    
        const blockLogin = document.createElement('div');
        blockLogin.className = 'blocklogin';
    
        const titleLogin = document.createElement('div');
        titleLogin.textContent = 'Добро пожаловать в Sunrise!';
        titleLogin.className = 'titleLogin';
    
        const form = document.createElement('form');
        form.id = 'inputdata';
    
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'emailinput';
        emailInput.placeholder = 'Email';
        emailInput.className = 'inputSingIn';
        emailInput.style = 'top: 48.83%;';
    
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'passwordinput';
        passwordInput.placeholder = 'Пароль';
        passwordInput.className = 'inputSingIn';
        passwordInput.style = 'top: 60.74%;';
    
        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = 'Войти';
        submitBtn.className = 'buttonLogin';
    
        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(submitBtn);
        
        const contentText = document.createElement('div');
        contentText.textContent = 'Ещё не зарегистрировались?';
        contentText.className = 'underbuttonLogin';

        const signupBtn = document.createElement('a');
        signupBtn.href = '/signup';
        signupBtn.textContent = 'Регистрация';
        signupBtn.dataset.section = 'signup';
        signupBtn.className = 'aUnblock';

        contentText.appendChild(signupBtn);
        
        blockLogin.appendChild(logoImg);
        blockLogin.appendChild(titleLogin);
        blockLogin.appendChild(form);
        blockLogin.appendChild(contentText);
        underBlockLogin.appendChild(blockLogin);

        this._parent.appendChild(underBlockLogin);
        this._form = form;
    }
}