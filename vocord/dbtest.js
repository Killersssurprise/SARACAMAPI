const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "192.168.69.16",
    port: 3306,
    user: "dbuser",
    database: "remote_monitoring_system",
    password: "111777mmm"
});

connection.query(
    'show tables;',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

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