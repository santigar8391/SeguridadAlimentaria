'use strict';
var data_producto = require('../../model/model_producto.js');

//++++++++++++++LISTADO PRODUCTO++++++++++++++++++++++
exports.getlistado = function (req, res) {
  data_producto.connect();
  data_producto.db_get_listado(function (datos) {
    res.json(datos);
  });
};


//++++++++++++++EDITA UN PRODUCTO++++++++++++++++++++++
exports.editarProducto = function(req, res){
  console.log("LLegue a la Funcion EDITAR DE CONTROLLERPRODUCTO");
  data_producto.connect();
  var desc_prod = req.query._descripcion;
  var id_grupo;
  try{
    console.log("DENTRO DEL TRY DE CONTROLLER EN EDITAR");
    console.log(req.query);
    data_producto.db_actualizar(req.query, function(bandera){
      console.log('Bandera: '+bandera);
      res.end();
    });
  }catch(e){
    console.log("En el catch del editar grupo del server.. fallo!!!");
    console.log(e);

    console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
  }
};

//+++++++++++++++++++INSERTAR UN PRODUCTO++++++++++++++++++++++++
exports.insertarProducto = function(req,res){
  data_producto.connect();
  var desc_prod = req.query._descripcion;
  var id_grupo = req.query._num_grupo;
  console.log(req.query);
  try{
    data_producto.db_insertar(req.query,function(bandera){
      console.log("Bandera: "+bandera);
      res.end();
    });
  }catch(e){
    res.redirect('/');
    console.log(e);
    console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
  }
};

//++++++++++++++++++++++ELIMINAR UN PRODUCTO.++++++++++++++++++++++++++++++
exports.eliminarProducto = function(req, res){
  data_producto.connect();
  console.log("id de producto: " + req.query._id);
  try{
    data_producto.db_eliminar(req.query._id, function(bandera){
      console.log("Bandera: "+bandera);
      res.end();
    });
  }catch (e){
    Console.log('Error: '+ e);
  }
};