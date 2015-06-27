/**
 * Created by darioh on 26/06/15.
 */

var data_canton = require('../../model/model_canton.js');

/* obtiene el listado de todos los elementos de la tabla "frecuencia" en un objeto JSON */
exports.getlistado = function (req, res) {
    data_canton.connect();
    data_canton.db_get_listado(function (datos) {
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