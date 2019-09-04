'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css'};

http.createServer(function(req, res) {
    process.chdir(__dirname + '/dist/');
    
    if (req.url == '/') {
        req.url = '/index.html';
    }
    const uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(uri));
    let stats;

    try {
        stats = fs.lstatSync(filename);
    } catch (e) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }


    let mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
    res.writeHead(200, {'Content-Type': mimeType} );

    let fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);


}).listen(3000);