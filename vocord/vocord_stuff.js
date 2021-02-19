const https = require('https');
const http = require('http');

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function encryptPassword(input) {
    return $http.get(serviceBase + "/api/getPublicKey")
        .then(function (response) {
            var pk = response.data;
            var modulusHex = base64ToHex(pk.Modulus);
            var exponentHex = base64ToHex(pk.Exponent);

            var rsa = new RSAKey();
            rsa.setPublic(modulusHex, exponentHex);

            if (Array.isArray(input)) {
                return input.map(function(x) { return encryptImpl(rsa, x); });
            } else {
                return encryptImpl(rsa, input);
            }
        });
}

function encryptImpl(rsa, input) {
    var encryptedPassword = rsa.encrypt(input);
    var b64EncryptedPassword = hexToBase64(encryptedPassword);
    return b64EncryptedPassword;
}

function copyUserModel(userModel) {
    return {
        Id: userModel.Id,
        UserName: userModel.UserName,
        Password: userModel.Password,
        ConfirmPassword: userModel.ConfirmPassword,
        Roles: userModel.Roles
    };
}

var serviceBase = '/MonoblockService/';
var authServiceFactory = {};

var _authentication = {
    isAuth: false,
    userName: ""
};

var _saveRegistration = function (registration) {
    return encryptPassword([registration.Password, registration.ConfirmPassword])
        .then(function (arr) {
            registration = copyUserModel(registration);
            registration.Password = arr[0];
            registration.ConfirmPassword = arr[1];
            return $http.post(baseUrl + '/account/register', registration);
        });
};

var _updateRegistration = function(registration) {
    return encryptPassword([registration.Password, registration.ConfirmPassword])
        .then(function (arr) {
            registration = copyUserModel(registration);
            registration.Password = arr[0];
            registration.ConfirmPassword = arr[1];
            return $http.post(baseUrl + '/account/update', registration);
        });
};

var _login = function (loginData) {
    //var deferred = $q.defer();
    encryptPassword(loginData.password)
        .then(function(encryptedPassword) {
            var data = "grant_type=password&username=" +
                loginData.userName +
                "&password=" +
                encodeURIComponent(encryptedPassword);

            return $http.post(serviceBase + 'token',
                data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        })
        .then(function(response) {
            localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            //deferred.resolve(response.data);
        })
        .catch(function (err) {
            _logOut();
            //deferred.reject(err.data);
        });
    return deferred.promise;
};

var _logOut = function() {

    localStorageService.remove('authorizationData');

    _authentication.isAuth = false;
    _authentication.userName = "";

    permissionService.authMethod().then(function (res) {

    });
};

var _fillAuthData = function() {

    var authData = localStorageService.get('authorizationData');
    if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;
    }

};