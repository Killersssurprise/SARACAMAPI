var express = require('express');
var router = express.Router();

var http = require('http');
const jsonParser = express.json();
var request = require('request');
var login = "admin";
var password = "Fk5bu8jG";
var job = "getTelemetry";
var timestampStart = 1612818000;
var timestampEnd = 1612891239;
var ip = '192.168.72.11';
var deviceType ='kordon';

router.post("/", jsonParser, function (req, res) {

    var st = req.param('start_time');
    var et = req.param('end_time');
    var lg = req.param('login');
    var ps = req.param('password');
    var i = req.param('ip');

    if (typeof lg !== 'undefined' && lg !== null) {
        login = lg;
    } else {
        let s = '{"error":' + "no param login" + '}';
        res.send(s);
        return;
    }

    if (typeof ps !== 'undefined' && ps !== null) {
        password = ps;
    } else {
        let s = '{"error":' + "no param password" + '}';
        res.send(s);
        return;
    }

    if (typeof st !== 'undefined' && st !== null) {
        timestampStart = st;
    } else {
        let s = '{"error":' + "no param start_time" + '}';
        res.send(s);
        return;
    }

    if (typeof et !== 'undefined' && et !== null) {
        timestampEnd = et;
    } else {
        let s = '{"error":' + "no param end_time" + '}';
        res.send(s);
        return;
    }

    if (typeof ip !== 'undefined' && ip !== null) {
        ip = i;
    } else {
        let s = '{"error":' + "no param ip" + '}';
        res.send(s);
        return;
    }

    // var data = JSON.stringify({
    //     "auth": {
    //         "login": login,
    //         "password": password
    //     },
    //     "request": {
    //         "job": job,
    //         "getTelemetry": {
    //             // "type": "Stat: Targets per 10 sec"
    //             "type": "Health: PC voltage",
    //             "func": "min"
    //         }
    //     }
    // });

    // http://{ip_адрес}:{порт}/telemetry.json?usr={логин}&pwd={пароль}


    var options = {
        url: '192.168.73.4:80/telemetry.json?usr=OrlanUser&pwd=OrlanPassword'
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    }

    request(options, callback);

    // var options = {
    //     host: ip,
    //     path: '/telemetry.json',
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
    //
    //             console.log(answ);
    //             res.send(answ);
    //         }).on('error', (err) => {
    //             let s = '{"status":' + "inactive" + '}';
    //             res.send(s);
    //             console.error(err.stack);
    //             return;
    //         });
    //     });
    //     httpreq.write(data);
    //     httpreq.end();
    // } catch (e) {
    //
    //     console.log(e);
    // }
    //res.send(data);
});


module.exports = router;