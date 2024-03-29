var http = require('http');
var https = require('https');
var job = "getStats";
// var snmp = require('snmp-native');
var sys = require('sys')
var exec = require('child_process').exec;


 //curl --location --request POST "http://192.168.72.3:80/api11.php" --header "Content-Type: application/json" --data '{ "auth": {"login": "admin","password": "8aHrgDKW"}, "request": { "job": "getDeviceInfo"}}'





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

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }

        var options = {
            url: 'http://' + ip + ':' + _port + '/api11.php',
            // host: ip,
            // port: _port,
            // path: '/api11.php',
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

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }

        var options = {
            url: 'http://' + ip + ':' + _port + '/api11.php',
            // host: ip,
            // port: _port,
            // path: '/api11.php',
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

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }

        var options = {
            url: 'http://' + ip + ':' + _port + '/api11.php',
            // host: ip,
            // port: _port,
            // path: '/api11.php',
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

        let snmp_voltage = -10;
        // var snmpsession = new snmp.Session({host: ip, port: 161, community: 'public'});
        //NET-SNMP-MIB::netSnmp.99.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101
        // snmpsession.get({oid: ['NET-SNMP-MIB::netSnmp',99, 1, 1, 1, 3, 18, 72, 101, 97, 108, 116, 104, 58, 32, 80, 67, 32, 118, 111,108,116,97,103,101]}, function (error, varbinds) {
        // snmpsession.get({oid: ['NET-SNMP-MIB::netSnmp.99.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101']}, function (error, varbinds) {
        // snmpsession.get({oid: '.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101'}, function (error, varbinds) {
        //     if (error) {
        //         console.log('Fail :('+error+varbinds[0].oid);
        //     } else {
        //         console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        //         snmp_voltage = varbinds[0].value;
        //     }
        // });
 //snmpget -v2c -c public 192.168.73.5 1 NET-SNMP-MIB::netSnmp.99.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101

        function puts(error, stdout, stderr) { sys.puts(stdout) }
        exec(("snmpget -v2c -Oqv -c public "+ip+" NET-SNMP-MIB::netSnmp.99.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101"), function(err, stdout, stderr) {
            console.log(stdout);
            snmp_voltage = stdout;
            snmp_voltage.replace(/\n/g, '');
        });


        let pingMS1 = Date.now();



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

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }

        console.log("port is: " + _port);

        var options = {
            // url: 'http://' + ip + ':' + _port + '/api11.php',
            host: ip,
            // port: _port,
            path: '/api11.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }

        };
        // console.log("url " + 'http://' + ip + ':' + _port + '/api11.php');
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
                    // let violations = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
                    // let passages = '{"passages":' + JSON.stringify(str['getStats']['common']['total']) + '}';
                    // let isActive = '{"status":' + "active" + '}';

                    let pingMS2 = Date.now();

                    var data = {
                        violations: JSON.stringify(str['getStats']['violation']['total']),
                        passages: JSON.stringify(str['getStats']['common']['total']),
                        status: 'active',
                        ping: (pingMS2 - pingMS1),
                        voltage: (snmp_voltage/10)
                    };

                    let answer = JSON.stringify(data);

                    //console.log(str);
                    //res.send(answer);
                    // answ = answer;
                    res.send(answer);
                    //res.removeAllListeners('data');
                    // httpreq.end();

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

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }

        var options = {
            url: 'http://' + ip + ':' + _port + '/api11.php',
            // host: ip,
            // port: _port,
            // path: '/api11.php',
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

    },

    getVideo: function getVideo(login, password, ip, port, timestampStart, timestampEnd, res) {

        // var data = JSON.stringify({
        //     "auth": {
        //         "login": login,
        //         "password": password
        //     },
        //     "request": {
        //         "job": job,
        //         "getStats": {
        //             "timestampStart": timestampStart,
        //             "timestampEnd": timestampEnd,
        //             "speedThresholds": [
        //                 {
        //                     "name": "Превышение на 20", "min": 23, "max": 43
        //                 },
        //                 {
        //                     "name": "Превышение на 40",
        //                     "min": 43, "max": 63
        //                 },
        //                 {
        //                     "name": "Превышение на 60", "min": 63, "max": 83
        //                 },
        //                 {
        //                     "name": "Превышение на 80", "min": 83, "max": 0
        //                 }
        //             ],
        //             "showInfo": true
        //         }
        //     }
        // });
        //
        // let _port = '80';
        //
        // if (port !== '' && typeof port !== 'undefined' && port !== null) {
        //     _port = port;
        // }
        //
        // var options = {
        //     url: 'http://' + ip + ':' + _port + '/api11.php',
        //     // host: ip,
        //     // port: _port,
        //     // path: '/api11.php',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Content-Length': Buffer.byteLength(data)
        //     }
        //
        // };
        // var answ = '';
        // try {
        //     var httpreq = http.request(options, function (response) {
        //         //response.setEncoding('utf8');
        //         response.on('data', function (chunk) {
        //             //console.log(chunk);
        //             answ += chunk;
        //         }).on('end', function () {
        //             var str = JSON.parse(answ);
        //
        //             //let s = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
        //             //console.log(str);
        //             //res.send(str);
        //             //answ = str;
        //             res.send(str);
        //         }).on('error', (err) => {
        //             let s = '{"status":' + "inactive" + '}';
        //             console.error(err.stack);
        //             //answ = s;
        //             res.send(s);
        //         });
        //     });
        //     httpreq.write(data);
        //     httpreq.end();
        // } catch (e) {
        //
        //     console.log(e);
        // }

        var url;
        url = 'http://192.168.40.10';
        var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
        // var parsedPort;

        var options = {
            hostname: parsedHost,
            port: 18000,
            // path: clientRequest.url,
            path:'/video/frame.jpeg?frame=SEQUENCE_COUNTER_TO_PREVENT_CACHING',
            // method: clientRequest.method,
            method: 'GET',
            headers: {
                'User-Agent': 'auto-request-bot',
                'Content-Type':'image/jpeg',
                'Connection':'keep-alive',
                'Keep-Alive':'timeout=5',
                'Transfer-Encoding':'chunked'
            }
        };

        var serverRequest = http.request(options, function(serverResponse) {
            var body = '';
            if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
                serverResponse.on('data', function(chunk) {
                    body += chunk;
                });

                serverResponse.on('end', function() {
                    // Make changes to HTML files when they're done being read.
                    body = body.replace(`example`, `Cat!` );

                    res.writeHead(serverResponse.statusCode, serverResponse.headers);
                    res.end(body);
                });
            }
            else {
                serverResponse.pipe(res, {
                    end: true
                });
                res.contentType(serverResponse.headers['content-type'])
            }
        });

        serverRequest.end();

        var answ = '';
        return answ;

    }
};