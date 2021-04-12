const express = require('express');
const socketIO = require('socket.io');

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

io.on('connection', socket => {
    
})