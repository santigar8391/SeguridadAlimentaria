/*jslint node: true */
'use strict';
var data_producto = require('../../model/data_producto.js');
var data_grupo = require('../../model/data_grupo.js');

exports.awesomeThings = function(req, res) {
    res.json([
        'Hermes Galo',
        'Zuly Sanchez',
        'Karma',
        'Express'
    ]);
};

//++++++++++++++LISTADO PRODUCTO++++++++++++++++++++++
exports.getlistado = function (req, res) {
   data_producto.connect();
   data_producto.db_get_listado(function (datos) {
     res.json(datos);
   });
};

//+++++++++LISTADO DEL GRUPO++++++++++++++++++++
exports.getlistadoGrupo = function(req, res, next) {
  data_grupo.connect();
  data_grupo.db_get_listado(function (datos) {
    res.json(datos);
  });
}

//++++++++++++++EDITA UN PRODUCTO++++++++++++++++++++++
exports.editarProducto = function(req, res){
  console.log("LLegue a la duncion EDITAR DE CONTROLLERPRODUCTO");
  data_producto.connect();
  data_grupo.connect();
  var desc_prod = req.query._descripcion;
  var id_grupo;
  console.log("Número de grupo!!!! = "+id_grupo+" , descripcion!!! "+desc_prod +" , id producto!!! "+req.query._id);
  data_grupo.db_get_listado(function(datos){
    for (var i in datos) {
      if (datos[i].num_grupo == req.query._num_grupo)
        id_grupo = datos[i].id_grupo;
    }
    console.log("Número de grupo!!!! = "+id_grupo+" , descripcion!!! "+desc_prod +" , id producto!!! "+req.query._id);
    try{
      console.log("DENTRO DEL TRY DE CONTROLLER EN EDITAR");
      data_producto.db_actualizar(id_grupo, desc_prod, req.query._id, function(bandera){
        console.log('Bandera: '+bandera);
        /*if (bandera){
          res.redirect('#/');
          Console.log("Exito");
        }else{
          console.log('No sirve el método insertar de producto.js.');
        }*/
        res.end();
      });
    }catch(e){
      console.log("En el catch del editar grupo del server.. fallo!!!");
      console.log(e);

      console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
    }
  });
};

//+++++++++++++++++++INSERTAR UN PRODUCTO++++++++++++++++++++++++
exports.insertarProducto = function(req,res){
  data_producto.connect();
  data_grupo.connect();
  var desc_prod = req.query._descripcion;
  var id_grupo;
  console.log(req.query._num_grupo+desc_prod);
  data_grupo.db_get_listado(function(datos){
    for (var i in datos) {
      if (datos[i].num_grupo == req.query._num_grupo)
        id_grupo = datos[i].id_grupo;
    }
    console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
    try{
      data_producto.db_insertar(id_grupo, desc_prod,function(bandera){
        /*if (bandera){
          res.redirect('producto/index.jade');
        }else{
          console.log('No sirve el método insertar de producto.js.');
        }*/
        console.log("Bandera: "+bandera);
        res.end();
      });
    }catch(e){
      res.redirect('/');
      console.log(e);
      console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
    }
    //console.log("Número de grupo = "+id_grupo+" , descripcion "+desc_prod);
  });
}

//++++++++++++++++++++++ELIMINAR UN PRODUCTO.++++++++++++++++++++++++++++++
exports.eliminarProducto = function(req, res){
  data_producto.connect();
  console.log("id de producto: " + req.query._id);
  try{
    data_producto.db_eliminar(req.query._id, function(bandera){
      /*if (bandera){
        res.redirect('producto/index.jade');
      }else{
        console.log('No sirve el método eliminar de producto.js.');
      }*/
      console.log("Bandera: "+bandera);
      res.end();
    });
  }catch (e){
    Console.log('Error: '+ e);
  }
}


