/**
 * Created by darioh on 27/06/15.
 */

var data_parroquia = require('../../model/model_parroquia.js');

/* obtiene el listado de todos los elementos de la tabla "frecuencia" en un objeto JSON */
exports.getlistado = function (req, res) {
    data_parroquia.connect();
    data_parroquia.db_get_listado(function (datos) {
        res.json(datos);
    });
};

/* inserta un nuevo elemento en la tabla "frecuencia"
 exports.insertar = function(req,res){
 data_canton.connect();
 data_frecuencia.db_insertar(descripcion, coeficiente,function(bandera) {
 console.log("Bandera: " + bandera);
 res.end();
 });
 };
 */
