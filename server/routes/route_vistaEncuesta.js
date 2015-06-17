/**
 * Created by darioh on 16/06/15.
 */
/**
 * Created by darioh on 23/03/15.
 */
'use strict';
var data_vistaEncuesta = require('../../model/model_vistaEncuesta.js');
var i=0;
var row=[];
//array para padre.
var parents=[];
//array para hijo.
var childrens=[];
//Nombre de la variable
var childrenNombre = 'nodes';
var padreNombre = 'int_id_padre';


exports.getlistadovistaEncuesta = function(req, res, next) {
    console.log('Llego al menos en getlistadovistaEncuesta');

    data_vistaEncuesta.connect();
    data_vistaEncuesta.db_get_listadoPregunta(function (datos) {
        limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][childrenNombre]=[];
            datos[i][padreNombre]= null;
            row=datos[i];
            if(row.int_id_padre == null){
                //JSON.stringify(parents.push(row));
                parents.push(row);
                //console.log("IF-->"+row.str_descripcion);
            }
            else{
                console.log("No Padre en route_vistaEncuesta/getlistadovistaEncuesta CON db_get_listadoPregunta!");
            }
        }
        console.log('Datos despues del FOR en getlistadovistaEncuesta: '+parents);
        jsonHijoEscala();
        /*
        for(var j=0; j<2; j++) {
            parents.forEach(function (parent) {
                loopChildrens(childrens, parent, j);
            });
        }
        res.json(json);
        */
        console.log('NO MISMO!!!'+json);
        res.end();
    });
};
var json=[];
// Recursividad para comprobar los children
var loopChildrens = function(rows, parent, bandera){

    if(rows.length>0 && bandera ==0){
        rows.forEach(function (row) {
            if(row.int_id_padre == parent.int_id){
                parent.nodes.push(row);
                //console.log("PROBANDO JSON-->"+ JSON.stringify(parent));
                loopChildrens(rows, row,0);
            }
        });
    }
    if(rows.length>0 && bandera == 1) {
        json.push(parent);
    }
};

var jsonHijoEscala = function(){
    //data_vistaEncuesta.connect();
    data_vistaEncuesta.db_get_listadoEscala(function (datos) {
        //limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][childrenNombre]=[];
            datos[i][padreNombre] = datos[i].int_id_pregunta;
            row=datos[i];
             childrens.push(row);
        }
        console.log('Datos despues del FOR en jsonHijoEscala: '+datos);
        jsonHijoTest();
/*
        //var bandera=0;
        for(var j=0; j<2; j++) {
            parents.forEach(function (parent) {
                loopChildrens(childrens, parent, j);
            });
        }
*/
        //res.json(json);
    });
};


var jsonHijoTest = function(){
    //data_vistaEncuesta.connect();
    data_vistaEncuesta.db_get_listadoTest(function (datos) {
        //limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][childrenNombre]=[];
            datos[i][padreNombre] = datos[i].int_id_pregunta;
             row=datos[i];
             childrens.push(row);
        }
        console.log('Datos despues del FOR en jsonHijoTest: '+datos);
        console.log('Datos del childrens: '+ childrens);

        for(var j=0; j<2; j++) {
            parents.forEach(function (parent) {
                loopChildrens(childrens, parent, j);
            });
        }

        console.log('Datos del JSON total en jsonHijoTest: '+'\n' + JSON.stringify(json));
    });
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