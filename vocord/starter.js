var express = require('express')
var app = express()
var https = require('https');
var http = require('http');
const { response } = require('express');


app.use('/', function(clientRequest, clientResponse) {
    var url;
    // url = 'https://www.google.com'
    url = 'http://192.168.40.10';
    var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
    // var parsedPort;
    var parsedSSL;
    // if (url.startsWith('https://')) {
    //     parsedPort = 443
    //     parsedSSL = https
    // } else if (url.startsWith('http://')) {
    //     parsedPort = 80
    //     parsedSSL = http
    // }

    parsedSSL = http;
    var options = {
        hostname: parsedHost,
        port: 18000,
        // path: clientRequest.url,
        path:'/video/frame.jpeg?frame=SEQUENCE_COUNTER_TO_PREVENT_CACHING',
        // method: clientRequest.method,
        method: 'GET',
        headers: {
            'User-Agent': clientRequest.headers['user-agent'],
            'Content-Type':'image/jpeg',
            'Connection':'keep-alive',
            'Keep-Alive':'timeout=5',
            'Transfer-Encoding':'chunked'
        }
    };

    var serverRequest = parsedSSL.request(options, function(serverResponse) {
        var body = '';
        if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
            serverResponse.on('data', function(chunk) {
                body += chunk;
            });

            serverResponse.on('end', function() {
                // Make changes to HTML files when they're done being read.
                body = body.replace(`example`, `Cat!` );

                clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
                clientResponse.end(body);
            });
        }
        else {
            serverResponse.pipe(clientResponse, {
                end: true
            });
            clientResponse.contentType(serverResponse.headers['content-type'])
        }
    });

    serverRequest.end();
});


app.listen(3000)
console.log('Running on 0.0.0.0:3000')