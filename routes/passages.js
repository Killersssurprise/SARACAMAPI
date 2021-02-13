var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
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

    //magic

    res.send(getFakeJson());

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