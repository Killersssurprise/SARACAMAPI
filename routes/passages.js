var express = require('express');
var router = express.Router();

var http = require('http');
const jsonParser = express.json();
var kordon_driver = require('../drivers/kordon_driver');
var orlan_driver = require('../drivers/orlan_driver');
var vocord_driver = require('../drivers/vocord_driver');
var login = "admin";
var password = "Fk5bu8jG";
var job = "getStats";
var timestampStart = 1612818000;
var timestampEnd = 1612891239;
var ip = '192.168.72.11';
var port = '';
var device_type;

const kordonID = '2';
const orlanID = '3';
const vocordID = '5';

router.post("/", jsonParser, function (req, res) {

    try {
        var st = req.param('start_time');
        var et = req.param('end_time');
        var lg = req.param('login');
        var ps = req.param('password');
        var i = req.param('ip');
        var dt = req.param('device_type');
        var pt = req.param('port');


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

        if (typeof pt !== 'undefined' && pt !== null) {
            port = pt;
        }

        if (typeof dt !== 'undefined' && dt !== null) {
            device_type = dt;
        } else {
            let s = '{"error":' + "no param device_type" + '}';
            res.send(s);
            return;
        }

        //test code

       var answ = '';

        switch (device_type) {
            case null:
                kordon_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case 'undefined':
                kordon_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case kordonID:
                kordon_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case vocordID:
                vocord_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case orlanID:
                orlan_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            default:
                kordon_driver.getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
        }

    } catch (e) {

        console.log(e);
        res.send(e);
    }

    //res.send(answ);


//     var data = JSON.stringify({
//         "auth": {
//             "login": login,
//             "password": password
//         },
//         "request": {
//             "job": job,
//             "getStats": {
//                 "timestampStart": timestampStart,
//                 "timestampEnd": timestampEnd,
//                 "speedThresholds": [
//                     {
//                         "name": "Превышение на 20", "min": 23, "max": 43
//                     },
//                     {
//                         "name": "Превышение на 40",
//                         "min": 43, "max": 63
//                     },
//                     {
//                         "name": "Превышение на 60", "min": 63, "max": 83
//                     },
//                     {
//                         "name": "Превышение на 80", "min": 83, "max": 0
//                     }
//                 ],
//                 "showInfo": true
//             }
//         }
//     });
//
//     var options = {
//         host: ip,
//         path: '/api11.php',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': Buffer.byteLength(data)
//         }
//
//     };
//     var answ = '';
//     try {
//         var httpreq = http.request(options, function (response) {
//             //response.setEncoding('utf8');
//             response.on('data', function (chunk) {
//                 //console.log(chunk);
//                 answ += chunk;
//             }).on('end', function () {
//                 var str = JSON.parse(answ);
//
//                 let s = '{"passages":' + JSON.stringify(str['getStats']['common']['total']) + '}';
//                 console.log(s);
//                 res.send(s);
//             }).on('error', (err) => {
//                 let s = '{"status":' + "inactive" + '}';
//                 res.send(s);
//                 console.error(err.stack);
//             });
//         });
//
//         httpreq.write(data);
//         httpreq.end();
//
//     } catch (e) {
//
//         console.log(e);
//     }
//     //res.send(data);
});

module.exports = router;