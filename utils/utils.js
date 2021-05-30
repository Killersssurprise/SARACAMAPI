module.exports = {
    getErrorMessage: function (error, response, body) {
        // whatever
        console.log("Hello from utils!")
        // if (error)
        //     console.log(error);
        // if (response)
        //     console.log(response);
        // if (body)
        //     console.log(body);

        var authErrMsg = '{"authorization":false,"error":"401"}';
        var output = '';


        if ((error && error.toString().includes(authErrMsg)) || (body && body.toString().includes(authErrMsg))) {
            output = 'Ошибка авторизации! Не верный логин или пароль!';
        } else {
            output = error;
        }

        var errData = {
            error: output,
            code: response.statusCode,
        };

        let errAnswer = JSON.stringify(errData);

        return errAnswer;
    },
    bar: function () {
        // whatever
    }
};