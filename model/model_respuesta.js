/**
 * Created by darioh on 14/06/15.
 */
var inspect = require('util').inspect;
var Client = require('mariasql');

var client = new Client();

// genera la conexión a la base de datos "proyectoSeguridad"
exports.connect = function() {
    client.connect({
        host: '127.0.0.1',
        user: 'root',
        password: 'H3rm3sSanch3z',
        db: 'proyectoseguridad'
    });
    client.on('connect', function() { console.log('Client connected'); }
    ).on('error', function(err) { console.log('Client error: ' + err); }
    ).on('close', function(hadError) { console.log('Client closed'); });
};

exports.db_insertar = function(respuestaNueva, id_pregunta, cb) {
    var correcto = null;
    if(respuestaNueva.valor){
        correcto = 1;
    }
    if(!respuestaNueva.valor){
        correcto = 0;
        console.log('OK!!');
    }
    console.log('Llego al model_respuesta/db_insertar con estos datos'+ respuestaNueva.numId +' y '+ respuestaNueva.valor +' y '+id_pregunta+
    ' Y ' +respuestaNueva.type+' y '+ respuestaNueva.numEscala, correcto);

        console.log('Llego antes de insertar!!!!!!');
        client.query("INSERT INTO test (int_id, int_id_pregunta, str_descripcion, int_valor, int_correcto, str_desc_campo) VALUES (?, ?, ?, ?, ?, ?);",
            [respuestaNueva.numId, id_pregunta, respuestaNueva.title, respuestaNueva.numEscala, correcto, 'NULL'])
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function() {
                console.log('Exito en model_respuesta/db_insertar!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                cb(true);
            });
};