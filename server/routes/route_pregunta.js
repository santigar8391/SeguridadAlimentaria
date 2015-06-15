/**
 * Created by darioh on 11/06/15.
 */

'use strict';
var data_pregunta = require('../../model/model_pregunta.js');
var data_respuesta = require('../../model/model_respuesta.js');

//++++++++++++++LISTADO PRODUCTO++++++++++++++++++++++
exports.getlistado = function (req, res) {
    data_producto.connect();
    data_producto.db_get_listado(function (datos) {
        res.json(datos);
    });
};

//+++++++++++++++++++INSERTAR UN PRODUCTO++++++++++++++++++++++++
exports.insertarPregunta = function(req,res){
    data_pregunta.connect();
    data_respuesta.connect();
    var id_preguntaDb = null;
    var datos = req.body; //Esto causo error al convertirlo enJSON por el forEach 'NO LO TIENE'
    var datosJson = datos;
    try {
        console.log('Datos que estan ingresando'+datosJson[1].nodes[0].title);
        datos.forEach(function(dato){

            data_pregunta.db_insertar(dato, function(bandera){
                console.log("Bandera: "+bandera);
            });

            data_pregunta.db_get_ultimo_id(function (datos) {
                console.log('PROBANDO EL ID AHORA DENTRO DEL FOREACH '+ JSON.stringify(datos[0].int_id));
                id_preguntaDb = datos;
                dato.nodes.forEach(function(respuestas){
                     data_respuesta.db_insertar(respuestas, parseInt(id_preguntaDb[0].int_id), function(bandera){
                     console.log("Bandera: "+bandera);
                     });
                    //console.log(respuestas);
                });
                });
        });
        res.end();
    } catch (e) {
        //res.redirect('#/');
        console.log('Error en el route_en el catch en routes/route_pregunta'+e);
    }
};