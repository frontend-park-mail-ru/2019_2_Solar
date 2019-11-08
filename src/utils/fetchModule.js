/** Class create fetch. */
export default class FetchModule {
    /**
     * Router constructor.
     * @constructor
     * @param {object} root
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Fetch get method.
     * @param {*} - list with url, body, credentials.
     * @return {promise}
     */
    Get({
        url = '/',
        body = null,
        credentials = 'include',
    } = {}
    ) {
        return this._fetch({method: 'GET', url, body, credentials});
    }

    /**
     * Fetch post methos.
     * @param {*} - list with url, body, credentials.
     * @return {promise}
     */
    Post({
        url = '/',
        body = null,
        credentials = 'include',
        headers = {
            'Content-Type': 'application/json',
            'csrf-token': window.CSRFtoken,
        },
    } = {}
    ) {
        return this._fetch({method: 'POST', url, body, credentials, headers});
    }

    /**
     * Method create fetch.
     * @param {*} - list with method, url, body, credentials.
     * @return {promise} - response.
     */
    _fetch({
        method = 'GET',
        url = '/',
        body = null,
        credentials = 'include',
        headers = {},
    } = {}
    ) {
        return fetch(url, {method, body, credentials, headers});
    }
}
