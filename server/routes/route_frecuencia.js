'use strict';
var data_frecuencia = require('../../model/model_frecuencia.js');

/* obtiene el listado de todos los elementos de la tabla "frecuencia" en un objeto JSON */
exports.getlistado = function (req, res) {
  data_frecuencia.connect();
  data_frecuencia.db_get_listado(function (datos) {
    res.json(datos);
  });
};

/* inserta un nuevo elemento en la tabla "frecuencia" */
exports.insertar = function(req,res){
  data_frecuencia.connect();   
  var descripcion = req.query._frecuenciaDescripcion;
  var coeficiente = req.query._frecuenciaCoeficiente;
  data_frecuencia.db_insertar(descripcion, coeficiente,function(bandera) {
    console.log("Bandera: " + bandera);
    res.end();
  });
};
