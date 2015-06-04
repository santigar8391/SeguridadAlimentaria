/**
 * Created by darioh on 03/06/15.
 */
'use strict';
var data_variable = require('../../model/model_variable.js');
var i=0;
var row=[];
//array para padre.
var parents=[];
//array para hijo.
var childrens=[];
//Nombre de la variable
var childrenNombre = 'nodes';

exports.getlistado = function(req, res, next) {
    data_variable.connect();
    data_variable.db_get_listado(function (datos) {
        res.json(datos);
    });
};

exports.getlistadoVariable = function(req, res, next) {
    data_variable.connect();
    data_variable.db_get_listado(function (datos) {
        limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][childrenNombre]=[];
            row=datos[i];
            if(row.int_id_padre == null){
                JSON.stringify(parents.push(row));
                console.log("IF-->"+row.str_descripcion);
            }
            else{
                JSON.stringify(childrens.push(row));
                console.log("ELSE-->" +row.str_descripcion);
            }
        }

        //var bandera=0;
        for(var j=0; j<2; j++) {
            parents.forEach(function (parent) {
                loopChildrens(childrens, parent, j);
            });
        }
        res.json(json);
    });
};
var json=[];
// Recursividad para comprobar los children
var loopChildrens = function(rows, parent, bandera){

    if(rows.length>0 && bandera ==0){
        rows.forEach(function (row) {
            if(row.int_id_padre == parent.id){
                parent.nodes.push(row);
                //console.log("PROBANDO JSON-->"+ JSON.stringify(parent));
                loopChildrens(rows, row,0);
            }
        });
    }
    //json.splice(0, json.length);
    if(rows.length>0 && bandera == 1) {
        json.push(parent);
    }
};

// Limpia los datos...

var limpiaDatos = function(){
    json.splice(0, json.length);
    console.log("Longitud de json->"+json.length);

    parents.splice(0, parents.length);
    console.log("Longitud de json->"+parents.length);

    childrens.splice(0, childrens.length);
    console.log("Longitud de json->"+childrens.length);

};

//+++++++++++++++++++INSERTAR UN Subvariable++++++++++++++++++++++++
exports.insertarVariable = function(req,res){
    data_variable.connect();
    console.log(req.query);
    try{
        data_variable.db_insertar(req.query,function(bandera){
            console.log("Bandera: "+bandera);
            res.end();
        });
    }catch(e){
        res.redirect('#/');
        console.log(e);
        console.log("Número de variable = "+id_variable+" , descripcion "+desc_prod);
    }
};

exports.eliminar = function(req,res) {
    data_variable.connect();
    console.log("En el route_variable/eliminar"+ req.query.variable);
    try {

        for (i = 0; i < req.query.variable.length; i += 1) {
            data_variable.db_eliminar(req.query.variable[i],function(bandera){
                console.log("Bandera: "+bandera);
            });
        }
        res.end();
    } catch (e) {
        res.redirect('#/');
        console.log(e);
        console.log("Número de variable = " + id_variable + " , descripcion " + desc_prod);
    }
};