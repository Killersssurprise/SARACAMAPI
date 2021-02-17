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
var deviceType = 'kordon';

router.post("/", jsonParser, function (req, res) {

    var type = req.param('type');



    //проезды
    if (type == '1') {
        var headers = {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer 7zfs2dpXIxmJGXfL2BWY_dQBl2XeBWaT0CNicxWwUrCjV7oDBiu-Rm9hOYiLZYHswIJXJp5WtB-fhx_p-u7Io4Tr3eiMHUl9mk1yEm7lHqUi69RFKDiO7n2_UwfcBJFdvDsNftIq9lPWowB_Uc4pEKTtgtAxRNLSZoPE0C6r1600vFbulovQKPmOQh0hleI5f51sl7Tsyn4lyrYPr9fFk-AG_eB70gxJUaqZ70dJ3rM',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'http://192.168.40.26',
            'Referer': 'http://192.168.40.26/',
            'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        };

        var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":0,"FromDate":"2021-02-17T00:00:00.000Z","ToDate":"2021-02-17T16:47:01.000Z"}';

        var options = {
            url: 'http://192.168.40.26/MonoblockService/api/car/PostCar',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            }
        }

        request(options, callback);

        //нарушения
    } else if (type === 2) {
        var headers = {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer 7zfs2dpXIxmJGXfL2BWY_dQBl2XeBWaT0CNicxWwUrCjV7oDBiu-Rm9hOYiLZYHswIJXJp5WtB-fhx_p-u7Io4Tr3eiMHUl9mk1yEm7lHqUi69RFKDiO7n2_UwfcBJFdvDsNftIq9lPWowB_Uc4pEKTtgtAxRNLSZoPE0C6r1600vFbulovQKPmOQh0hleI5f51sl7Tsyn4lyrYPr9fFk-AG_eB70gxJUaqZ70dJ3rM',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'http://192.168.40.26',
            'Referer': 'http://192.168.40.26/',
            'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        };

        var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":127,"FromDate":"2021-02-17T00:00:00.000Z","ToDate":"2021-02-17T16:47:01.000Z"}';

        var options = {
            url: 'http://192.168.40.26/MonoblockService/api/car/PostCar',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            }
        }

        request(options, callback);

        //Состояние камеры
    } else if (type === 3) {

        var headers = {
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer 7zfs2dpXIxmJGXfL2BWY_dQBl2XeBWaT0CNicxWwUrCjV7oDBiu-Rm9hOYiLZYHswIJXJp5WtB-fhx_p-u7Io4Tr3eiMHUl9mk1yEm7lHqUi69RFKDiO7n2_UwfcBJFdvDsNftIq9lPWowB_Uc4pEKTtgtAxRNLSZoPE0C6r1600vFbulovQKPmOQh0hleI5f51sl7Tsyn4lyrYPr9fFk-AG_eB70gxJUaqZ70dJ3rM',
            'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
            'Referer': 'http://192.168.40.26/',
            'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        };

        var options = {
            url: 'http://192.168.40.26/MonoblockService/api/deviceState/getDeviceState',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            }
        }

        request(options, callback);

        //какой-то лаг
    } else if (type === 4) {
        var headers = {
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer 7zfs2dpXIxmJGXfL2BWY_dQBl2XeBWaT0CNicxWwUrCjV7oDBiu-Rm9hOYiLZYHswIJXJp5WtB-fhx_p-u7Io4Tr3eiMHUl9mk1yEm7lHqUi69RFKDiO7n2_UwfcBJFdvDsNftIq9lPWowB_Uc4pEKTtgtAxRNLSZoPE0C6r1600vFbulovQKPmOQh0hleI5f51sl7Tsyn4lyrYPr9fFk-AG_eB70gxJUaqZ70dJ3rM',
            'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
            'Referer': 'http://192.168.40.26/',
            'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        };

        var options = {
            url: 'http://192.168.40.26/MonoblockService/api/exportConfig/GetExportStatus',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            }
        }

        request(options, callback);
    }


});


module.exports = router;