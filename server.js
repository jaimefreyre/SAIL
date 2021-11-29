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
const LOGIN_URL_API_1 = "https://sail.artificialintelligencelead.com/api/auth/login/";
// Proxy endpoints
app.use('/loginexterno', createProxyMiddleware({
    target: LOGIN_URL_API_1,
    changeOrigin: true,
    pathRewrite: {
        [`^/loginexterno`]: '',
    },
}));

//Constante URL
const LOGIN_URL_API_2 = "https://sail.artificialintelligencelead.com/api/user/current_user/";
// Proxy endpoints
app.use('/current_user_A1', createProxyMiddleware({
    target: LOGIN_URL_API_2,
    changeOrigin: true,
    pathRewrite: {
        [`^/current_user_A1`]: '',
    },
}));

//Constante URL Detalle de todos los Leads NO ATENDIDOS: status=new
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?status=new&ordering=created&page=1&page_size=10&with_concession=true";
const LOGIN_URL_API_3 = "https://sail.artificialintelligencelead.com/api/lead_col/?status=new&ordering=created&with_concession=true";
// Proxy endpoints
app.use('/leads_no_atendidos', createProxyMiddleware({
    target: LOGIN_URL_API_3,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_no_atendidos`]: '',
    },
}));

//Constante URL Detalle de todos los Leads ATENDIDOS POR COMERCIAL: status=attended
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?status=attended&ordering=created&page=1&page_size=10&with_concession=true";
const LOGIN_URL_API_4 = "https://sail.artificialintelligencelead.com/api/lead_col/?status=attended&ordering=created&with_concession=true";
// Proxy endpoints
app.use('/leads_atendidos_comercial', createProxyMiddleware({
    target: LOGIN_URL_API_4,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_atendidos_comercial`]: '',
    },
}));

//Constante URL Detalle de todos los Leads MANEJO COMERCIAL : status=commercial_management
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?status=commercial_management&ordering=lead_task_date&page=1&page_size=10&with_concession=true";
const LOGIN_URL_API_5 = "https://sail.artificialintelligencelead.com/api/lead_col/?status=commercial_management&ordering=lead_task_date&with_concession=true";
// Proxy endpoints
app.use('/leads_managment', createProxyMiddleware({
    target: LOGIN_URL_API_5,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_managment`]: '',
    },
}));

//Constante URL Detalle de todos los Leads MANEJO SEGUIMIENTO:  : status=tracing
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10&with_concession=true";
const LOGIN_URL_API_6 = "https://sail.artificialintelligencelead.com/api/lead_col/?status=tracing&ordering=lead_task_date&with_concession=true";
// Proxy endpoints
app.use('/leads_traicing', createProxyMiddleware({
    target: LOGIN_URL_API_6,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_traicing`]: '',
    },
}));

//Constante URL Detalle de todos los Leads TAREA PENDIENTES : status=tracing
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&with_concession=true";
const LOGIN_URL_API_7 = "https://sail.artificialintelligencelead.com/api/lead_col/?ordering=lead_task_date&status=tracing&with_concession=true";
// Proxy endpoints
app.use('/leads_pendientes', createProxyMiddleware({
    target: LOGIN_URL_API_7,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_pendientes`]: '',
    },
}));

//Constante URL Detalle de todos los Leads Cerrados : status=end
// const LOGIN_URL_API = "https://sail.artificialintelligencelead.com/api/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&with_concession=true";
const LOGIN_URL_API_8 = "https://sail.artificialintelligencelead.com/api/lead_col/?&status=end&with_concession=true";
// Proxy endpoints
app.use('/leads_cerrados', createProxyMiddleware({
    target: LOGIN_URL_API_8,
    changeOrigin: true,
    pathRewrite: {
        [`^/leads_cerrados`]: '',
    },
}));



app.use(express.static(__dirname + '/dist/Sail/assets'));
app.use(express.static(__dirname + '/dist/Sail/'));

app.get('/info22', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Sail/index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Sail/index.html'));
});

app.listen(process.env.PORT || 8080);