var http = require('http');
var job = "getStats";
var rs = require("node-bignumber");
var atob = require("atob");
var btoa = require('btoa');
// const {request} = require("http");
var request = require('request-promise');
module.exports = {

    getViolationsData: function getViolationsData(login, password, ip, port, timestampStart, timestampEnd, res) {

        getAccessToken(login, password, ip, timestampStart, timestampEnd, res, getViolations);

    },

    getPassagesData: function getPassagesData(login, password, ip, port, timestampStart, timestampEnd, res) {

        getAccessToken(login, password, ip, timestampStart, timestampEnd, res, getPassages);

    },

    getIsActiveData: function getIsActiveData(login, password, ip, port, timestampStart, timestampEnd, res) {

        getAccessToken(login, password, ip, timestampStart, timestampEnd, res, getIsActive);
    },

    getFullCamInfoData: function getFullCamInfoData(login, password, ip, port, timestampStart, timestampEnd, res) {

        //TODO
        // let s = {status:"active", passages:"12345", violations:"34"};
        // let s = {"violations":"2","passages":"0","status":"active"};

        console.log('Start: '+timestampStart);
        console.log('End: '+timestampEnd);

        var startDate = new Date(parseInt(timestampStart)).toISOString();
        var endDate = new Date(parseInt(timestampEnd)).toISOString();


        // console.log('Start date: '+startDate);
        // console.log('End date: '+endDate);

        // getAccessToken(login, password, ip, timestampStart, timestampEnd, res, getIsActive);

        let pas = randomInt(2000,12000);
        let vil = randomInt(0,10);
// let s = {status:"active", passages:"''+randomInt(2000,12000)+''", violations:""+randomInt(0,10)};
        let s = {status:"active", passages:pas+'', violations:+vil+''};
        s = JSON.stringify(s);


        dummyFunction(login,password,ip,timestampStart,timestampEnd);
        //res.send(s);

    },

    getFullApiInfo: function getFullApiInfo(login, password, ip, port, timestampStart, timestampEnd, res) {

        getAccessToken(login, password, ip, timestampStart, timestampEnd, res, getFullInfo);

    }

};

function doLogin(login, password, ip) {
    var headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://192.168.40.26',
        'Referer': 'http://192.168.40.26/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var dataString = 'grant_type=password&username=admin&password=SeF%2Fex71FshzlW1%2BE9Tu4f0tR2FIe1NgBlNWKc2eakSs2FHRcAvlQHWtAQAq5nwYhlL%2BqsAbuXs0tKLCEzA8zC5B7jG%2Fc9kKiOJcW3fX8DBwtfNpR41l80Ujj1rMN5i8e86v0ylowqpSPaBSA82B8zdEZvSm0QNbWGB3XICYDgM%3D';

    var options = {
        url: 'http://192.168.40.26/MonoblockService/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    request(options, callback);
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

function encryptImpl(rsa, input) {
    var encryptedPassword = rsa.encrypt(input);
    var b64EncryptedPassword = hexToBase64(encryptedPassword);
    return b64EncryptedPassword;
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function makeLoginRequest(res, passwordCoded, ip, login, timestampStart, timestampEnd,f) {

    var headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://' + ip,
        'Referer': 'http://' + ip + '/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var dataString = 'grant_type=password&username=' + login + '&password=' + encodeURIComponent(passwordCoded);

    var options = {
        url: 'http://' + ip + '/MonoblockService/token',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var data = JSON.parse(body);
            console.log(data.access_token);
            // res.send(body+', response: '+response);
            f(res, ip, data.access_token,timestampStart, timestampEnd);

            return data.access_token;
        } else {
            console.log(error);
            //res.send(error);
            return error;
        }
    }

    request(options, callback);
}

function getAccessToken(login, password, ip, timestampStart, timestampEnd, res, f) {

    var headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Accept': 'application/json, text/plain, */*',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
        'Referer': 'http://' + ip + '/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var options = {
        url: 'http://' + ip + '/MonoblockService//api/getPublicKey',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body);

            var pk = JSON.parse(body);
            var modulusHex = base64ToHex(pk.Modulus);
            var exponentHex = base64ToHex(pk.Exponent);

            var rsa = new rs.Key();
            rsa.setPublic(modulusHex, exponentHex);

            var answer;
            var input = password;
            if (Array.isArray(input)) {
                answer = input.map(function (x) {
                    return encryptImpl(rsa, x);
                });
            } else {
                answer = encryptImpl(rsa, input);
            }

            return makeLoginRequest(res, answer, ip, login, timestampStart, timestampEnd,f);

        } else {
            //console.error(body);
            //res.send(body);
            return error;
        }
    }

    request(options, callback);
}

function dummyFunction(login, password, ip, timestampStart, timestampEnd, res){

    var answer = '';
    var accessToken = '';
    var passages;
    var violations;
    var ping;

    var headers1 = {
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Accept': 'application/json, text/plain, */*',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
        'Referer': 'http://' + ip + '/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var options1 = {
        url: 'http://' + ip + '/MonoblockService//api/getPublicKey',
        headers: headers1
    };

    function callback1(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body);

            var pk = JSON.parse(body);
            var modulusHex = base64ToHex(pk.Modulus);
            var exponentHex = base64ToHex(pk.Exponent);

            var rsa = new rs.Key();
            rsa.setPublic(modulusHex, exponentHex);

            var input = password;
            if (Array.isArray(input)) {
                answer = input.map(function (x) {
                    return encryptImpl(rsa, x);
                });
            } else {
                answer = encryptImpl(rsa, input);
            }

            //return makeLoginRequest(res, answer, ip, login, timestampStart, timestampEnd,f);

        } else {
            //console.error(body);
            //res.send(body);
            return error;
        }
    }



    request(options1, callback1).then(function(body) {
        console.log("\n");
        console.log("login OK: " + body);


        var headers2 = {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'http://' + ip,
            'Referer': 'http://' + ip + '/',
            'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
        };

        var dataString = 'grant_type=password&username=' + login + '&password=' + encodeURIComponent(answer);

        var options2 = {
            url: 'http://' + ip + '/MonoblockService/token',
            method: 'POST',
            headers: headers2,
            body: dataString
        };

        function callback2(error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                var data = JSON.parse(body);
                accessToken = data.access_token;
                console.log(data.access_token);
                //res.send(accessToken);
                // res.send(body+', response: '+response);
                //f(res, ip, data.access_token,timestampStart, timestampEnd);

                return data.access_token;
            } else {
                console.log(error);
                //res.send(error);
                return error;
            }
        }

        request(options2, callback2).then(function(body) {
            console.log("\n");
            console.log("access token OK: " + body);


            var headers3 = {
                'Connection': 'keep-alive',
                'Accept': 'application/json, text/plain, */*',
                'Authorization': 'Bearer '+accessToken,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                'Content-Type': 'application/json;charset=UTF-8',
                'Origin': 'http://'+ip,
                'Referer': 'http://'+ip+'/',
                'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
            };

            var dataString3 = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":0,"FromDate":"'+timestampStart+'","ToDate":"'+timestampEnd+'"}';
            // var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":0,"FromDate":"2021-02-17T00:00:00.000Z","ToDate":"2021-02-17T16:47:01.000Z"}';

            var options3 = {
                url: 'http://'+ip+'/MonoblockService/api/car/PostCar',
                method: 'POST',
                headers: headers3,
                body: dataString3
            };

            function callback3(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // Получает из ответа общее кол-во проездов
                    let s = '{"passages":' + JSON.stringify(JSON.parse(body).TotalItems) + '}';
                    passages = JSON.stringify(JSON.parse(body).TotalItems);
                    console.log(s);
                    //res.send(s);
                }
            }

            request(options3, callback3).then(function(body) {
                console.log("\n");
                console.log("violations OK: " + body);

                var dt2 = Date.now();

                var headers4 = {
                    'Connection': 'keep-alive',
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer '+accessToken,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Origin': 'http://'+ip,
                    'Referer': 'http://'+ip+'/',
                    'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
                };

                var dataString4 = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":127,"FromDate":"'+timestampStart+'","ToDate":"'+timestampEnd+'"}';


                var options4 = {
                    url: 'http://'+ip+'/MonoblockService/api/car/PostCar',
                    method: 'POST',
                    headers: headers4,
                    body: dataString4
                };

                function callback4(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Получает из ответа общее кол-во нарушений
                        let s = '{"violations":' + JSON.stringify(JSON.parse(body).TotalItems) + '}';
                        violations = JSON.stringify(JSON.parse(body).TotalItems);
                        console.log(s);
                        var dt1 = Date.now();
                        ping = dt1-dt2;
                        let pings = '{"ping":' + ping + '}';
                        console.log(pings);
                        //res.send(s);
                    }
                }

                request(options4, callback4);

            });

        });

    });





}

function getPassages(res, ip, token,  timestampStart, timestampEnd, information){
    var headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': 'Bearer '+token,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'http://'+ip,
        'Referer': 'http://'+ip+'/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":0,"FromDate":"'+timestampStart+'","ToDate":"'+timestampEnd+'"}';
    // var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":0,"FromDate":"2021-02-17T00:00:00.000Z","ToDate":"2021-02-17T16:47:01.000Z"}';

    var options = {
        url: 'http://'+ip+'/MonoblockService/api/car/PostCar',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Получает из ответа общее кол-во проездов
            let s = '{"passages":' + JSON.stringify(JSON.parse(body).TotalItems) + '}';
            console.log(s);
            res.send(s);
        }
    }

    request(options, callback);
}

function getViolations(res, ip, token,  timestampStart, timestampEnd, information){
    var headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': 'Bearer '+token,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'http://'+ip,
        'Referer': 'http://'+ip+'/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":127,"FromDate":"'+timestampStart+'","ToDate":"'+timestampEnd+'"}';


    var options = {
        url: 'http://'+ip+'/MonoblockService/api/car/PostCar',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Получает из ответа общее кол-во нарушений
            let s = '{"violations":' + JSON.stringify(JSON.parse(body).TotalItems) + '}';
            console.log(s);
            res.send(s);
        }
    }

    request(options, callback);
}


function getIsActive(res, ip, token,  timestampStart, timestampEnd){
    var headers = {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': 'Bearer '+token,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'http://'+ip,
        'Referer': 'http://'+ip+'/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var dataString = '{"PageNumber":1,"OrderBy":"[CheckTime]","IsOrderDesc":true,"DetectedGrn":"","ItemsPerPage":15,"FromSpeed":null,"ToSpeed":null,"alarm":127,"FromDate":"2021-02-17T00:00:00.000Z","ToDate":"2021-02-17T16:47:01.000Z"}';

    var options = {
        url: 'http://'+ip+'/MonoblockService/api/car/PostCar',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Получает из ответа общее кол-во нарушений
            let s = '{"status":' + "active" + '}';
            console.log(s);
            res.send(s);
        }else{
            let s = '{"status":' + "inactive" + '}';
            res.send(s);
        }
    }

    request(options, callback);
}

function getFullInfo(res, ip, token,  timestampStart, timestampEnd){
    var headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': 'Bearer '+token,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'Referer': 'http://'+ip+'/',
        'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8'
    };

    var options = {
        url: 'http://'+ip+'/MonoblockService/api/deviceState/getDeviceState',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Получает из ответа активна ли камера
            // let s = '{"Active":' + JSON.stringify(JSON.parse(body).CamerasDto[0]["DbCamera"]["IsVisible"]) + '}';
            console.log(JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }

    request(options, callback);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}