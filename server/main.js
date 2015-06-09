/*jslint node: true */
'use strict';


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var router = express.Router();
var routerGrupo = express.Router();

var routes = require('./routes');
var model_frecuencia = require('./routes/route_frecuencia');
var model_unidad = require('./routes/route_unidad');
var model_grupo = require('./routes/route_grupo');
var model_producto = require('./routes/route_producto');
var model_encuesta = require('./routes/route_encuesta');
var model_variable = require('./routes/route_variable');

var mySecretKey = 'mySecretKey';

//var users = require('./routes/users');

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


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', model_producto.getlistado);
router.post('/editar/', model_producto.editarProducto);
router.post('/guardar', model_producto.insertarProducto);
router.post('/eliminar', model_producto.eliminarProducto);
app.use('/api/producto', router);


routerGrupo.get('/', model_grupo.getlistadoGrupo);
routerGrupo.post('/guardar', model_grupo.insertarGrupo);
routerGrupo.get('/grupoPuro', model_grupo.getlistado);
app.use('/api/grupo', routerGrupo);


app.get('/api/frecuencia', model_frecuencia.getlistado);
app.post('/api/frecuencia/guardar', model_frecuencia.insertar);

app.get('/api/unidad', model_unidad.getlistado);
app.post('/api/unidad/guardar', model_unidad.insertar);

app.get('/api/encuesta', model_encuesta.getlistado);
app.post('/api/encuesta/guardar', model_encuesta.insertarEncuesta);

app.get('/api/variable', model_variable.getlistadoVariable);
app.post('/api/variable/guardar', model_variable.insertarVariable);
app.get('/api/variablePuro', model_variable.getlistado);
app.post('/api/variable/eliminar', model_variable.eliminar);

app.post('/api/login', function(req, res, next){

    var usuario = {
        nombre: 'Hermes',
        nick: 'hermessanc',
        password: '123456'
    };

    if(!(req.body.nick === 'hermessanc' && req.body.password === '123456')){
        res.status(500).json({
            msg: 'Error en el /api/login obteniedo comparando al usuario PASO1'
        });
    };

    /*
    if(!user){
        res.status(404).json({
            msg: 'Error en el /api/login no se encontrado el recurso trama con mongo PASO2'
        });
    }
    */

    var token = jwt.sign(usuario, mySecretKey, {expiresInMinutes: 1440});
    return res.status(200).json(
        {
            success: true,
            message: 'Enjoy your token!',
            token: token
        }
    );
});


app.post('/api/info', function(req, res, next){


});





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