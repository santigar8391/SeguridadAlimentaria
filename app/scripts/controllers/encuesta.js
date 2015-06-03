'use strict';

angular.module('proyectoSaludApp')
  .controller('EncuestaCtrl', function ($scope, $http) {
    $http.get('/api/encuesta').success(function(awesomeThings) {
      $scope.listadoEncuesta = awesomeThings;
      console.log(awesomeThings);
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

//Este es un conjunto de parametros de comportamiento del ng-grid
    $scope.gridOptions = {
      data: 'listadoEncuesta',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      enableCellSelection: false,
      showGroupPanel: false,
      showFooter: true,
      enableCellEdit: false,
      showSelectionCheckbox: false,
      enableColumnResize: true,
      enableColumnReordering: false,
      enableRowReordering: false,
      multiSelect: false,
      enableHighlighting: true,
      noKeyboardNavigation: true,
      virtualizationThreshold: 50,
      afterSelectionChange: function (theRow, evt) {
          console.log('id desde afterSelectionChange: '+theRow.entity.int_id);
            $scope.encuestaEditar.id = parseInt(theRow.entity.int_id),
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
        {field: 'int_id', displayName: 'Id', width: '20%', pinnable: 'false'},
        {field: 'str_titulo', displayName: 'Titulo', width: '38%'},
        {field: 'str_objetivo', displayName: 'objetivo', width: '10%'},
        {field: 'str_destinado_a', displayName: 'Destinado a', width: '11%'},
        {field: 'dt_fecha_creacion', displayName: 'Fecha de creación', width: '11%'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate, width: '10%'}
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
    }

  });

