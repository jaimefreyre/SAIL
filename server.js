// create an express app
const path = require('path');
const express = require("express");
var serveIndex = require('serve-index');
const app = express()

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(express.static(__dirname + "/"))
// app.use('/directorio', serveIndex(__dirname + '/'));     

app.use(express.static(__dirname + '/dist/Sail/assets'));
app.use(express.static(__dirname + '/dist/Sail/'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Sail/index.html'));
});

app.listen(process.env.PORT || 8080);