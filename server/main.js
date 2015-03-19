/*jslint node: true */
'use strict';


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//var data = require('./data_producto.js');

var routes = require('./routes');
var model_frecuencia = require('./routes/model_frecuencia');
//var users = require('./routes/users');
//var producto = require('./routes/producto');
//var cproducto = require('./routes/controllerProducto');

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
app.get('/api/producto', routes.getlistado);
app.post('/api/producto/editar/', routes.editarProducto);
app.get('/api/grupo', routes.getlistadoGrupo);
app.post('/api/producto/guardar', routes.insertarProducto);
app.post('/api/producto/eliminar', routes.eliminarProducto);

app.get('/api/frecuencia', model_frecuencia.getlistado);
app.post('/api/frecuencia/guardar', model_frecuencia.insertar);
/*
app.get('/', cproducto.index);
app.get('/producto', cproducto.get_listado);
app.get('/grupo', cproducto.get_listadoGrupo);
app.post('/guardar/producto', cproducto.insertarProducto);
app.post('/editar', cproducto.editar);
app.delete('/eliminar/:id_producto', cproducto.eliminar);
app.delete('/eliminar/', cproducto.eliminar);
*/



//app.use('*', controllerProducto.index);
//app.use('/users', users);

// GESTIÓN DE RUTAS
//router.get('/producto', producto.get_listado);
//app.get('/producto', controllerProducto.listadoProducto);
//router.get('/producto', function(req,res,next){
  //  res.render("un texto plano de prueba");

//});
/*console.log('desde app');
/router.get('/producto/nuevo', producto.get_nuevo);
router.get('/producto/:id_producto/editar', producto.get_editar);
router.get('/producto/eliminar/:id_producto', producto.eliminar);
router.post('/producto/nuevo', producto.insertar);
router.post('/producto/:id_producto/editar', producto.editar);*/


//app.use('/', router);

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
