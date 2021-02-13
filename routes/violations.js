var express = require('express');
var router = express.Router();

const fs = require("fs");
var querystring = require('querystring');
var http = require('http');
const app = express();
const jsonParser = express.json();

var login = "admin";
var password="Fk5bu8jG";
var job = "getStats";
var timestampStart=1612818000;
var timestampEnd=1612891239;
var ip='192.168.72.11';

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
    var data = JSON.stringify({ "auth": {
            "login": login,
            "password": password
        },
        "request": {
            "job": job,
            "getStats": {
                "timestampStart": timestampStart,
                "timestampEnd": timestampEnd,
                "speedThresholds": [
                    {
                        "name": "Превышение на 20", "min": 23, "max": 43
                    },
                    {
                        "name": "Превышение на 40",
                        "min": 43, "max": 63
                    },
                    {
                        "name": "Превышение на 60", "min": 63, "max": 83
                    },
                    {
                        "name": "Превышение на 80", "min": 83, "max": 0
                    }
                ],
                "showInfo": true
            }
        }
    });

    var options = {
        host: ip,
        path: '/api11.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }

    };
    var answ='';
    var httpreq = http.request(options, function (response) {
        //response.setEncoding('utf8');
        response.on('data', function (chunk) {
            //console.log(chunk);
            answ+=chunk;
        }).on('end',function(){
            var str=JSON.parse(answ)
             //fs.writeFileSync('192.168.72.11_violations.json',
              //   '{"violations":'+JSON.stringify(str['getStats']['violation']['total'])+'}');

            let s = '{"violations":'+JSON.stringify(str['getStats']['violation']['total'])+'}';
            console.log(s);
            res.send(s);
        });
    });
    httpreq.write(data);
    httpreq.end();

    //res.send(data);
});


function getFakeJson(){

    let json = "{\n" +
        "    \"glossary\": {\n" +
        "        \"title\": \"example glossary\",\n" +
        "\t\t\"GlossDiv\": {\n" +
        "            \"title\": \"S\",\n" +
        "\t\t\t\"GlossList\": {\n" +
        "                \"GlossEntry\": {\n" +
        "                    \"ID\": \"SGML\",\n" +
        "\t\t\t\t\t\"SortAs\": \"SGML\",\n" +
        "\t\t\t\t\t\"GlossTerm\": \"Standard Generalized Markup Language\",\n" +
        "\t\t\t\t\t\"Acronym\": \"SGML\",\n" +
        "\t\t\t\t\t\"Abbrev\": \"ISO 8879:1986\",\n" +
        "\t\t\t\t\t\"GlossDef\": {\n" +
        "                        \"para\": \"A meta-markup language, used to create markup languages such as DocBook.\",\n" +
        "\t\t\t\t\t\t\"GlossSeeAlso\": [\"GML\", \"XML\"]\n" +
        "                    },\n" +
        "\t\t\t\t\t\"GlossSee\": \"markup\"\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}";

    return json;

}

module.exports = router;