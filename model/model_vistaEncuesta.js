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
exports.db_get_listadoPregunta = function(req,res,cb) {
    var data = [];
    client.query("SELECT p.int_id, p.int_id_encuesta, p.int_id_variable, p.int_id_tipo_pregunta, p.int_numero, p.str_enunciado, p.str_ayuda, " +
    "p.int_obligatoria, v.int_id as int_id_variable, v.int_id_padre as int_id_padre_variable,v.str_descripcion as str_descripcion_variable, " +
    "v.flt_numero FROM pregunta as p inner join variable as v on p.int_id_variable=v.int_id WHERE p.int_id_encuesta=? AND v.str_estado = ?", [req.query.intId, 'ACTIVO'])
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

//
exports.db_get_listadoTest = function(req,res,cb) {
    var data = [];
    client.query("select t.int_id, t.int_id_pregunta, t.str_descripcion, t.int_valor, t.int_correcto, t.str_desc_campo, p.int_id_tipo_pregunta " +
    "from test as t inner join pregunta as p on p.int_id = t.int_id_pregunta AND p.int_id_encuesta = ?", [req.query.intId])

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

exports.db_get_listadoEscala = function(req, res, cb) {
    var data = [];
    client.query("SELECT e.int_id_pregunta, e.str_desc_inicio, e.str_desc_fin, e.int_inicio, e.int_fin, p.int_id_tipo_pregunta from escala as e inner join pregunta " +
    "as p on p.int_id = e.int_id_pregunta AND p.int_id_encuesta = ?", [req.query.intId])
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