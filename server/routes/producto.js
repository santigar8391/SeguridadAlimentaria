'use strict';
//var data_producto = require('../../app/model/data_producto.js');
//var data_grupo = require('../../app/model/data_grupo.js');
//var express = require('express');
//var router = express.Router();

//+++++++++OBTINE EL LISTADO DEL PRODUCTO++++++++++++++++++
exports.get_listado = function (req, res) {
    /*
    data_producto.connect();
    data_producto.db_get_listado(function (datos) {
        res.json(datos);
    });
    */

  res.json([
    'Gato',
    'Perro',
    'Chancho',
    'Express'
  ]);
};
