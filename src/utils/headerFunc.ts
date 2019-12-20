import HeaderComponent from './../components/Header/Header';
/**
 * create header
 * @param value 
 */
export function createHeader() {
    const headerView = document.getElementById('applicationHeader');
    if (headerView.innerHTML == '') {
        const header = new HeaderComponent(headerView);
        header.render();
    }
}

/**
 * delete header
 */
export function deleteHeader() {
    const headerNotView = document.getElementById('applicationHeader');
    headerNotView.innerHTML = '';
}
