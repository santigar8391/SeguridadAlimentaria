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