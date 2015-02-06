var inspect = require('util').inspect;
var Client = require('mariasql');

var client = new Client();

// genera la conexión a la base de datos "proyectoSeguridad"
exports.connect = function() {
    client.connect({
        host: '127.0.0.1',
        user: 'root',
        password: 'H3rm3sSanch3z',
        db: 'proyectoSeguridad'
    });
    client.on('connect', function() { console.log('Client connected'); }
    ).on('error', function(err) { console.log('Client error: ' + err); }
    ).on('close', function(hadError) { console.log('Client closed'); });
}

// obtiene todos los elementos de la tabla "producto"
exports.db_get_listado = function(cb) {
    var data = [];
    client.query("SELECT id_producto, desc_producto, num_grupo FROM producto INNER JOIN grupo "+
                "ON producto.id_grupo = grupo.id_grupo ORDER BY id_producto;")
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

// inserta un nuevo producto en la tabla "producto"
exports.db_insertar = function(id_grupo, desc_producto, cb) {
    client.query("INSERT INTO producto (id_grupo, desc_producto) VALUES (?, ?);",[id_grupo, desc_producto])
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
    client.query("DELETE FROM producto WHERE id_producto = :var_id_producto;",
        {var_id_producto: id_producto})
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

exports.db_actualizar = function (id_grupo, desc_prod, cb){
    client.query("UPDATE producto SET id_grupo = ?, desc_producto= ? WHERE id_producto = ?;",[id_grupo, desc_producto, id_producto])
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