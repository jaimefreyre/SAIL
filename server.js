// create an express app
const path = require('path');
const express = require("express");
var serveIndex = require('serve-index');
// var proxy = require('express-http-proxy');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

// app.use('/proxy', proxy('www.google.com'));
// app.use('/loginexterno', proxy('https://sail.artificialintelligencelead.com/api/auth/login/'));
// app.use('/loginexterno', proxy('https://sail.artificialintelligencelead.com/api/auth/login/'));

app.use(express.static(__dirname + "/"))
app.use('/directorio', serveIndex(__dirname + '/'));     

// Add middleware for http proxying 
// const apiProxy = proxy('/api', { target: 'https://sail.artificialintelligencelead.com/' });
// app.use('/api', apiProxy);

// Logging
app.use(morgan('dev'));

//Constante URL
const API_SERVICE_URL = "https://sail.artificialintelligencelead.com/api/auth/login/";

// Proxy endpoints
app.use('/loginexterno', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/loginexterno`]: '',
    },
}));

app.use(express.static(__dirname + '/dist/Sail/assets'));
app.use(express.static(__dirname + '/dist/Sail/'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Sail/index.html'));
});

app.listen(process.env.PORT || 8080);