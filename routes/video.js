var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
const jsonParser = express.json();
var kordon_driver = require('../drivers/kordon_driver_alternative');
var orlan_driver = require('../drivers/orlan_driver');
// var vocord_driver = require('../drivers/vocord_driver');
var vocord_driver = require('../drivers/vocord_driver_alternative');
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

// router.post("/", jsonParser, function (req, res) {
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

        var answ = '';

        switch (device_type) {
            case null:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case 'undefined':
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case kordonID:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case vocordID:
                vocord_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case orlanID:
                orlan_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            default:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
        }

    } catch (e) {

        console.log(e);
        res.send(e);
    }
});

router.get("/", jsonParser, function (req, res) {


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

        if (typeof i !== 'undefined' && i !== null) {
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

        var answ = '';

        switch (device_type) {
            case null:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case 'undefined':
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case kordonID:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case vocordID:
                vocord_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            case orlanID:
                orlan_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
            default:
                kordon_driver.getVideo(login, password, ip, port, timestampStart, timestampEnd, res);
                break;
        }

    } catch (e) {

        console.log(e);
        res.send(e);
    }
});

module.exports = router;