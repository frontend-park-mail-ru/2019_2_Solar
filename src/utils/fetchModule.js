/** Class create fetch. */
export default class FetchModule {
    /**
     * Fetch get method.
     * @param {*} - list with url, body, credentials.
     * @return {*}
     */
    doGet({
        url = '/',
        body = null,
        credentials = 'include',
    } = {}
    ) {
        return this._fetch({method: 'GET', url, body, credentials});
    }

    /**
     * Fetch post methos.
     * @param {*} param0 - list with url, body, credentials.
     * @return {*}
     */
    doPost({
        url = '/',
        body = null,
        credentials = 'include',
    } = {}
    ) {
        return this._fetch({method: 'POST', url, body, credentials});
    }

    /**
     * Method create fetch.
     * @param {*} param0 - list with method, url, body, credentials.
     * @return {promise} - response.
     */
    _fetch({
        method = 'GET',
        url = '/',
        body = null,
        credentials = 'include',
    } = {}
    ) {
        console.log('do fetch');
        return fetch(url, {method, body, credentials});
    }
}
