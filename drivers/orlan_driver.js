var express = require('express');
var router = express.Router();
var http = require('http');
const jsonParser = express.json();
var request = require('request');
var utils = require('../utils/utils');
var fs = require('fs');

var headers = {
    'Content-Length': '1000',
    'Content-Type': 'application/json'
};
function objectValues(obj) {
    let vals = [];
    for (const prop in obj) {
        vals.push(obj[prop]);
    }
    return vals;
}
module.exports = {

    getViolationsData: function getViolationsData(login, password, ip, port, timestampStart, timestampEnd, res) {

        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);

                //var values = body;
                var violations_count;

                var data = JSON.parse(body);

                var newarr = [];
                data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
                newarr = '{';
                for (let i = 0; i < data.length; i++) {
                    if (i === data.length - 1) {
                        newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
                    } else {
                        newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
                    }

                    if (data[i].Key == 'Recog1Hour') {
                        // violations_count = value;
                        let s = '{"violations":' + data[i].Value + '}';
                        res.send(s);
                    }
                }

            } else {
                console.error(error);
                res.send(error);
            }
        }

        request(options, callback);

    },

    getPassagesData: function getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res) {

        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);

                var data = JSON.parse(body);
                var newarr = [];
                data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
                newarr = '{';
                for (let i = 0; i < data.length; i++) {
                    if (i === data.length - 1) {
                        newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
                    } else {
                        newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
                    }

                    if (data[i].Key == 'Recog24Hours') {
                        // violations_count = value;
                        let s = '{"passages":' + data[i].Value + '}';
                        res.send(s);
                    }
                }

            } else {
                console.error(error);
                res.send(error);
            }
        }

        request(options, callback);

    },

    getIsActiveData: function getIsActiveData(login, password, ip, port, timestampStart, timestampEnd, res) {


        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        // var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        // var data = JSON.parse(b);
        //
        //
        // // var data = JSON.parse(body);
        //
        // var newarr = [];
        // data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        // newarr = '{';
        // for (let i = 0; i < data.length; i++) {
        //     if (i === data.length - 1) {
        //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
        //     } else {
        //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
        //     }
        //
        //     if (data[i].Key == 'Recog24Hours') {
        //         // violations_count = value;
        //         let s = '{"passages":' + data[i].Value + '}';
        //         res.send(s);
        //     }
        // }

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);

                let s = '{"status":' + "active" + '}';
                res.send(s);

            } else {
                // console.error(error);
                // let s = '{"status":' + "inactive" + '}';
                // res.send(s);
                // //res.send(error);
                let errAnswer = utils.getErrorMessage(error, response, body);
                res.send(errAnswer);
            }
        }

        request(options, callback);

    },

    getFullCamInfoData: function getFullCamInfoData(login, password, ip, port, timestampStart, timestampEnd, res) {

        let pingMS1 = Date.now();

        var startDate = new Date(timestampStart);
        var endDate = new Date(timestampEnd);

        //"FromDate":"2021-02-17T00:00:00.000Z"
        console.log(startDate);
        console.log(endDate);

        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        // var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        // var data = JSON.parse(b);
        //
        //
        // // var data = JSON.parse(body);
        //
        // var newarr = [];
        // data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        // newarr = '{';
        // let s = '{{"status":' + '"active"' + '},';
        // for (let i = 0; i < data.length; i++) {
        //     if (i === data.length - 1) {
        //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
        //         if (data[i].Key === 'Recog24Hours') {
        //             // violations_count = value;
        //             s += '{"' + 'passages' + '":' + data[i].Value + '}}';
        //         }
        //         if (data[i].Key === 'Recog1Hour') {
        //             // violations_count = value;
        //             s += '{"' + 'violations' + '":' + data[i].Value + '}}';
        //         }
        //     } else {
        //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
        //         if (data[i].Key === 'Recog24Hours') {
        //             // violations_count = value;
        //             s += '{"' + 'passages' + '":' + data[i].Value + '},';
        //         }
        //         if (data[i].Key === 'Recog1Hour') {
        //             // violations_count = value;
        //             s += '{"' + 'violations' + '":' + data[i].Value + '},';
        //         }
        //
        //     }
        //
        // }
        // res.send(s);


        // function callback(error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         console.log(body);
        //
        //         let pingMS2 = Date.now();
        //
        //         console.log("Body: "+body.toString());
        //         console.log("Response: "+response);
        //         var data = JSON.parse(body);
        //
        //         var v;
        //         var p;
        //         var voltage;
        //         var stat = 'active';
        //
        //         var newarr = [];
        //         data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        //         newarr = '{';
        //         let s = '{status:' + '"active"' + ',' + 'ping:' + (pingMS2 - pingMS1) + ',';
        //         //s+='ping:'+(pingMS2-pingMS1)+',';
        //         for (let i = 0; i < data.length; i++) {
        //             if (i === data.length - 1) {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
        //                 if (data[i].Key === 'Recog1Hour') {
        //                     // violations_count = value;
        //                     s += 'passages' + ':"' + data[i].Value + '"}';
        //                     p = data[i].Value;
        //                 }
        //                 if (data[i].Key === 'Viols1Hour') {
        //                     // violations_count = value;
        //                     s += 'violations' + ':"' + data[i].Value + '"}';
        //                     v = data[i].Value;
        //                 }
        //                 if (data[i].Key === 'Voltage') {
        //                     // violations_count = value;
        //                     s += 'voltage' + ':"' + data[i].Value + '"}';
        //                     voltage = data[i].Value;
        //                 }
        //             } else {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
        //                 if (data[i].Key === 'Recog1Hour') {
        //                     // violations_count = value;
        //                     s += 'passages' + ':"' + data[i].Value + '", ';
        //                     p = data[i].Value;
        //                 }
        //                 if (data[i].Key === 'Viols1Hour') {
        //                     // violations_count = value;
        //                     s += 'violations' + ':"' + data[i].Value + '", ';
        //                     v = data[i].Value;
        //                 }
        //                 if (data[i].Key === 'Voltage') {
        //                     // violations_count = value;
        //                     s += 'voltage' + ':"' + data[i].Value + '", ';
        //                     voltage = data[i].Value;
        //                 }
        //
        //             }
        //
        //         }
        //
        //         var d = {
        //             violations: v,
        //             passages: p,
        //             status: stat,
        //             ping: (pingMS2 - pingMS1),
        //             voltage: voltage.replace(',', '.')
        //         };
        //
        //         res.send(d);
        //
        //     } else {
        //         let errAnswer = utils.getErrorMessage(error, response, body);
        //         res.send(errAnswer);
        //     }
        // }

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);

                let pingMS2 = Date.now();

                // console.log("Body: "+body.toString());
                // console.log("Response: "+response);
                // var data = JSON.parse(body);
                // var data = JSON.stringify(body);

                // var data = JSON.parse(body);

                // var data = JSON.parse(body.replace('\n',''));
                // var t = ""+body;
                // console.log(t);
                // var data = JSON.parse(t);
                // var data = JSON.parse(JSON.stringify(body));
                // var data = body;

                // console.log(objectValues(data).join(""));
                // var data = JSON.parse(objectValues(body).join(""));
                var data = JSON.parse(body.trim());
                // console.log(data);
                //
                // console.log(typeof data);
                // console.log(Object.keys(data));
                // try{
                //     data = JSON.parse(body.replaceAll('\n',''));
                // }catch(e){
                //     console.log(e);
                //     console.log("But body: "+body);
                // }



                // var v;
                // var p;
                // var voltage;
                var stat = 'active';

                // var newarr = [];
                // data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
                // newarr = '{';
                // let s = '{status:' + '"active"' + ',' + 'ping:' + (pingMS2 - pingMS1) + ',';
                //s+='ping:'+(pingMS2-pingMS1)+',';
                // for (let i = 0; i < data.length; i++) {
                //     if (i === data.length - 1) {
                //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
                //         if (data[i].Key === 'Recog1Hour') {
                //             // violations_count = value;
                //             s += 'passages' + ':"' + data[i].Value + '"}';
                //             p = data[i].Value;
                //         }
                //         if (data[i].Key === 'Viols1Hour') {
                //             // violations_count = value;
                //             s += 'violations' + ':"' + data[i].Value + '"}';
                //             v = data[i].Value;
                //         }
                //         if (data[i].Key === 'Voltage') {
                //             // violations_count = value;
                //             s += 'voltage' + ':"' + data[i].Value + '"}';
                //             voltage = data[i].Value;
                //         }
                //     } else {
                //         newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
                //         if (data[i].Key === 'Recog1Hour') {
                //             // violations_count = value;
                //             s += 'passages' + ':"' + data[i].Value + '", ';
                //             p = data[i].Value;
                //         }
                //         if (data[i].Key === 'Viols1Hour') {
                //             // violations_count = value;
                //             s += 'violations' + ':"' + data[i].Value + '", ';
                //             v = data[i].Value;
                //         }
                //         if (data[i].Key === 'Voltage') {
                //             // violations_count = value;
                //             s += 'voltage' + ':"' + data[i].Value + '", ';
                //             voltage = data[i].Value;
                //         }
                //
                //     }
                //
                // }
                // body = JSON.stringify(body);
                // console.log("UptimeSeconds: "+data.UptimeSeconds);
                // console.log("RadarInUse: "+data.RadarInUse);
                // console.log("RadarFound: "+data.RadarFound);
                // console.log("RadarOk: "+data.RadarOk);
                // console.log("Temperature: "+data.Temperature);
                // console.log("Voltage: "+data.Voltage);
                // console.log("Recog24Hours: "+data.Recog24Hours);
                // console.log("Recog1Hour: "+data.Recog1Hour);
                // console.log("Viols24Hours: "+data.Viols24Hours);
                // console.log("Viols1Hour: "+data.Viols1Hour);
                // console.log("TotalRecog24Hours: "+data.TotalRecog24Hours);
                // console.log("TotalRecog1Hour: "+data.TotalRecog1Hour);
                let v = data.Voltage;
                v = v.replace(',', '.');
                let d = {
                    violations: data.Viols1Hour,
                    violations24: data.Viols24Hours,
                    passages: data.Recog1Hour,
                    passages24: data.Recog24Hours,
                    status: stat,
                    ping: (pingMS2 - pingMS1),
                    voltage: v
                };

                res.send(d);

            } else {
                let errAnswer = utils.getErrorMessage(error, response, body);
                res.send(errAnswer);
            }
        }

        request(options, callback);

    },

    getFullApiInfo: function getFullApiInfo(login, password, ip, port, timestampStart, timestampEnd, res) {

        // var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        // var data = JSON.parse(b);
        // res.send(data);


        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);

                var data = JSON.parse(body);
                res.send(data);

            } else {
                // console.error(error);
                // let s = '{"status":' + "inactive" + '}';
                // res.send(s);

                let errAnswer = utils.getErrorMessage(error, response, body);
                res.send(errAnswer);
            }
        }

        request(options, callback);
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

        // var url;
        // url = ('http://'+ip+'8080').join('/');
        // var parsedHost = url.split('/').splice(2).splice(0, 1).join('/')
        // var parsedPort;

        // var options = {
        //     hostname: url,
        //     // port: 18000,
        //     port: 8080,
        //     // path: clientRequest.url,
        //     // path:'/video/frame.jpeg?frame=SEQUENCE_COUNTER_TO_PREVENT_CACHING',
        //     path:'/orlanApi/video/frame?size=100&sizePx=800x600&cam=dir0::0&dt='+timestampEnd+'\'',
        //     // method: clientRequest.method,
        //     method: 'GET',
        //     headers: {
        //         'User-Agent': 'auto-request-bot',
        //         'Content-Type':'image/jpeg',
        //         'Connection':'keep-alive',
        //         'Keep-Alive':'timeout=5',
        //         'Transfer-Encoding':'chunked'
        //     }
        // };

        console.log('IP: '+ip);
        console.log('Timestamp: '+timestampEnd);
        //
        // var options = {
        //     'method': 'GET',
        //     'url': 'http://'+ip+':8080/orlanApi/video/frame?size=100&sizePx=800x600&cam=dir0::0&dt='+timestampEnd+'\'',
        //     // 'headers': {
        //     // }
        // };

        // var serverResponse = request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        //     res.writeHead(serverResponse.statusCode, serverResponse.headers);
        //     res.end(response.body)
        // });

        // var serverRequest = http.request(options, function(serverResponse) {
        //     var body = '';
        //     if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
        //         serverResponse.on('data', function(chunk) {
        //             body += chunk;
        //         });
        //
        //         serverResponse.on('end', function() {
        //             // Make changes to HTML files when they're done being read.
        //             // body = body.replace(`example`, `Cat!` );
        //
        //             res.writeHead(serverResponse.statusCode, serverResponse.headers);
        //             res.end(body);
        //         });
        //     }
        //     else {
        //         serverResponse.pipe(res, {
        //             end: true
        //         });
        //         res.contentType(serverResponse.headers['content-type'])
        //     }
        // });
        //
        // serverRequest.end();

        // var options = {
        //     'method': 'GET',
        //     // 'url': 'http://172.19.58.49:8080/orlanApi/video/frame?size=100&sizePx=800x600&cam=dir0::0&dt=1625320030089',
        //     'url': 'http://172.19.58.49:8080/orlanApi/video/frame',
        //     'headers': {
        //     }
        // };
        // // try {
        //     var httpreq = http.request(options, function (response) {
        //         //response.setEncoding('utf8');
        //         response.on('data', function (chunk) {
        //             //console.log(chunk);
        //             answ += chunk;
        //         }).on('end', function () {
        //             //var str=JSON.parse(answ)
        //
        //             //let s = '{"common":'+JSON.stringify(str['getStats']['common']['total'])+'}';
        //             let s = '{"status":' + "active" + '}';
        //             console.log(s);
        //             //res.send(s);
        //             res.send(s);
        //         }).on('error', (err) => {
        //             let s = '{"status":' + "inactive" + '}';
        //             //res.send(s);
        //             res.send(s);
        //             console.error(err.stack);
        //         });
        //     });
        //
        //     // httpreq.write(data);
        //     httpreq.end();
        // } catch (e) {
        //
        //     console.log(e);
        // }

        var options = {
            'method': 'GET',
            'hostname': ip,
            'port': 8080,
            'path': '/orlanApi/video/frame?size=100&sizePx=800x600&cam=dir0::0&dt='+timestampEnd,
            'headers': {
            },
            'maxRedirects': 20
        };

        var req = http.request(options, function (resource) {
            var chunks = [];

            resource.on("data", function (chunk) {
                chunks.push(chunk);
            });

            resource.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                res.set({
                    'Content-Type': 'image/jpeg',

                });

                res.send(body);
                // console.log(body.toString());
            });

            resource.on("error", function (error) {
                res.send(error);
                // console.error(error);
            });
        });

        req.end();

        var answ = '';
        return answ;

    }

};