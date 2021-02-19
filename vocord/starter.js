global.atob = require("atob");
var rsa = require("node-bignumber");
var btoa = require('btoa');
console.log("Hello World");

var s = '{"Modulus":"qNRcqO0ZZqQ5T15KebLWTBu0SSwWaXbKREFBJqlal+J/pTiDBcs4Kr4oN83KQpnr9BUUrMS/0GlLAtmMV728AIVSaOFUC0kKi9WurerfBdZ7nuOzfABAA/9mEwMQIwInf9BpbyCtnVaquCHvZPLuIZwBO0RqLIFZxJzmDrnGVS8=","Exponent":"AQAB"}';
var dataString = 'grant_type=password&username=admin&password=SeF%2Fex71FshzlW1%2BE9Tu4f0tR2FIe1NgBlNWKc2eakSs2FHRcAvlQHWtAQAq5nwYhlL%2BqsAbuXs0tKLCEzA8zC5B7jG%2Fc9kKiOJcW3fX8DBwtfNpR41l80Ujj1rMN5i8e86v0ylowqpSPaBSA82B8zdEZvSm0QNbWGB3XICYDgM%3D';

var pk = JSON.parse(s);
var modulusHex = base64ToHex(pk.Modulus);
var exponentHex = base64ToHex(pk.Exponent);
// var rsa = new RSAKey();
// rsa.setPublic(modulusHex, exponentHex);

var rsa = new rsa.Key();
rsa.setPublic(modulusHex, exponentHex);

var answer;
var input = "OrlanPassword";
if (Array.isArray(input)) {
    answer = input.map(function(x) { return encryptImpl(rsa, x); });
} else {
    answer = encryptImpl(rsa, input);
}

console.log(encodeURIComponent(answer));

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