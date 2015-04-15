/*jslint node: true */
'use strict';


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

var routes = require('./routes');
var model_frecuencia = require('./routes/route_frecuencia');
var model_unidad = require('./routes/route_unidad');
var model_grupo = require('./routes/route_grupo');
var model_producto = require('./routes/route_producto');

//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join('.', 'app/model')));

console.log(". = ", '.');
console.log("__dirname = ", path.resolve(__dirname));

app.get('/api/awesomeThings', routes.awesomeThings);
app.get('/api/producto', model_producto.getlistado);
app.post('/api/producto/editar/', model_producto.editarProducto);

app.get('/api/grupo', model_grupo.getlistadoGrupo);
app.post('/api/grupo/guardar', model_grupo.insertarGrupo);
app.get('/api/grupoPuro', model_grupo.getlistado);

app.post('/api/producto/guardar', model_producto.insertarProducto);
app.post('/api/producto/eliminar', model_producto.eliminarProducto);

app.get('/api/frecuencia', model_frecuencia.getlistado);
app.post('/api/frecuencia/guardar', model_frecuencia.insertar);

app.get('/api/unidad', model_unidad.getlistado);
app.post('/api/unidad/guardar', model_unidad.insertar);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;