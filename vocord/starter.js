const express = require('express');
const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);
// "rtsp://admin:C6CDd76z@192.168.72.10:554
const handler = proxy({
    // url: `rtsp://admin:admin@10.0.1.2:554/feed`,
    url: `rtsp://admin:C6CDd76z@192.168.72.10:554`,
    // if your RTSP stream need credentials, include them in the URL as above
    verbose: false,
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

// this is an example html page to view the stream
app.get('/', (req, res) =>
    res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`),
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

