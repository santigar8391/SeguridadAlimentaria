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
};

// obtiene todos los elementos de la tabla "grupo"
exports.db_get_listadoPregunta = function(req,res,cb) {
    console.log('------------------------------------------------->'+req.body);
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


exports.db_insertar_respuesta = function(encuestaRespuesta, id, fecha, cb){

    client.query("INSERT INTO respuesta (int_id_pregunta, int_id_encuesta_resuelta, dt_fecha_hora) " +
        "VALUES (?, ?, ?);",
        [encuestaRespuesta.int_id, id, fecha])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });

};


exports.db_insertar_respuesta_seleccion_simple = function(respuestaSeleccionSimple, id, cb){

    respuestaSeleccionSimple.forEach(function(res){
        if(res.respuesta != false){

            client.query("INSERT INTO resp_seleccion_simple (int_id_respuesta, int_id_opc_seleccionada, str_campo_texto) " +
                "VALUES (?, ?, ?);",
                [id, res.int_id, res.str_descripcion])
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function() {
                    console.log('Result finished successfully');
                    cb(true);
                });
        }
    });

};

exports.db_insertar_respuesta_seleccion_multiple = function(respuestaSeleccionMultiple, id, cb){
    respuestaSeleccionMultiple.forEach(function(check){
       if(check.respuesta == true){
           client.query("INSERT INTO resp_seleccion_multiple (int_id_respuesta, int_id_opc_seleccionada, str_campo_texto) " +
               "VALUES (?, ?, ?);",
               [id, check.int_id, check.str_descripcion])
               .on('error', function(err) {
                   console.log('Result error: ' + inspect(err));
               })
               .on('end', function() {
                   console.log('Result finished successfully');
                   cb(true);
               });
       }

    });
};

exports.db_insertar_respuesta_escala = function(respuestaEscala, id, cb){

    client.query("INSERT INTO resp_escala (int_id_respuesta, int_valor_seleccionado) " +
        "VALUES (?, ?);",
        [id, respuestaEscala[0].respuesta])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
    };

exports.db_insertar_respuesta_hora = function(respuestaHora, id, cb){

    client.query("INSERT INTO resp_hora (int_id_respuesta, t_hora) " +
        "VALUES (?, ?);",
        [id, respuestaHora.respuesta])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
};



exports.db_insertar_respuesta_fecha = function(respuestaHora, id, cb){

    client.query("INSERT INTO resp_fecha (int_id_respuesta, d_fecha) " +
        "VALUES (?, ?);",
        [id, respuestaHora.respuesta])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
};

exports.db_insertar_respuesta_parrafo = function(respuestaParrafo, id, cb){

    client.query("INSERT INTO resp_parrafo (int_id_respuesta, str_parrafo) " +
        "VALUES (?, ?);",
        [id, respuestaParrafo.respuesta])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
};

exports.db_insertar_respuesta_texto = function(respuestaTexto, id, cb){

    client.query("INSERT INTO resp_texto (int_id_respuesta, str_texto) " +
        "VALUES (?, ?);",
        [id, respuestaTexto.respuesta])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
};

// obtiene todos los elementos de la tabla "producto"
exports.db_get_ultimo_id_encuesta_resuelta = function(cb) {
    var data = [];
    client.query("SELECT int_id FROM encuesta_resuelta ORDER BY int_id DESC LIMIT 1;")
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
            console.log('desde conexion a datos :D!!!');
            //console.log(data);
        });
};


exports.db_get_ultimo_id_respuesta = function(cb) {
    var data = [];
    client.query("SELECT int_id FROM respuesta ORDER BY int_id DESC LIMIT 1;")
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
            console.log('desde conexion a datos :D!!!');
            //console.log(data);
        });
};

// desconecta la base de datos
exports.disconnect = function() {
    client.end();
};