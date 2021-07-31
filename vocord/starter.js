// global.atob = require("atob");
var http = require('http');
var express = require('express');
var app = express();

const PORT = 4000;

let target = 'http://direct.fipradio.fr/live/fip-midfi.mp3';
// figure out 'real' target if the server returns a 302 (redirect)
http.get(target, resp => {
    if(resp.statusCode == 302) {
        target = resp.headers.location;
    }
});

app.use(express.static('dist'));

app.get('/api', (req, res) => {
    req.pipe(request.get(target)).pipe(res);
});

app.listen(PORT);

// var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
// var express = require('express');
// var app = express();
//
// app.get('/index1.jpg', new MjpegProxy('http://admin:admin@192.168.1.109/cgi/mjpg/mjpg.cgi').proxyRequest);
// app.listen(8080);

// var rsa = require("node-bignumber");
// var btoa = require('btoa');
// var request = require('request');
// var jQuery = require('jQuery');
// var textVersion = require("textversionjs");
// const jsdom = require('JSDOM');
// const JSDOM = jsdom;
// console.log("Hello World");


// let pas = randomInt(2000,12000);
// let vil = randomInt(0,10);
// // let s = {status:"active", passages:"''+randomInt(2000,12000)+''", violations:""+randomInt(0,10)};
// let s = {status:"active", passages:pas+'', violations:+vil+''};
// s = JSON.stringify(s);
// let s2 = {status:"active", passages:"12345", violations:"34"};
// console.log(s);
// console.log(s2);
// dostuff();

// var d = Date.now();
// var timestampStart = '1616360400000';
// var timestampEnd = 1616705688017;
// var str = '{ "name": "John Doe", "age": 42 }';
// var body ='{"UptimeSeconds": "1837582,187", "RadarInUse": "true", "RadarFound": "true", "RadarOk": "true", "Temperature": "44", "Voltage": "11,5", "Recog24Hours": "1364", "Recog1Hour": "51", "Viols24Hours": "2", "Viols1Hour": "0", "TotalRecog24Hours": "1366", "TotalRecog1Hour": "51"}';

// var body = {
//     "UptimeSeconds": "1847596,343",
//     "RadarInUse": "true",
//     "RadarFound": "true",
//     "RadarOk": "true",
//     "Temperature": "39",
//     "Voltage": "12,975",
//     "Recog24Hours": "1322",
//     "Recog1Hour": "13",
//     "Viols24Hours": "2",
//     "Viols1Hour": "0",
//     "TotalRecog24Hours": "1324",
//     "TotalRecog1Hour": "13"
// };

// var data = JSON.parse(""+body);
// var data = JSON.parse(""+JSON.stringify(body));
// var data = body;
// console.log(body);
// console.log(data);
// body = JSON.stringify(data);

// body = JSON.parse(body+"");

// console.log(typeof body);

// console.log(JSON.stringify(body));
// var data = JSON.parse(JSON.stringify(body.toString()));
// var data = body;
//
// let v = data.Voltage;
// v = v.replace(',', '.');
// let pingMS2 = Date.now();
// let pingMS1 = Date.now();
// let stat = 'active';
// let d = {
//     violations: data.Viols1Hour,
//     passages: data.Recog1Hour,
//     status: stat,
//     ping: (pingMS2 - pingMS1),
//     voltage: v
// };
//
// // console.log(data);
// // console.log("Data UptimeSeconds: "+data.UptimeSeconds);
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
// //"FromDate":"2021-02-17T00:00:00.000Z"
// // console.log(startDate);
// // console.log(endDate);
// // console.log(1612991239);
// // console.log('2021-02-17T00:00:00.000Z');
// // console.log(formatDate(d)+'T00:00:00.000Z');
// // console.log(new Date(d).toISOString());
// // console.log(new Date(1616705688017).toISOString());
//
// var startDate = new Date(parseInt(timestampStart)).toISOString();
// var endDate = new Date(timestampEnd).toISOString();
//
// console.log('Start date: '+startDate);
// console.log('End date: '+endDate);
//
//
// function objectValues(obj) {
//     let vals = [];
//     for (const prop in obj) {
//         vals.push(obj[prop]);
//     }
//     return vals;
// }
// //"FromDate":"2021-02-17T00:00:00.000Z"
// function formatDate(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();
//
//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;
//
//     return [year, month, day].join('-');
// }
// // function dostuff(){
// //
// //     var request = require('request');
// //
// //     var headers = {
// //         'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0',
// //         'Accept': 'application/json, text/javascript, */*; q=0.01',
// //         'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
// //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// //         'X-Requested-With': 'XMLHttpRequest',
// //         'Origin': 'https://meteoinfo.ru',
// //         'DNT': '1',
// //         'Connection': 'keep-alive',
// //         'Referer': 'https://meteoinfo.ru/archive-pogoda',
// //         'Cookie': '66c548aa3ec10b30907b199d946947a3=k6gt0gpal05um1u34035qf42e0; _ym_uid=1615289571874410091; _ym_d=1615289571; _ym_isad=1; _ga=GA1.2.1686620665.1615289575; _gid=GA1.2.531437856.1615289575'
// //     };
// //
// //     var dataString = 'lang=ru-RU&id_city=1709&dt=1615215600&has_db=1&dop=0';
// //
// //     var options = {
// //         url: 'https://meteoinfo.ru/hmc-output/observ/obs_arch.php',
// //         method: 'POST',
// //         headers: headers,
// //         body: dataString
// //     };
// //
// //     function callback(error, response, body) {
// //         if (!error && response.statusCode == 200) {
// //             //console.log(body.replace(/<[^>]*>?/gm, ''));
// //             // console.log(body.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "\n"));
// //             body = body.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "\n");
// //             body = JSON.stringify(body);
// //             body = body.replace('\n\n\n', '\n');
// //             body = body.replace("\n\n\n", "\n");
// //             body = body.replace("\n\n\n", "\n");
// //             body = body.replace("\n\n", "\n");
// //             body = body.replace("\n\n", "\n");
// //             console.log(body);
// //         }
// //     }
// //
// //     request(options, callback);
// // }
//
// // function stripHtml(html)
// // {
// //     let tmp = document.createElement("DIV");
// //     tmp.innerHTML = html;
// //     return tmp.textContent || tmp.innerText || "";
// // }
// // function strip(html){
// //     let doc = new DOMParser().parseFromString(html, 'text/html');
// //     return doc.body.textContent || "";
// // }
//
//
// // var s = '{"Modulus":"qNRcqO0ZZqQ5T15KebLWTBu0SSwWaXbKREFBJqlal+J/pTiDBcs4Kr4oN83KQpnr9BUUrMS/0GlLAtmMV728AIVSaOFUC0kKi9WurerfBdZ7nuOzfABAA/9mEwMQIwInf9BpbyCtnVaquCHvZPLuIZwBO0RqLIFZxJzmDrnGVS8=","Exponent":"AQAB"}';
// // var dataString = 'grant_type=password&username=admin&password=SeF%2Fex71FshzlW1%2BE9Tu4f0tR2FIe1NgBlNWKc2eakSs2FHRcAvlQHWtAQAq5nwYhlL%2BqsAbuXs0tKLCEzA8zC5B7jG%2Fc9kKiOJcW3fX8DBwtfNpR41l80Ujj1rMN5i8e86v0ylowqpSPaBSA82B8zdEZvSm0QNbWGB3XICYDgM%3D';
// //
// // var pk = JSON.parse(s);
// // var modulusHex = base64ToHex(pk.Modulus);
// // var exponentHex = base64ToHex(pk.Exponent);
// // // var rsa = new RSAKey();
// // // rsa.setPublic(modulusHex, exponentHex);
// //
// // var rsa = new rsa.Key();
// // rsa.setPublic(modulusHex, exponentHex);
// //
// // var answer;
// // var input = "OrlanPassword";
// // if (Array.isArray(input)) {
// //     answer = input.map(function(x) { return encryptImpl(rsa, x); });
// // } else {
// //     answer = encryptImpl(rsa, input);
// // }
//
// // console.log(encodeURIComponent(answer));
// // var token_data = '{"access_token":"es0vrQSHxPv9ANnM7Uokj_ya9qmp9KI-qDGsBseowlDTYy4vScPbDYcLeJRkhJ3bCwM_OLhqFCl2-RQLhnTsrv19ViT9gjdmx1PKLtO0kcMH7DAmlO0yqSU-HtUGrhGghhCw6JDXSekP9ZqlrIVhuH9G9-IEAbjCqqbVLYxjwWuubZ3Qzcv3haT3JvkGTMydCkBKPVlz0kZhlQ_SMnPd1KzW__5gyGIcUJ5uOWXOUjY","token_type":"bearer","expires_in":86399}';
// //
// // var data = JSON.parse(token_data);
// // console.log(data.access_token);
// //
// // function base64ToHex(str) {
// //     for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
// //         var tmp = bin.charCodeAt(i).toString(16);
// //         if (tmp.length === 1) tmp = "0" + tmp;
// //         hex[hex.length] = tmp;
// //     }
// //     return hex.join("");
// // }
// //
// // function encryptImpl(rsa, input) {
// //     var encryptedPassword = rsa.encrypt(input);
// //     var b64EncryptedPassword = hexToBase64(encryptedPassword);
// //     return b64EncryptedPassword;
// // }
// //
// // function hexToBase64(str) {
// //     return btoa(String.fromCharCode.apply(null,
// //         str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
// //     );
// // }
//
// function randomInt(low, high) {
//     return Math.floor(Math.random() * (high - low) + low)
// }