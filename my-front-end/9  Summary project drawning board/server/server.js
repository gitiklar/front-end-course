const express = require('express');
const bodyParser = require('body-parser')
const crypto = require('crypto');
const _ = require('lodash');
const app = express();

const tokensAndDataPerPaintingName = {};
const sockets = {};

function removeTokenIfAlredyExistInOneOfThePainting(tokenOfCurrentPage) {
    for(let paintingName of Object.keys(tokensAndDataPerPaintingName)) {
        tokensAndDataPerPaintingName[paintingName].tokens = tokensAndDataPerPaintingName[paintingName].tokens.filter(token=>token!==tokenOfCurrentPage);
    }
}

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

app.get('/token' , function(req , res) {
    crypto.randomBytes(48, function(err, buf) {
        const token = buf.toString('hex');
        res.send({ token: token });
    });
});

app.post('/shareMyPainting' , function(req, res) {
    const tokenOfCurrentPage = req.headers.token;
    const paintingName = req.body.paintingName;
    tokensAndDataPerPaintingName[paintingName] = {};
    tokensAndDataPerPaintingName[paintingName].tokens = [];
    tokensAndDataPerPaintingName[paintingName].tokens.push(tokenOfCurrentPage);
    tokensAndDataPerPaintingName[paintingName].data = '';
    res.send('OK');
});

app.post('/removeMyTokenIfExist' , function(req , res) {
    const tokenOfCurrentPage = req.headers.token;
    removeTokenIfAlredyExistInOneOfThePainting(tokenOfCurrentPage);
    res.send('OK');
});

app.get('/sharesPaintingNames' , function(req, res) {
    res.send(Object.keys(tokensAndDataPerPaintingName));
});

app.post('/joinToASharedPainting' , function(req , res) {
    const tokenOfCurrentPage = req.headers.token;
    const paintingName = req.body.paintingName;
    tokensAndDataPerPaintingName[paintingName].tokens.push(tokenOfCurrentPage);
    res.send('OK');
});

app.post('/loadDataOfRequestedPainting' , function(req , res) {
    const paintingName = req.body.paintingName;
    res.send(tokensAndDataPerPaintingName[paintingName]);
});

const http = require('http').createServer(app);
const socketioOptions = {
  cors: {
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "POST"]
  }
};
const io = require('socket.io')(http, socketioOptions);
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('subscribe', function(token) {
        sockets[token] = socket;
    });
    socket.on('updateMySharedPaintingData', function(paintingName , data , myToken) {
        tokensAndDataPerPaintingName[paintingName].data = data;
        for(let token of tokensAndDataPerPaintingName[paintingName].tokens) {
            if(token === myToken) continue;
            sockets[token].emit('yourJoiningPaintingUpdated' , data);
        }
    });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, function() {
    console.log(`listen to PORT: ${PORT}`);
});