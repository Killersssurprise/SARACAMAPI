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

    // var st = req.param('start_time');
    // var et = req.param('end_time');
    // var lg = req.param('login');
    // var ps = req.param('password');
    // var i = req.param('ip');
    //
    // if (typeof lg !== 'undefined' && lg !== null) {
    //     login = lg;
    // } else {
    //     let s = '{"error":' + "no param login" + '}';
    //     res.send(s);
    //     return;
    // }
    //
    // if (typeof ps !== 'undefined' && ps !== null) {
    //     password = ps;
    // } else {
    //     let s = '{"error":' + "no param password" + '}';
    //     res.send(s);
    //     return;
    // }
    //
    // if (typeof st !== 'undefined' && st !== null) {
    //     timestampStart = st;
    // } else {
    //     let s = '{"error":' + "no param start_time" + '}';
    //     res.send(s);
    //     return;
    // }
    //
    // if (typeof et !== 'undefined' && et !== null) {
    //     timestampEnd = et;
    // } else {
    //     let s = '{"error":' + "no param end_time" + '}';
    //     res.send(s);
    //     return;
    // }
    //
    // if (typeof ip !== 'undefined' && ip !== null) {
    //     ip = i;
    // } else {
    //     let s = '{"error":' + "no param ip" + '}';
    //     res.send(s);
    //     return;
    // }

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

    var body = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
    //
    //
    // var newarr=[];
    // data.forEach(element => newarr.push('{'+element.Key+' : '+element.Value+'}'));
    // var newarr='{';
    //
    //
    // for (let i = 0; i < data.length; i++) {
    //     if(i === data.length-1){
    //         newarr +='{'+data[i].Key+' : '+data[i].Value+'}}';
    //     } else{
    //         newarr +='{'+data[i].Key+' : '+data[i].Value+'},';
    //     }
    // }
    //
    // res.send(newarr);

    // var data = JSON.parse(body);
    //
    // var newarr=[];
    // data.forEach(element => newarr.push('{'+element.Key+' : '+element.Value+'}'));
    // newarr='{';
    //
    //
    // for (let i = 0; i < data.length; i++) {
    //     if(i === data.length-1){
    //         newarr +='{'+data[i].Key+' : '+data[i].Value+'}}';
    //     } else{
    //         newarr +='{'+data[i].Key+' : '+data[i].Value+'},';
    //     }
    // }
    //
    //
    // res.send(newarr);

    var headers = {
        'Content-Length': '1000'
    };

    var options = {
        url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);


            var data = JSON.parse(body);

            var newarr=[];
            data.forEach(element => newarr.push('{'+element.Key+' : '+element.Value+'}'));
            newarr='{';


            for (let i = 0; i < data.length; i++) {
                if(i === data.length-1){
                    newarr +='{'+data[i].Key+' : '+data[i].Value+'}}';
                } else{
                    newarr +='{'+data[i].Key+' : '+data[i].Value+'},';
                }
            }


            res.send(newarr);


        }else{
            console.error(error);
        }
    }

    // request(options, callback);


});


module.exports = router;