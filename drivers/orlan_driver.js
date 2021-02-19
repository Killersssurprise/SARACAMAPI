var express = require('express');
var router = express.Router();
var http = require('http');
const jsonParser = express.json();
var request = require('request');

var headers = {
    'Content-Length': '1000'
};

module.exports = {

    getViolationsData: function getViolationsData(login, password, ip, timestampStart, timestampEnd, res) {


        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        //var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        //var data = JSON.parse(b);


        // var data = JSON.parse(body);
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
        //         let s = '{"violations":' + data[i].Value + '}';
        //         res.send(s);
        //     }
        // }

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

                    if (data[i].Key == 'Recog24Hours') {
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

    getPassagesData: function getPassagesData(login, password, ip, timestampStart, timestampEnd, res) {

        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        var data = JSON.parse(b);


        // var data = JSON.parse(body);

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
                let s = '{"violations":' + data[i].Value + '}';
                res.send(s);
            }
        }

        // function callback(error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         console.log(body);
        //
        //         //var values = body;
        //         var violations_count;
        //
        //         //just for test
        //         var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        //         var data = JSON.parse(b);
        //
        //
        //         // var data = JSON.parse(body);
        //
        //         var newarr = [];
        //         data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        //         newarr = '{';
        //         for (let i = 0; i < data.length; i++) {
        //             if (i === data.length - 1) {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
        //             } else {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
        //             }
        //
        //             if (data[i].Key == 'Recog24Hours') {
        //                 violations_count = value;
        //                 let s = '{"violations":' + data[i].Value + '}';
        //                 res.send(s);
        //             }
        //         }
        //
        //     } else {
        //         console.error(error);
        //         res.send(error);
        //     }
        // }
        //
        // request(options, callback);

    },

    getIsActiveData: function getIsActiveData(login, password, ip, timestampStart, timestampEnd, res) {

        let s = '{"status":' + "active" + '}';
        res.send(s);

    },

    getFullCamInfoData: function getFullCamInfoData(login, password, ip, timestampStart, timestampEnd, res) {

        var url = 'http://' + ip + ':8080/telemetry.json?usr=' + login + '&pwd=' + password;

        var options = {
            // url: 'http://192.168.73.4:8080/telemetry.json?usr=OrlanUser&pwd=OrlanPassword',
            url: url,
            headers: headers
        };

        var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        var data = JSON.parse(b);


        // var data = JSON.parse(body);

        var newarr = [];
        data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        newarr = '{';
        let s = '{{"status":' + '"active"'  + '},';
        for (let i = 0; i < data.length; i++) {
            if (i === data.length - 1) {
                newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
                if (data[i].Key === 'Recog24Hours') {
                    // violations_count = value;
                    s += '{"'+'passages'+'":' + data[i].Value + '}}';
                }
                if (data[i].Key === 'Recog1Hour') {
                    // violations_count = value;
                    s += '{"'+'violations'+'":' + data[i].Value + '}}';
                }
            } else {
                newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
                if (data[i].Key === 'Recog24Hours') {
                    // violations_count = value;
                    s += '{"'+'passages'+'":' + data[i].Value + '},';
                }
                if (data[i].Key === 'Recog1Hour') {
                    // violations_count = value;
                    s += '{"'+'violations'+'":' + data[i].Value + '},';
                }

            }

        }
        res.send(s);
        // function callback(error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         console.log(body);
        //
        //         //var values = body;
        //         var violations_count;
        //
        //         //just for test
        //         var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        //         var data = JSON.parse(b);
        //
        //
        //         // var data = JSON.parse(body);
        //
        //         var newarr = [];
        //         data.forEach(element => newarr.push('{' + element.Key + ' : ' + element.Value + '}'));
        //         newarr = '{';
        //         for (let i = 0; i < data.length; i++) {
        //             if (i === data.length - 1) {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '}}';
        //             } else {
        //                 newarr += '{' + data[i].Key + ' : ' + data[i].Value + '},';
        //             }
        //
        //             if (data[i].Key == 'Recog24Hours') {
        //                 violations_count = value;
        //                 let s = '{"violations":' + data[i].Value + '}';
        //                 res.send(s);
        //             }
        //         }
        //
        //     } else {
        //         console.error(error);
        //         res.send(error);
        //     }
        // }
        //
        // request(options, callback);

    },

    getFullApiInfo: function getFullApiInfo(login, password, ip, timestampStart, timestampEnd, res) {

        var b = '[{"Key":"UptimeSeconds","Value":"11240,546"},{"Key":"RadarInUse","Value":"true"},{"Key":"RadarFound","Value":"true"},{"Key":"RadarOk","Value":"true"},{"Key":"Temperature","Value":"22"},{"Key":"Voltage","Value":"14,1"},{"Key":"Recog24Hours","Value":"559"},{"Key":"Recog1Hour","Value":"32"}]';
        var data = JSON.parse(b);
        res.send(data);

    }

};