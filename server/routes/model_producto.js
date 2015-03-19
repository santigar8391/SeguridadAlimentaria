'use strict';
var data_producto = require('../../model/data_producto.js');
var data_grupo = require('../../model/data_grupo.js');
//var express = require('express');
//var router = express.Router();

//+++++++++OBTINE EL LISTADO DEL PRODUCTO++++++++++++++++++
exports.getlistado = function (req, res) {
  data_producto.connect();
  data_producto.db_get_listado(function (datos) {
    res.json(datos);
  });
};
