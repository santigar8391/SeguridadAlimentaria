/**
 * Created by darioh on 16/06/15.
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
}

// obtiene todos los elementos de la tabla "grupo"
exports.db_get_listadoPregunta = function(cb) {
    var data = [];
    client.query("SELECT int_id, int_id_encuesta, int_id_variable, int_id_tipo_pregunta, int_numero, str_enunciado, str_ayuda, int_obligatoria FROM pregunta;")
        .on('result', function(res) {
            res.on('row', function(row) {
                data.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            //console.log(data);
            cb(data);
        });
};

exports.db_get_listadoTest = function(cb) {
    var data = [];
    client.query("select t.int_id, t.int_id_pregunta, t.str_descripcion, t.int_valor, t.int_correcto, t.str_desc_campo, p.int_id_tipo_pregunta from test as t inner join pregunta as p on p.int_id = t.int_id_pregunta;")
        .on('result', function(res) {
            res.on('row', function(row) {
                data.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            //console.log(data);
            cb(data);
        });
};

exports.db_get_listadoEscala = function(cb) {
    var data = [];
    client.query("SELECT int_id_pregunta, str_desc_inicio, str_desc_fin, int_inicio, int_fin, p.int_id_tipo_pregunta from escala as e inner join pregunta as p on p.int_id = e.int_id_pregunta;")
        .on('result', function(res) {
            res.on('row', function(row) {
                data.push(row);
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
        })
        .on('end', function() {
            cb(data);
        });
};

// desconecta la base de datos
exports.disconnect = function() {
    client.end();
};