const express = require('express');
const socketIO = require('socket.io');
const fetch = require("node-fetch");

const app = express();

const PORT = process.env.PORT || 3000;

function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== undefined) {
        return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
}
app.use(requireHTTPS)

app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log('Server Started...');
})

const io = socketIO(server);

const decode = require('audio-decode');
const buffer = require('audio-lena/mp3');

//as a callback
decode(buffer, (err, audioBuffer) => {});

//as a promise
decode(buffer).then(audioBuffer => {}, err => {});

io.on('connection', socket => {
    
})

function filterData(audioBuffer) {
    const rawData = audioBuffer.getChannelData(0);
    console.log(rawData);
    console.log('ok');
    const samples = 100;
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart+j]);
        }
        filteredData.push(sum / blockSize);
    }
    return filteredData;
}

function normalizeData(filteredData) {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n*multiplier);
}