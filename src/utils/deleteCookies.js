/**
 * Find cookies.
 * @param {*} name
 * @param {*} value
 * @param {*} days
 * @param {*} path
 */
export function setCookie(name, value, days, path) {
    path = path || '/';
    days = days || 10;

    const lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + days);
    value = escape(value) + ((days==null) ? "" : "; expires="+lastDate.toUTCString());
    document.cookie = name + "=" + value + "; path=" + path; // вешаем куки
}

/**
 * Delete all cookies.
 */
export function deleteCookie() {
    const delCookies = document.cookie.split(';');
    while (name = delCookies.pop()) {
        setCookie(name.split('=')[0], '11', -20, '/');
    }
}
