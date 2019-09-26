(function() {
    const noop = () => null;

    function ajax({method = 'GET', url = '/', body = null, callback = noop} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
    
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState !== xhr.DONE) return;
    
            callback(xhr.status, xhr.responseText);
        });
    
        if (body) {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
            xhr.send(JSON.stringify(body));
            return;
        }
    
        xhr.send();
    }

    globalThis.ajax = ajax;
})();