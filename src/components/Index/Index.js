export class IndexComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {
        const comma = document.createElement('div');
        comma.textContent = 'Здесь будет главная страница';
    
        this._parent.appendChild(comma);
    }
}