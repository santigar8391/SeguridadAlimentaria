'use strict';

angular.module('proyectoSaludApp')
  .controller('EncuestaCtrl', function($scope, $http, MyAPIServiceFactory, datosEncuestaPregunta) {
    $http.get('/api/encuesta').success(function(awesomeThings) {
      $scope.listadoEncuesta = awesomeThings;
        MyAPIServiceFactory.get().success(function(todos) {
            $scope.data = todos;
        }).error(function(error) {
            alert('Failed to load TODOs');
        });
        $scope.encuestaNueva.fechaCreacion = $scope.encuestaNueva.fechaModificacion = $scope.encuestaEditar.fechaModificacion = new Date();
    });

      //Template para visualizar los botones de editar y eliminar para cada registro de productos
      var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarEncuestaModal" ng-click="indexProductoEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarEncuestaModal" ng-click="indexProducto($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';

    //Este array contiene productos que han sido seleccionados con click en la fila de la tabla con ng-grid de productos en la vista
      $scope.seleccion = [];
    //Este es un objeto con campos necesarios para recoger los datos a ser editados y se modificaran a medida que los editen.
        //(Se utilizara en la funcion edicion!)
      $scope.encuestaEditar =
      {
          id: '',
          titulo: '',
          descripcion: '',
          objetivo: '',
          destinadoA: '',
          instrucciones: '',
          fechaCreacion: '',
          fechaModificacion: '',
          estado: ''
      };

        $scope.encuestaNueva = {
            "fechaCreacion": null,
            "fechaModificacion": null
        };


//Este es un conjunto de parametros de comportamiento del ng-grid
    $scope.gridOptions = {
      data: 'listadoEncuesta',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      enableCellSelection: false,
      showGroupPanel: false,
      showFooter: true,
      enableCellEdit: false,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: false,
      enableRowReordering: false,
      multiSelect: false,
      afterSelectionChange: function (theRow, evt) {
          console.log('id desde afterSelectionChange: '+theRow.entity.int_id);
            $scope.encuestaEditar.id = theRow.entity.int_id,
      		$scope.encuestaEditar.titulo = theRow.entity.str_titulo,
		    $scope.encuestaEditar.descripcion = theRow.entity.str_descripcion,
		    $scope.encuestaEditar.objetivo = theRow.entity.str_objetivo,
		    $scope.encuestaEditar.destinadoA = theRow.entity.str_destinado_a,
		    $scope.encuestaEditar.instrucciones = theRow.entity.str_instrucciones,
		    $scope.encuestaEditar.fechaCreacion = theRow.entity.dt_fecha_creacion,
		    $scope.encuestaEditar.fechaModificacion = theRow.entity.dt_fecha_modificacion,
		    $scope.encuestaEditar.estado = theRow.entity.str_estado
        },

      columnDefs: [
        {field: 'int_id', displayName: 'Id', width: '2%', pinnable: 'false'},
        {field: 'str_titulo', displayName: 'Titulo', width: '10%'},
        {field: 'str_objetivo', displayName: 'objetivo', width: '7%'},
        {field: 'str_destinado_a', displayName: 'Destinado a', width: '7%'},
        {field: 'dt_fecha_creacion', displayName: 'Fecha de creación', width: '4%'},
        {field: 'str_descripcion', displayName: 'Descripcion', width: '38%', visible: false},
        {field: 'str_instrucciones', displayName: 'Instrucciones', width: '10%', visible: false},
        {field: 'dt_fecha_modificacion', displayName: 'Fecha modificacion', width: '11%', visible: false},
        {field: 'str_estado', displayName: 'Estado', width: '4%'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate, width: '4%'}
    ]};

      //Funcion que permite identificar la fila que esta siendo afectada con un click (en la fila o el boton del trash) para la eliminacion
      // Su index dentro de la tabla del ng-grid en la vista
        $scope.indexProducto = function(){
          $scope.objetoFila = this.row.rowIndex;
            console.log($scope.seleccion);
        };

        //Funcion que permite identificar la fila que esta siendo afectada con un click (en la fila o el boton del edit) para la eliminacion
        // Su index dentro de la tabla del ng-grid en la vista
      $scope.indexProductoEditar = function(){
          $scope.objetoFila = this.row.rowIndex;
          console.log($scope.seleccion[0]);
      };

        //Funcion intermedia que elimina en la vista la fila y llama tambien a la funcion eliminarProducto() que elimina de la base de datos
        //de forma logica.
        $scope.removeRow = function() {
          $scope.eliminarProducto($scope.seleccion[0].int_id);
          $scope.gridOptions.selectItem($scope.objetoFila, false);
          $scope.awesomeThings.splice($scope.objetoFila, 1);

        };
  //--------------ngGridEventEndCellEdit-----------------------
/*
      $scope.$on('ngGridEventEndCellEdit', function(evt){
      $scope.editarProducto(evt.targetScope.row.entity.id_producto, evt.targetScope.row.entity.desc_producto, evt.targetScope.row.entity.num_grupo);
      });

*/
    var idVariableEliminar = [];


    var loopEliminar = function(currentNode){
        var i, currentChild;
        // Use a for loop instead of forEach to avoid nested functions
        // Otherwise "return" will not work properly
        for (i = 0; i < currentNode.nodes.length; i += 1) {
            currentChild = currentNode.nodes[i];
            idVariableEliminar.push(currentChild.id);
            // Search in the current child
            loopEliminar(currentChild);
        }
    };


    $scope.dataTwo = [];

    $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        console.log(nodeData);
        $scope.dataTwo.push(nodeData);
        idVariableEliminar.push(nodeData.id);
        loopEliminar(nodeData);
        console.log(idVariableEliminar);
    };

    $scope.remove = function(scope) {
        var nodeData = scope.$modelValue;
        console.log(nodeData);
        scope.remove();
    };
//-----------------------------------------------------------
    //Funcion que prepara las cabeceras con los parametros del producto nuevo y luego las envia a guardar
    // (Contiene la funcion de update() para actualizar los datos de la vista)
    $scope.guardar = function (encuestaNueva){

        $http({
        method: 'POST',
        url: '/api/encuesta/guardar',
        params:
        {
		    titulo: encuestaNueva.titulo,
		    descripcion: encuestaNueva.descripcion,
		    objetivo: encuestaNueva.objetivo,
		    destinadoA: encuestaNueva.destinadoA,
		    instrucciones: encuestaNueva.instrucciones,
		    fechaCreacion: encuestaNueva.fechaCreacion,
		    fechaModificacion: encuestaNueva.fechaModificacion,
		    estado: encuestaNueva.estado
        }
      }).success(function(data) {
            $scope.update();
      }).error(function() {
        alert('Error al guardar encuestaNueva');
      });
    };

    //Funcion que prepara las cabeceras con los parametros del producto editado y luego las envia a editar
    // (Contiene la funcion de update() para actualizar los datos de la vista)
    $scope.editar = function(encuestaEditar){
      $http({
        method:'POST',
        url: '/api/encuesta/editar/',
        params:{
        	id: encuestaEditar.id,
          	titulo: encuestaEditar.titulo,
		    descripcion: encuestaEditar.descripcion,
		    objetivo: encuestaEditar.objetivo,
		    destinadoA: encuestaEditar.destinadoA,
		    instrucciones: encuestaEditar.instrucciones,
		    fechaCreacion: encuestaEditar.fechaCreacion,
		    fechaModificacion: encuestaEditar.fechaModificacion,
		    estado: encuestaEditar.estado
        }
      }).success(function(data){
          $scope.update();
      }).error(function(){
        alert("Error al editar encuesta");
      });
    };
//-----------------------------------------------------------
/*
    $scope.agregarItem = function(productoNuevo) {
        $scope.awesomeThings.push({int_id:"0", Producto:
            productoNuevo.descripcion, Grupo:productoNuevo.numGrupo.title, Unidad_medida:
            productoNuevo.numUnidad.str_descripcion, flt_min:productoNuevo.numMinimo, flt_max:productoNuevo.numMaximo});
    };
*/

  //Funcion que prepara las cabeceras con los parametros del producto a ser eliminado y luego las envia a eliminar de forma logica
  $scope.eliminar = function(_id){
    $http({
      method: 'POST',
      url: '/api/encuesta/eliminar',
      params: {
        id:_id
      }
    }).
        success(function(data) {
        	$scope.update();
        }).
        error(function() {

        });
  };

    //Funcion para traer los datos actualizados
    $scope.update = function(){
      $http.get('/api/encuesta').success(function(awesomeThings) {
        $scope.listadoEncuesta = awesomeThings;
      });
    };

    //Funcion para testear los datos posibles enviados desde la vista
    $scope.tester = function(productoNuevo){
        console.log(productoNuevo);
        datosEncuestaPregunta.get(productoNuevo, $scope.dataTwo);
    }

  });



exports.db_insertar = function(equiposObj, cb) {

  for(var i=equiposObj.length - 1; i>=0; i--){
    if(equiposObj[i].respuesta == true){
      client.query("INSERT INTO equipos (nombre_eq, num_jugadores,grupo) VALUES (?, ?, ?);",
        [equiposObj.nombre_eq, equiposObj.num_jugadores,equiposObj.grupo])
        .on('error', function(err) {
          console.log('Result error: ' + inspect(err));
        })
        .on('end', function() {
          console.log('Result finished successfully');
          cb(true);
          console.log('LOS DATOS SE HAN INSERTADO CORRECTAMENTE');
        });
    }
  }
  
};