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
var nombreRespuesta = 'respuesta';


exports.getlistadovistaEncuesta = function(req, res, next) {
    data_vistaEncuesta.connect();
    data_vistaEncuesta.db_get_listadoPregunta(function (datos) {
        limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][padreNombre]= null;
            datos[i][nombreRespuesta]= false;
            datos[i][childrenNombre]=[];

            row=datos[i];
            if(datos[i].int_id_tipo_pregunta == '1'){
                datos[i].int_id_tipo_pregunta = 'text';
            }
             if(datos[i].int_id_tipo_pregunta == '6'){
             datos[i].int_id_tipo_pregunta = 'date';
             }
             if(datos[i].int_id_tipo_pregunta == '7'){
             datos[i].int_id_tipo_pregunta = 'time';
             }
             parents.push(row);
        }
    });

    data_vistaEncuesta.db_get_listadoEscala(function (datos) {
        for(i=datos.length - 1; i>=0; i--){
            datos[i][padreNombre] = datos[i].int_id_pregunta;
            datos[i][nombreRespuesta]= false;
            datos[i][childrenNombre]=[];

            if(datos[i].int_id_tipo_pregunta == '5'){
                datos[i].int_id_tipo_pregunta = 'range';
            }

            row=datos[i];

            childrens.push(row);
        }
        console.log('Datos despues del FOR en jsonHijoEscala: '+datos);

    });


    data_vistaEncuesta.db_get_listadoTest(function (datos) {
        for(i=datos.length - 1; i>=0; i--){
            datos[i][padreNombre] = datos[i].int_id_pregunta;
            datos[i][nombreRespuesta]= false;
            datos[i][childrenNombre]=[];

            if(datos[i].int_id_tipo_pregunta == '4'){
                datos[i].int_id_tipo_pregunta = 'checkbox';
            }
            if(datos[i].int_id_tipo_pregunta == '3'){
                datos[i].int_id_tipo_pregunta = 'radio';
            }
        console.log('Dato en el °°°°°int_id_tipo_pregunta°°°° '+datos[i].int_id_pregunta);
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
        res.json(json);
    });

    console.log('Datos despues del FOR en getlistadovistaEncuesta: '+parents);
    console.log('NO MISMO!!!°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'+json);

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


// Limpia los datos...
var limpiaDatos = function(){
    json.splice(0, json.length);
    console.log("Longitud de json->"+json.length);

    parents.splice(0, parents.length);
    console.log("Longitud de json->"+parents.length);

    childrens.splice(0, childrens.length);
    console.log("Longitud de json->"+childrens.length);

};