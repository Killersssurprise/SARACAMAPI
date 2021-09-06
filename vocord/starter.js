const express = require('express');
const app = express();
var db = require('../database/db');

const {proxy, scriptUrl} = require('rtsp-relay')(app);
// "rtsp://admin:C6CDd76z@192.168.72.10:554
// const handler = proxy({
//     // url: `rtsp://admin:admin@10.0.1.2:554/feed`,
//     url: `rtsp://admin:8aHrgDKW@192.168.72.9:554`,
//     // if your RTSP stream need credentials, include them in the URL as above
//     verbose: false,
// });

// the endpoint our RTSP uses
// app.ws('/api/stream', handler);


// this is an example html page to view the stream
app.get('/', (req, res) => {


        var id = req.query.id;

        var ip;
        var password;
        var login;

        var logdata;
        if (id !== undefined && id !== null) {

            // logdata = db.getLoginData(id);


            var connection = db.getConnection();

            connection.query(
                // 'SELECT * FROM `devices` ;',
                'SELECT * FROM `devices` where `id` = \''+id+'\' ;',
                function (err, results, fields) {
                    // console.log(results); // results contains rows returned by server
                    // console.log(results[0].ip); // results contains rows returned by server
                    // console.log(results[0].login); // results contains rows returned by server
                    // console.log(results[0].password); // results contains rows returned by server
                    // console.log(results[0].device_type_id); // results contains rows returned by server

                    var id = results[0].id;
                    var ip = results[0].ip;
                    var login = results[0].login;
                    var password = results[0].password;
                    var device_type_id = results[0].device_type_id;

                    // console.log(fields); // fields contains extra meta data about results, if available
                    // console.log("IP: "+results.ip +", Login: "+results.login+", Password: "+results.password+", Device type id: "+results.device_type_id);
                    // console.log("ID:"+id+", IP: "+ip +", Login: "+login+", Password: "+password+", Device type id: "+device_type_id);


                    ///////
                    if (typeof ip !== 'undefined' && ip !== null
                        && typeof password !== 'undefined' && password !== null
                        && typeof login !== 'undefined' && login !== null) {

                    } else {
                        res.send("Wrong get parameter [ip or password or login]");
                    }

                    // additionalFlags: ['-s','320x180', '-loglevel','error']
                    const handler = proxy({
                        // url: `rtsp://admin:admin@10.0.1.2:554/feed`,
                        // url: `rtsp://admin:8aHrgDKW@192.168.72.9:554`,
                        url: 'rtsp://' + login + ':' + password + '@' + ip + ':554',
                        // if your RTSP stream need credentials, include them in the URL as above
                        // additionalFlags: ['-s','320x180', '-loglevel','error'],

                        verbose: false,
                    });

                    var pathh = '/api/stream' + ip;

                    app.ws(pathh, handler);

                    res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host +'${pathh}',
      canvas: document.getElementById('canvas')
    });
  </script>
`)

                }
            );

        } else {
            ip = req.query.ip;
            password = req.query.password;
            login = req.query.login;
        }


        //////
    }
);

app.listen(3001);

console.log('Running on 0.0.0.0:3001');

// Stream = require('node-rtsp-stream');
//
// stream = new Stream({
//     name: 'name',
//     streamUrl: 'rtsp://admin:C6CDd76z@192.168.72.10:554',
//     wsPort: 9999,
//     ffmpegOptions: { // options ffmpeg flags
//         '-stats': '', // an option with no neccessary value uses a blank string
//         '-r': 30 // options with required values specify the value after the key
//     }
// });

