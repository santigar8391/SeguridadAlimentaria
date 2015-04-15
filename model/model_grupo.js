console.log("requiere paquetes....");
var inspect = require('util').inspect;
console.log("requiere paquetes....");
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
exports.db_get_listado = function(cb) {
    var data = [];
    client.query("SELECT int_id as id, int_id_padre, flt_numero, str_descripcion as title, str_estado FROM grupo;")
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

// inserta un nuevo SubGrupo en la tabla "producto"
//exports.db_insertar = function(id_grupo, desc_producto, cb) {
exports.db_insertar = function(subGrupoNuevo, cb) {
    if(subGrupoNuevo._id_padre == 'NULL'){
        client.query("INSERT INTO grupo (int_id_padre, flt_numero, str_descripcion, str_estado) VALUES (?, ?, ?, ?);",
            [null, '0',subGrupoNuevo._descripcion, 'Activo'])
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function() {
                console.log('Result finished successfully');
                cb(true);
            });
    }else{
        client.query("INSERT INTO grupo (int_id_padre, flt_numero, str_descripcion, str_estado) VALUES (?, ?, ?, ?);",
            [subGrupoNuevo._id_padre, '0',subGrupoNuevo._descripcion, 'Activo'])
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function() {
                console.log('Result finished successfully');
                cb(true);
            });
    }
};

// desconecta la base de datos
exports.disconnect = function() {
    client.end();
}