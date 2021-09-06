const mysql = require("mysql2");

//ok boy
// const connection = mysql.createConnection({
//     host: "10.10.2.10",
//     port: 3306,
//     user: "dbuser1",
//     database: "remote_monitoring_system",
//     password: "psw!@#"
// });

// const connection = mysql.createConnection({
//     host: "b2bitrest.beget.tech",
//     port: 3306,
//     user: "b2bitrest_sdm3",
//     database: "b2bitrest_sdm3",
//     password: "r&WnEf0X"
// });
//
// connection.query(
//     // 'SELECT * FROM `devices` ;',
//     'SELECT * FROM `devices` where `id` = \'61\' ;',
//     function(err, results, fields) {
//         // console.log(results); // results contains rows returned by server
//         // console.log(results[0].ip); // results contains rows returned by server
//         // console.log(results[0].login); // results contains rows returned by server
//         // console.log(results[0].password); // results contains rows returned by server
//         // console.log(results[0].device_type_id); // results contains rows returned by server
//
//         var ip  = results[0].ip;
//         var login  = results[0].login;
//         var password  = results[0].password;
//         var device_type_id  = results[0].device_type_id;
//
//         // console.log(fields); // fields contains extra meta data about results, if available
//         // console.log("IP: "+results.ip +", Login: "+results.login+", Password: "+results.password+", Device type id: "+results.device_type_id);
//         console.log("IP: "+ip +", Login: "+login+", Password: "+password+", Device type id: "+device_type_id);
//     }
// );
//
// connection.end();
const connection = mysql.createConnection({
    host: "b2bitrest.beget.tech",
    port: 3306,
    user: "b2bitrest_sdm3",
    database: "b2bitrest_sdm3",
    password: "r&WnEf0X"
});

module.exports = {


    // async get_info(id) {
    //     var sql = 'SELECT * FROM `devices` where `id` = ' + id + ';';
    //     const results = await connection.promise().query(sql);
    //
    //     var ip = results[0].ip;
    //     var login = results[0].login;
    //     var password = results[0].password;
    //     var device_type_id = results[0].device_type_id;
    //
    //     // console.log(fields); // fields contains extra meta data about results, if available
    //     // console.log("IP: "+results.ip +", Login: "+results.login+", Password: "+results.password+", Device type id: "+results.device_type_id);
    //     var answer = "IP: " + ip + ", Login: " + login + ", Password: " + password + ", Device type id: " + device_type_id;
    //     console.log(answer);
    //
    //     var ooo = {
    //         ip: ip,
    //         login: login,
    //         password: password,
    //         device_type_id: device_type_id
    //     };
    //
    //     return ooo;
    // },

    async getLoginData(id) {


        connection.query(
            // 'SELECT * FROM `devices` ;',
            'SELECT * FROM `devices` where `id` = ' + id + ';',
            function (err, results, fields) {
                // console.log(results); // results contains rows returned by server
                // console.log(results[0].ip); // results contains rows returned by server
                // console.log(results[0].login); // results contains rows returned by server
                // console.log(results[0].password); // results contains rows returned by server
                // console.log(results[0].device_type_id); // results contains rows returned by server

                var ip = results[0].ip;
                var login = results[0].login;
                var password = results[0].password;
                var device_type_id = results[0].device_type_id;

                // console.log(fields); // fields contains extra meta data about results, if available
                // console.log("IP: "+results.ip +", Login: "+results.login+", Password: "+results.password+", Device type id: "+results.device_type_id);
                var answer = "IP: " + ip + ", Login: " + login + ", Password: " + password + ", Device type id: " + device_type_id;
                // console.log(answer);

                var ooo = {
                    ip: ip,
                    login: login,
                    password: password,
                    device_type_id: device_type_id
                };

                return ooo;
            }
        );

        // connection.end();
    },
    getConnection() {
        return connection;
    }
};