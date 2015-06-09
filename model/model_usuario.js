/**
 * Created by darioh on 05/06/15.
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

// obtiene todos los elementos de la tabla "producto"
exports.db_get_listado = function(cb) {
    var data = [];
    client.query("SELECT producto.int_id, producto.str_descripcion as Producto, grupo.str_descripcion as Grupo, unidad.str_descripcion " +
    "as Unidad_medida, flt_min, flt_max FROM producto INNER JOIN grupo ON producto.int_id_grupo = grupo.int_id " +
    "INNER JOIN unidad On producto.int_id_unidad = unidad.int_id WHERE producto.str_estado = 'Activo' ORDER BY producto.int_id LIMIT 0 , 30;")
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
exports.db_insertar = function(productoNuevo, cb) {
    //INSERT INTO producto (int_id_grupo, int_id_unidad, str_descripcion, flt_min, flt_max, str_estado) VALUES
    //(1, 1, 'Borrego', 4.5, 10.5, 'Activo')
    client.query("INSERT INTO producto (int_id_grupo, int_id_unidad, str_descripcion, flt_min, flt_max, str_estado) VALUES (?, ?, ?, ?, ?, ?);",
        [productoNuevo._num_grupo, productoNuevo._num_unidad, productoNuevo._descripcion, productoNuevo._flt_min, productoNuevo._flt_max, "Activo"])
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

exports.db_actualizar = function (productoEditar, cb){
    console.log("SI LLEGA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    client.query("UPDATE producto SET int_id_grupo = ?, int_id_unidad = ?, str_descripcion = ?, flt_min = ?, flt_max = ? WHERE int_id = ?;",
        [productoEditar._num_grupo, productoEditar._num_unidad, productoEditar._descripcion, productoEditar._flt_min, productoEditar._flt_max, productoEditar._id])
        .on('error', function(err) {
            console.log('Result error: ' + inspect(err));
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