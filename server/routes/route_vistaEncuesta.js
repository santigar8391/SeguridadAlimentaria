/**
 * Created by darioh on 16/06/15.
 */
/**
 * Created by darioh on 23/03/15.
 */
'use strict';
var data_vistaEncuesta = require('../../model/model_vistaEncuesta.js');
var data_encuesta_resuelta = require('../../model/model_encuesta_resuelta');

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


exports.getlistadovistaEncuesta = function(req, res) {
    data_vistaEncuesta.connect();
    data_vistaEncuesta.db_get_listadoPregunta(req,res,function (datos) {
        limpiaDatos();
        for(i=datos.length - 1; i>=0; i--){
            datos[i][padreNombre]= null;
            datos[i][nombreRespuesta]= '';
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

    data_vistaEncuesta.db_get_listadoEscala(req, res,function (datos) {
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


    data_vistaEncuesta.db_get_listadoTest(req, res, function (datos) {
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


exports.insertar_pregunta_resuelta = function(req,res) {
    var datoEncuesta = req.body[2];
    data_encuesta_resuelta.connect();
    data_vistaEncuesta.connect();
    try {

        data_encuesta_resuelta.db_insertar(req.body, function(badenra){
            console.log('Success en isertar encuesta resuelta'+badenra);
        });

        data_encuesta_resuelta.db_get_ultimo_id(function(dato){

            datoEncuesta.forEach(function(datoUno){
                data_vistaEncuesta.db_insertar_respuesta(datoUno, dato[0].int_id, req.body[1].fecha, function(dat){
                    console.log('Se han metido todas las preguntas en la tabla respuestas'+dat)
                });

                data_vistaEncuesta.db_get_ultimo_id_respuesta(function(dato){
                    console.log('---------------------------------------->>>>>>>>>>> '+dato[0].int_id);

                    if (datoUno.int_id_tipo_pregunta == '1' || datoUno.int_id_tipo_pregunta == 'text'){
                        data_vistaEncuesta.db_insertar_respuesta_texto(datoUno, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta SIMPLE '+bandera);
                        })
                    }
                    if (datoUno.int_id_tipo_pregunta == '2' || datoUno.int_id_tipo_pregunta == 'parrafo'){
                        console.log('------------------------------<<<<<<<<< '+dato[0].int_id);
                    }
                    if (datoUno.int_id_tipo_pregunta == '3' || datoUno.int_id_tipo_pregunta == 'radio'){
                        data_vistaEncuesta.db_insertar_respuesta_seleccion_simple(datoUno.nodes, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta SIMPLE '+bandera);
                        })
                    }
                    if (datoUno.int_id_tipo_pregunta == '4' || datoUno.int_id_tipo_pregunta == 'checkbox'){
                        data_vistaEncuesta.db_insertar_respuesta_seleccion_multiple(datoUno.nodes, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta MULTIPLE '+bandera);
                        })
                    }
                    if (datoUno.int_id_tipo_pregunta == '5' || datoUno.int_id_tipo_pregunta == 'escala'){
                        data_vistaEncuesta.db_insertar_respuesta_escala(datoUno.nodes, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta ESCALA '+bandera);
                        })
                    }
                    if (datoUno.int_id_tipo_pregunta == '6' || datoUno.int_id_tipo_pregunta == 'date'){
                        data_vistaEncuesta.db_insertar_respuesta_fecha(datoUno, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta simple '+bandera);
                        })
                    }
                    if (datoUno.int_id_tipo_pregunta == '7' || datoUno.int_id_tipo_pregunta == 'time'){
                        data_vistaEncuesta.db_insertar_respuesta_hora(datoUno, dato[0].int_id,function(bandera){
                            console.log('inserto en if de insercion de respuesta HORA '+bandera);
                        })
                    }
                });
            });
        });
        res.end();

/*
        data_vistaEncuesta.db_insertar_(req.body[1], function (dato) {
            console.log('Ok'+dato);
        });

        datos.forEach(function(dato){

            data_pregunta.db_insertar(dato, function(bandera){
                console.log("Bandera: "+bandera);
            });

            data_pregunta.db_get_ultimo_id(function (datos) {
                console.log('PROBANDO EL ID AHORA DENTRO DEL FOREACH '+ JSON.stringify(datos[0].int_id));
                id_preguntaDb = datos;
                dato.nodes.forEach(function(respuestas){
                    data_respuesta.db_insertar(respuestas, parseInt(id_preguntaDb[0].int_id), function(bandera){
                        console.log("Bandera: "+bandera);
                    });
                    //console.log(respuestas);
                });
            });
        });
*/
    } catch (e) {
        //res.redirect('#/');
        console.log('Error en el route_en el catch en routes/route_pregunta'+e);
    }

};



var json=[];
// Recursividad para comprobar los children
var loopChildrens = function(rows, parent, bandera){

    if(rows.length>0 && bandera ==0){
        rows.forEach(function (row) {
            if(row.int_id_padre == parent.int_id){
                parent.nodes.push(row);
                //console.log("PROBANDO JSON-->"+ JSON.stringify(parent));
                //loopChildrens(rows, row,0);
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