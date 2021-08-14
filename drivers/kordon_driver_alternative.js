var http = require('http');
var job = "getStats";
// var snmp = require('snmp-native');
var sys = require('sys')
var exec = require('child_process').exec;
var rs = require("node-bignumber");
var request = require('request-promise');
var utils = require('../utils/utils');

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

        function puts(error, stdout, stderr) {
            sys.puts(stdout)
        }

        exec(("snmpget -v2c -Oqv -c public " + ip + " NET-SNMP-MIB::netSnmp.99.1.1.1.3.18.72.101.97.108.116.104.58.32.80.67.32.118.111.108.116.97.103.101"), function (err, stdout, stderr) {
            console.log(stdout);
            snmp_voltage = stdout;
            snmp_voltage.replace(/\n/g, '');
        });


        let pingMS1 = Date.now();

        let _port = '80';

        if (port !== '' && typeof port !== 'undefined' && port !== null) {
            _port = port;
        }


        console.log("port is: " + _port);


        var headersDataRequest = {
            'Content-Type': 'application/json',
        };

        var dataStringDataRequest = '{ "auth": {"login": "' + login + '","password": "' + password + '"}, "request": { "job": "getDeviceInfo"}}';

        var optionsDataRequest = {
            url: 'http://' + ip + ':' + _port + '/api11.php',
            method: 'POST',
            headers: headersDataRequest,
            body: dataStringDataRequest
        };
        var ddd = '';

        function callbackDataRequest(error, response, body) {
            if (error)
                console.log("error: " + error);
            if (response)
                console.log("response: " + response);
            if (body)
                console.log("body: " + body);

            if (!error && response.statusCode === 200) {
                //var data = body;

                // console.log("callbackDataRequest" + body);

                body = body.replace(/\n/g, '');
                body = body.replace('   ', ' ');
                body = body.replace('  ', ' ');
                body = body.replace('\n', '');

                ddd = JSON.parse(body);
                // res.send(body);
                return body;
            } else {
                let errAnswer = utils.getErrorMessage(error, response, body);
                res.send(errAnswer);
            }
        }

        // request(options, callback);
        request(optionsDataRequest, callbackDataRequest).then(function (body) {


            //////

            var hhh = {
                'Content-Type': 'application/json'
            };

            timestampStart = timestampStart.slice(0, -3);
            timestampEnd = timestampEnd.slice(0, -3);
            var dddsss = '{ "auth": { "login": "' + login + '", "password": "' + password + '" }, "request": { "job": "getStats", "getStats": { "timestampStart": ' + timestampStart + ', "timestampEnd": ' + timestampEnd + ', "speedThresholds": [ { "name": "Превышение на 20", "min": 23, "max": 43 }, { "name": "Превышение на 40", "min": 43, "max": 63 }, { "name": "Превышение на 60", "min": 63, "max": 83 }, { "name": "Превышение на 80", "min": 83, "max": 0 } ], "showInfo": true } } } ';

            var ooo = {
                url: 'http://' + ip + ':' + _port + '/api11.php',
                method: 'POST',
                headers: hhh,
                body: dddsss
            };

            function callbackCCC(error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(body);

                    var str = JSON.parse(body);
                    let pingMS2 = Date.now();

                    console.log("full kordon info: " + str);

                    var data = {
                        violations: JSON.stringify(str['getStats']['violation']['total']),
                        passages: JSON.stringify(str['getStats']['common']['total']),
                        status: 'active',
                        ping: (pingMS2 - pingMS1),
                        voltage: (snmp_voltage / 10),
                        data: ddd
                    };

                    let answer = JSON.stringify(data);

                    //console.log(str);
                    //res.send(answer);
                    // answ = answer;
                    res.send(answer);

                } else {
                    let errAnswer = utils.getErrorMessage(error, response, body);
                    res.send(errAnswer);
                }
            }

            /////


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


            // var options = {
            //     // url: 'http://' + ip + ':' + _port + '/api11.php',
            //     host: ip,
            //     // port: _port,
            //     path: '/api11.php',
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Content-Length': Buffer.byteLength(data)
            //     }
            //
            // };
            // console.log("url " + 'http://' + ip + ':' + _port + '/api11.php');

            request(ooo, callbackCCC);


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
            //             // let violations = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
            //             // let passages = '{"passages":' + JSON.stringify(str['getStats']['common']['total']) + '}';
            //             // let isActive = '{"status":' + "active" + '}';
            //
            //             let pingMS2 = Date.now();
            //
            //             console.log("full kordon info: "+str);
            //
            //             var data = {
            //                 violations: JSON.stringify(str['getStats']['violation']['total']),
            //                 passages: JSON.stringify(str['getStats']['common']['total']),
            //                 status: 'active',
            //                 ping: (pingMS2 - pingMS1),
            //                 voltage: (snmp_voltage / 10),
            //                 data: ddd
            //             };
            //
            //             let answer = JSON.stringify(data);
            //
            //             //console.log(str);
            //             //res.send(answer);
            //             // answ = answer;
            //             res.send(answer);
            //             //res.removeAllListeners('data');
            //             // httpreq.end();
            //
            //         }).on('error', (err) => {
            //             let s = '{"status":' + "inactive" + '}';
            //             //res.send(s);
            //             console.error(err.stack);
            //             // answ = s
            //             res.send(s);
            //         });
            //     });
            //     httpreq.write(data);
            //     httpreq.end();
            // } catch (e) {
            //
            //     console.log(e);
            // }

        });


    },

    // getFullCamInfoData: function getFullCamInfoData(login, password, ip, port, timestampStart, timestampEnd, res) {
    //
    //     dummyFunction(login, password, ip, port, timestampStart, timestampEnd, res);
    //
    //
    // },

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

    }

    // getVideo: function getVideo(login, password, ip, port, timestampStart, timestampEnd, res) {
    //
    //     // http://192.168.40.130:84/140F7FC9-4C38-45F1-9E71-538F0C99C458/medium/560.jpg?id=1627758275951
    //
    //     /***** запрос на получение channelId*/
    //
    //     // var request = require('request');
    //     //
    //     // var headers = {
    //     //     'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
    //     //     'Accept': 'application/json, text/plain, */*',
    //     //     'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
    //     //     'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
    //     //     'Cache-Control': 'no-cache',
    //     //     'Pragma': 'no-cache',
    //     //     'Authorization': 'Bearer qJJbLc9ThmH0A64Pa1SO1nkXznewnC5OSniBvxgMiweQbQiNaGNZ7eS0X-fERC6tbzeEAnv2VP86Kxi9Pww0JR-URjBDCJZzQwO41ZLvPlhp-wNqZwBwRmgverBPU1l9MGVqLn--lnO4u9N-GPJiozoMdRJI_eE1Dc7HplX4gESpQw2UvQ2VTDmrmECeXKyjT_VvcXNiMY1IwKwMi-egDyYw0nwk_3F7Oa_tY6sljrg',
    //     //     'DNT': '1',
    //     //     'Connection': 'keep-alive',
    //     //     'Referer': 'http://192.168.40.130/'
    //     // };
    //     //
    //     // var options = {
    //     //     url: 'http://192.168.40.130/MonoblockService/api/camera/GetCamerasForNotification',
    //     //     headers: headers
    //     // };
    //     //
    //     // function callback(error, response, body) {
    //     //     if (!error && response.statusCode == 200) {
    //     //         console.log(body);
    //     //     }
    //     // }
    //     //
    //     // request(options, callback);
    //
    //     /*****/
    //
    //     var url;
    //     url = 'http://192.168.40.130';
    //     var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
    //     // var parsedPort;
    //
    //     var options = {
    //         hostname: parsedHost,
    //         port: 84,
    //         // path: clientRequest.url,
    //         path:'/140F7FC9-4C38-45F1-9E71-538F0C99C458/medium/560.jpg?id=1627758275951',
    //         // method: clientRequest.method,
    //         method: 'GET',
    //         headers: {
    //             'User-Agent': 'auto-request-bot',
    //             'Content-Type':'image/jpeg',
    //             'Connection':'keep-alive',
    //             'Keep-Alive':'timeout=5',
    //             'Transfer-Encoding':'chunked'
    //         }
    //     };
    //
    //     var serverRequest = http.request(options, function(serverResponse) {
    //         var body = '';
    //         if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
    //             serverResponse.on('data', function(chunk) {
    //                 body += chunk;
    //             });
    //
    //             serverResponse.on('end', function() {
    //                 // Make changes to HTML files when they're done being read.
    //                 body = body.replace(`example`, `Cat!` );
    //
    //                 res.writeHead(serverResponse.statusCode, serverResponse.headers);
    //                 res.end(body);
    //             });
    //         }
    //         else {
    //             serverResponse.pipe(res, {
    //                 end: true
    //             });
    //             res.contentType(serverResponse.headers['content-type'])
    //         }
    //     });
    //
    //     serverRequest.end();
    //
    //     var answ = '';
    //     return answ;
    //
    // }


};

function dummyFunction(login, password, ip, port, timestampStart, timestampEnd, res) {

    let _port = '80';

    if (port !== '' && typeof port !== 'undefined' && port !== null) {
        _port = port;
    }

    var headers = {
        'Content-Type': 'application/json'
    };

    var dataString = '{ "auth": {"login": "' + login + '","password": "' + password + '"}, "request": { "job": "getDeviceInfo"}}';

    var options = {
        url: 'http://' + ip + ':' + port + '/api11.php',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            res.send(body);
        } else {
            let errAnswer = utils.getErrorMessage(error, response, body);
            res.send(errAnswer);
        }
    }

    request(options, callback);

}