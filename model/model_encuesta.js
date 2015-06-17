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

// obtiene todos los elementos de la tabla "producto"
exports.db_get_listado = function(cb) {
    var data = [];
      client.query("SELECT * FROM encuesta LIMIT 0 , 30;")
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
}

// inserta un nuevo producto en la tabla "producto"
//exports.db_insertar = function(id_grupo, desc_producto, cb) {
exports.db_insertar = function(encuestaNueva, cb) {
    console.log(encuestaNueva+'!!!!!!!!!!!!');
    client.query("INSERT INTO encuesta (str_titulo, str_descripcion, str_objetivo, str_destinado_a, str_instrucciones, dt_fecha_creacion, dt_fecha_modificacion,"
    +"str_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [encuestaNueva.titulo, encuestaNueva.descripcion, encuestaNueva.objetivo, encuestaNueva.destinadoA, encuestaNueva.instrucciones, encuestaNueva.fechaCreacion, encuestaNueva.fechaModificacion, encuestaNueva.estado])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
}

// elimina un elemento de la tabla "producto" de acuerdo a su "id_producto"
exports.db_eliminar = function(id_producto, cb) {
    //client.query("DELETE FROM producto WHERE int_id = :var_id_producto;",
    client.query("UPDATE producto SET str_estado = ? WHERE int_id = ?;",
        ["Inactivo" ,id_producto])
        //{var_id_producto: id_producto})
            .on('error', function(err) {
                console.log('Result error: ' + inspect(err));
            })
            .on('end', function() {
                console.log('Result finished successfully');
                cb(true);
            });
}

// obtiene un elemento de la tablas "producto" join "producto" a partir de "id_producto"
exports.db_get_elemento_by_id = function(id_producto, cb) {
    var data = [];
    client.query("SELECT id_producto, desc_producto, num_grupo FROM producto INNER JOIN grupo "+
    "ON producto.id_grupo = grupo.id_grupo WHERE id_producto = :id;",{id: id_producto})
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
}

exports.db_actualizar = function (encuestaEditar, cb){
    client.query("UPDATE encuesta SET str_titulo = ?, str_descripcion = ?, str_objetivo = ?, str_destinado_a = ?, srt_instrucciones = ?, dt_fecha_creacion = ?, dt_fecha_modificacion = ?, str_estado = ? WHERE int_id = ?;",
        [encuestaEditar.titulo, encuestaEditar.descripcion, encuestaEditar.objetivo, encuestaEditar.destinadoA, encuestaEditar.instrucciones, encuestaEditar.fechaCreacion, encuestaEditar.fechaModificacion, encuestaEditar.estado, encuestaEditar.id])
        .on('error', function(err) {
            console.log('Error en el model_encuesta/db_actualizar: ' + inspect(err));
        })
        .on('end', function() {
            console.log('Result finished successfully');
            cb(true);
        });
}
// desconecta la base de datos
exports.disconnect = function() {
    client.end();
}
