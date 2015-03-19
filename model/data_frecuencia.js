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
};

// obtiene todos los elementos de la tabla "frecuencia"
exports.db_get_listado = function(cb) {
  var data = [];
  client.query("SELECT int_id, str_descripcion, flt_coeficiente FROM frecuencia ORDER BY flt_coeficiente desc;")
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
      console.log('Obtención de listado datos desde "data_frecuencia" CORRECTA');
    });
};

// inserta un nuevo producto en la tabla "frecuencia"
exports.db_insertar = function(str_descripcion, flt_coeficiente, cb) {
  client.query("INSERT INTO frecuencia (str_descripcion, flt_coeficiente) VALUES (?, ?);",[str_descripcion, flt_coeficiente])
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
      console.log('Inserción de datos desde "data_frecuencia" CORRECTA');
    });
};

// elimina un elemento de la tabla "frecuencia" de acuerdo a su "int_id"
exports.db_eliminar = function(int_id, cb) {
  client.query("DELETE FROM frecuencia WHERE int_id = :var_id;",
    {var_id: int_id})
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
      console.log('Eliminación de datos desde "data_frecuencia" CORRECTA');
    });
};

// obtiene un elemento de la tabla "frecuencia" a partir de "int_id"
exports.db_get_elemento_by_id = function(int_id, cb) {
  var data = [];
  client.query("SELECT int_id, str_descripcion, flt_coeficiente FROM frecuencia WHERE int_id = :var_id;",{var_id: int_id})
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
      console.log('Obtención de un elemento desde "data_frecuencia" CORRECTA');
    });
};

// actualiza todos los elementos de la tabla "frecuencia" a partir de "int_id"
exports.db_actualizar = function (var_id, var_descripcion, var_coeficiente, cb){
  console.log("--> Mirando lo ultimo!!--> "+id_grupo+ desc_prod +id_producto);
  client.query("UPDATE frecuencia SET str_descripcion = ?, flt_coeficiente = ? WHERE int_id = ?;"
    ,[var_descripcion, var_coeficiente, var_id])
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
      console.log('Actualización de datos desde "data_frecuencia" CORRECTA');
    });
};

// desconecta la base de datos
exports.disconnect = function() {
  client.end();
};
