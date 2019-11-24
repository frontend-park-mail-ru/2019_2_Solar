/** Class create fetch. */
class FetchModule {

    /**
     * Router constructor.
     * @constructor
     */
    constructor() {}

    /**
     * Fetch get method.
     * @param {*} - list with url, body, credentials.
     * @return {promise}
     */
    Get({
        url = '/',
        body = null,
        credentials = 'include' as RequestCredentials,
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
        credentials = 'include' as RequestCredentials,
        headers = {
            // 'Content-Type': 'application/json',
            'csrf-token': (<any>window).CSRFtoken,
        },
    } = {}
    ) {
        return this._fetch({method: 'POST', url, body, credentials, headers});
    }

    /**
     * Fetch delete methos.
     * @param {*} - list with url, body, credentials.
     * @return {promise}
     */
    Delete({
        url = '/',
        body = null,
        credentials = 'include' as RequestCredentials,
        headers = {
            // 'Content-Type': 'application/json',
            'csrf-token': (<any>window).CSRFtoken,
        },
    } = {}
    ) {
        return this._fetch({method: 'DELETE', url, body, credentials, headers});
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
        credentials = 'include' as RequestCredentials,
        headers = {},
    } = {}
    ) {
        return fetch(url, {method, body, credentials, headers});
    }
}

export default new FetchModule();
