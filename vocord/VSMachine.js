Stream = require('node-rtsp-stream');

stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://admin:8aHrgDKW@192.168.72.9:554',
    wsPort: 3001,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});