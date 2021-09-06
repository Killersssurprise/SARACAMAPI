const mysql = require("mysql2");

//ok boy
// const connection = mysql.createConnection({
//     host: "10.10.2.10",
//     port: 3306,
//     user: "dbuser1",
//     database: "remote_monitoring_system",
//     password: "psw!@#"
// });

const connection = mysql.createConnection({
    host: "b2bitrest.beget.tech",
    port: 3306,
    user: "b2bitrest_sdm3",
    database: "b2bitrest_sdm3",
    password: "r&WnEf0X"
});

// const connection = mysql.createConnection({
//     host: "maksciq9.beget.tech",
//     port: 3306,
//     user: "maksciq9_test",
//     database: "maksciq9_test",
//     password: "maksciq9_test123"
// });

// connection.query(
//     'show tables;',
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );
// where ip = `192.168.40.13`
connection.query(
    // 'SELECT * FROM `devices` ;',
    'SELECT * FROM `devices` where `ip` = \'192.168.72.11\' ;',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        // console.log(results[0].ip); // results contains rows returned by server
        // console.log(results[0].login); // results contains rows returned by server
        // console.log(results[0].password); // results contains rows returned by server
        // console.log(results[0].device_type_id); // results contains rows returned by server

        var id  = results[0].id;
        var ip  = results[0].ip;
        var login  = results[0].login;
        var password  = results[0].password;
        var device_type_id  = results[0].device_type_id;

        // console.log(fields); // fields contains extra meta data about results, if available
        // console.log("IP: "+results.ip +", Login: "+results.login+", Password: "+results.password+", Device type id: "+results.device_type_id);
        console.log("ID:"+id+", IP: "+ip +", Login: "+login+", Password: "+password+", Device type id: "+device_type_id);
    }
);

connection.end();
// const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//     host: '192.168.69.16:3306',
//     user:'dbuser',
//     password: '111777mmm',
//     connectionLimit: 5
// });
// pool.getConnection()
//     .then(conn => {
//
//         conn.query("SELECT 1 as val")
//             .then((rows) => {
//                 console.log(rows); //[ {val: 1}, meta: ... ]
//                 //Table must have been created before
//                 // " CREATE TABLE myTable (id int, val varchar(255)) "
//                 // return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//                 console.log(rows); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//                 conn.end();
//             })
//             .then((res) => {
//                 console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//                 conn.end();
//             })
//             .catch(err => {
//                 //handle error
//                 console.log(err);
//                 conn.end();
//             })
//
//     }).catch(err => {
//     //not connected
// });