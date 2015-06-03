'use strict';
var data_encuesta = require('../../model/model_encuesta.js');

//++++++++++++++LISTADO PRODUCTO++++++++++++++++++++++
exports.getlistado = function (req, res) {
  data_encuesta.connect();
  data_encuesta.db_get_listado(function (datos) {
    res.json(datos);
  });
};

//++++++++++++++EDITA UN PRODUCTO++++++++++++++++++++++
exports.editarEncuesta = function(req, res){
  data_encuesta.connect();
  try{
    console.log(req.query);
    data_encuesta.db_actualizar(req.query, function(bandera){
      console.log('Editado: '+bandera);
      res.end();
    });
  }catch(e){
    console.log("Error en el route_encuesta/editarEncuesta");
    console.log(e);
  }
};

//+++++++++++++++++++INSERTAR UN PRODUCTO++++++++++++++++++++++++
exports.insertarEncuesta = function(req,res){
  data_encuesta.connect();
  console.log(req.query);
  try{
    data_encuesta.db_insertar(req.query,function(bandera){
      console.log("Bandera: "+bandera);
      res.end();
    });
  }catch(e){
    console.log('Error al insertarEncuesta en el route_encuesta');
    console.log(e);
  }
};

/*+++++++++++++++++++++ELIMINAR UN PRODUCTO.++++++++++++++++++++++++++++++
exports.eliminarProducto = function(req, res){
  data_encuesta.connect();
  console.log("id de producto: " + req.query._id);
  try{
    data_encuesta.db_eliminar(req.query._id, function(bandera){
      console.log("Bandera: "+bandera);
      res.end();
    });
  }catch (e){
    Console.log('Error: '+ e);
  }
};
*/