/*jslint node: true */
'use strict';
var data_producto = require('../../model/model_producto.js');
var data_grupo = require('../../model/model_grupo.js');


exports.awesomeThings = function(req, res) {
  res.json([
        'Hermes Galo',
        'Zuly Sanchez',
        'Karma',
        'Express'
    ]);
};