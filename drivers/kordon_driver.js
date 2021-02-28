var http = require('http');
var job = "getStats";

module.exports = {

    getViolationsData: function getViolationsData(login, password, ip, port, timestampStart, timestampEnd, res) {

        var data = JSON.stringify({
            "auth": {
                "login": login,
                "password": password
            },
            "request": {
                "job": job,
                "getStats": {
                    "timestampStart": timestampStart,
                    "timestampEnd": timestampEnd,
                    "speedThresholds": [
                        {
                            "name": "Превышение на 20", "min": 23, "max": 43
                        },
                        {
                            "name": "Превышение на 40",
                            "min": 43, "max": 63
                        },
                        {
                            "name": "Превышение на 60", "min": 63, "max": 83
                        },
                        {
                            "name": "Превышение на 80", "min": 83, "max": 0
                        }
                    ],
                    "showInfo": true
                }
            }
        });

        let _port = '80';

        if(port !== '' && typeof port !== 'undefined' && port !== null ){
            _port = port;
        }

        var options = {
            host: ip,
            port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        var answ = '';
        try {
            var httpreq = http.request(options, function (response) {
                //response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //console.log(chunk);
                    answ += chunk;
                }).on('end', function () {
                    var str = JSON.parse(answ);

                    let s = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
                    console.log(s);
                    //res.send(s);
                    res.send(s);
                }).on('error', (err) => {
                    let s = '{"status":' + "inactive" + '}';
                    //res.send(s);
                    console.error(err.stack);
                    res.send(s);
                });
            });
            httpreq.write(data);
            httpreq.end();
        } catch (e) {

            console.log(e);
        }

    },

    getPassagesData: function getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res) {

        var data = JSON.stringify({
            "auth": {
                "login": login,
                "password": password
            },
            "request": {
                "job": job,
                "getStats": {
                    "timestampStart": timestampStart,
                    "timestampEnd": timestampEnd,
                    "speedThresholds": [
                        {
                            "name": "Превышение на 20", "min": 23, "max": 43
                        },
                        {
                            "name": "Превышение на 40",
                            "min": 43, "max": 63
                        },
                        {
                            "name": "Превышение на 60", "min": 63, "max": 83
                        },
                        {
                            "name": "Превышение на 80", "min": 83, "max": 0
                        }
                    ],
                    "showInfo": true
                }
            }
        });

        let _port = '80';

        if(port !== '' && typeof port !== 'undefined' && port !== null ){
            _port = port;
        }

        var options = {
            host: ip,
            port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        var answ = '';
        try {
            var httpreq = http.request(options, function (response) {
                //response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //console.log(chunk);
                    answ += chunk;
                }).on('end', function () {
                    var str = JSON.parse(answ);
                    let s = '{"passages":' + JSON.stringify(str['getStats']['common']['total']) + '}';
                    console.log(s);
                    answ = s;
                    res.send(s);
                    //res.send(s);
                }).on('error', (err) => {
                    let s = '{"status":' + "inactive" + '}';
                    //res.send(s);
                    answ = s;
                    console.error(err.stack);
                    res.send(s);
                });
            });

            httpreq.write(data);
            httpreq.end();

        } catch (e) {

            console.log(e);
        }
        // return answ;
    },

    getIsActiveData: function getIsActiveData(login, password, ip, port, timestampStart, timestampEnd, res) {


        var data = JSON.stringify({
            "auth": {
                "login": login,
                "password": password
            },
            "request": {
                "job": job,
                "getStats": {
                    "timestampStart": timestampStart,
                    "timestampEnd": timestampEnd,
                    "speedThresholds": [
                        {
                            "name": "Превышение на 20", "min": 23, "max": 43
                        },
                        {
                            "name": "Превышение на 40",
                            "min": 43, "max": 63
                        },
                        {
                            "name": "Превышение на 60", "min": 63, "max": 83
                        },
                        {
                            "name": "Превышение на 80", "min": 83, "max": 0
                        }
                    ],
                    "showInfo": true
                }
            }
        });

        let _port = '80';

        if(port !== '' && typeof port !== 'undefined' && port !== null ){
            _port = port;
        }

        var options = {
            host: ip,
            port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        var answ = '';
        try {
            var httpreq = http.request(options, function (response) {
                //response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //console.log(chunk);
                    answ += chunk;
                }).on('end', function () {
                    //var str=JSON.parse(answ)

                    //let s = '{"common":'+JSON.stringify(str['getStats']['common']['total'])+'}';
                    let s = '{"status":' + "active" + '}';
                    console.log(s);
                    //res.send(s);
                    res.send(s);
                }).on('error', (err) => {
                    let s = '{"status":' + "inactive" + '}';
                    //res.send(s);
                    res.send(s);
                    console.error(err.stack);
                });
            });

            httpreq.write(data);
            httpreq.end();
        } catch (e) {

            console.log(e);
        }

        //return answ;

    },

    getFullCamInfoData: function getFullCamInfoData(login, password, ip, port, timestampStart, timestampEnd, res) {

        var data = JSON.stringify({
            "auth": {
                "login": login,
                "password": password
            },
            "request": {
                "job": job,
                "getStats": {
                    "timestampStart": timestampStart,
                    "timestampEnd": timestampEnd,
                    "speedThresholds": [
                        {
                            "name": "Превышение на 20", "min": 23, "max": 43
                        },
                        {
                            "name": "Превышение на 40",
                            "min": 43, "max": 63
                        },
                        {
                            "name": "Превышение на 60", "min": 63, "max": 83
                        },
                        {
                            "name": "Превышение на 80", "min": 83, "max": 0
                        }
                    ],
                    "showInfo": true
                }
            }
        });

        let _port = '80';

        if(port !== '' && typeof port !== 'undefined' && port !== null ){
            _port = port;
        }

        var options = {
            host: ip,
            port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        var answ = '';
        try {
            var httpreq = http.request(options, function (response) {
                //response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //console.log(chunk);
                    answ += chunk;
                }).on('end', function () {
                    var str = JSON.parse(answ);

                    //let s = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
                    let violations = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
                    let passages = '{"passages":' + JSON.stringify(str['getStats']['common']['total']) + '}';
                    let isActive = '{"status":' + "active" + '}';

                    var data = {
                        violations: JSON.stringify(str['getStats']['violation']['total']),
                        passages: JSON.stringify(str['getStats']['common']['total']),
                        status: 'active'
                    };

                    let answer = JSON.stringify(data);

                    //console.log(str);
                    //res.send(answer);
                    // answ = answer;
                    res.send(answer);
                }).on('error', (err) => {
                    let s = '{"status":' + "inactive" + '}';
                    //res.send(s);
                    console.error(err.stack);
                    // answ = s
                    res.send(s);
                });
            });
            httpreq.write(data);
            httpreq.end();
        } catch (e) {

            console.log(e);
        }

        return answ;

    },

    getFullApiInfo: function getFullApiInfo(login, password, ip, port, timestampStart, timestampEnd, res) {

        var data = JSON.stringify({
            "auth": {
                "login": login,
                "password": password
            },
            "request": {
                "job": job,
                "getStats": {
                    "timestampStart": timestampStart,
                    "timestampEnd": timestampEnd,
                    "speedThresholds": [
                        {
                            "name": "Превышение на 20", "min": 23, "max": 43
                        },
                        {
                            "name": "Превышение на 40",
                            "min": 43, "max": 63
                        },
                        {
                            "name": "Превышение на 60", "min": 63, "max": 83
                        },
                        {
                            "name": "Превышение на 80", "min": 83, "max": 0
                        }
                    ],
                    "showInfo": true
                }
            }
        });

        let _port = '80';

        if(port !== '' && typeof port !== 'undefined' && port !== null ){
            _port = port;
        }

        var options = {
            host: ip,
            port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        var answ = '';
        try {
            var httpreq = http.request(options, function (response) {
                //response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //console.log(chunk);
                    answ += chunk;
                }).on('end', function () {
                    var str = JSON.parse(answ);

                    //let s = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
                    //console.log(str);
                    //res.send(str);
                    //answ = str;
                    res.send(str);
                }).on('error', (err) => {
                    let s = '{"status":' + "inactive" + '}';
                    console.error(err.stack);
                    //answ = s;
                    res.send(s);
                });
            });
            httpreq.write(data);
            httpreq.end();
        } catch (e) {

            console.log(e);
        }

        return answ;

    }

};