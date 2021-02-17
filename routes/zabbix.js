var express = require('express');
var router = express.Router();

var http = require('http');
const jsonParser = express.json();

var login = "admin";
var password = "Fk5bu8jG";
var job = "getStats";
var timestampStart = 1612818000;
var timestampEnd = 1612891239;
var ip = '192.168.72.11';
var deviceType = 'kordon';

// 192.168.40.26	Вокорд	admin	123456


/* GET users listing. */
/*router.post('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //res.set("Content-Type", "application/json");

    var start_time = req.param('start_time');
    var end_time = req.param('end_time');
    var login = req.param('login');
    var password=  req.param('password');
    var ip =  req.param('ip');

    console.log("ip: "+ip);
    console.log("login: "+login);
    console.log("password: "+password);
    console.log("start_time: "+start_time);
    console.log("end_time: "+end_time);

    res.send(getFakeJson());

});*/

router.post("/", jsonParser, function (req, res) {

    var st = req.param('start_time');
    var et = req.param('end_time');
    var lg = req.param('login');
    var ps = req.param('password');
    var i = req.param('ip');

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

    // var ZabbixAgentClient = require("zabbix-agent-client"),
    //     client            = new ZabbixAgentClient(10050, "192.168.40.26"),
    //     item              = "system.cpu.util",
    //     params            = ["VTObjectBusSrv", "VTTrafficBPM",
    //         "VTLPRService", "VTLPRWatchDog"];
    //
    // if(ip === "one"){
    //
    //     ZabbixAgentClient = require("zabbix-agent-client"),
    //         client            = new ZabbixAgentClient(10050, "192.168.40.26"),
    //         item              = "VTObjectBusSrv",
    //         params            = [""];
    //
    // }
    //
    // client.getItemWithParams(item, params, function(error, result) {
    //     if (error) {
    //         console.log("Got error", error);
    //     }
    //
    //     console.log("Result: " + result);
    // });

    ask(res);
    //res.send("Hi there");


    var answ = '';
    // try {
    //     var httpreq = http.request(options, function (response) {
    //         //response.setEncoding('utf8');
    //         response.on('data', function (chunk) {
    //             //console.log(chunk);
    //             answ += chunk;
    //         }).on('end', function () {
    //             var str = JSON.parse(answ);
    //
    //             let s = '{"violations":' + JSON.stringify(str['getStats']['violation']['total']) + '}';
    //             console.log(s);
    //             res.send(s);
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


async function ask(res) {
//     try {
//
//         const {ZabbixClient} = require("zabbix-client");
//
//         const client = new ZabbixClient("http://company.com/zabbix/api_jsonrpc.php");
//
//         const api = await client.login("theusername", "thepassword");
// // To enable relogin: client.login("theusername", "thepassword", true);
//
//         const allHosts = await api.method("host.get").call();
//
// // The version info needs an unauthenticated user, you
// // can disable the token sending using the second parameters
// // like the following
//         const version = await api.method("apiinfo.version").call({}, false);
//
//         console.log(version); // 4.0.0
//     } catch (e){
//         console.log(e);
//     }
//     //res.send(version);

    const Zabbix = require('zabbix-promise');

    const zabbix = new Zabbix({
        url: '192.168.72.11:80/',
        user: 'admin',
        password: '123456'
    });

    const main = async () => {
        try {
            await zabbix.login();
            const host = await zabbix.request('host.get', {
                selectInterfaces: 'extend',
                limit: 1
            });
            //console.log(JSON.stringify(host, null, 2));
            console.log(host);
            zabbix.logout()
        } catch (error) {
            console.error(error)
        }
    };
    main();


}

module.exports = router;