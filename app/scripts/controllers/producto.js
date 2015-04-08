'use strict';

angular.module('proyectoSaludApp')
  .controller('ProductoCtrl', function ($scope, $http, MyAPIService, MyAPIServiceUnidad){
    $http.get('/api/producto').success(function(awesomeThings) {
      //Obtenemos todos los productos
        $scope.awesomeThings = awesomeThings;
      //Datos de todos los grupos
        $scope.dataGrupo = MyAPIService.query();
      //Datos de todas las unidades de medida
        $scope.dataUnidad = MyAPIServiceUnidad.query();
    });
        //Template para visualizar los botones de editar y eliminar para cada registro de productos
      var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarProductoModal" ng-click="indexProductoEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="indexProducto($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';

    //Este array contiene productos que han sido seleccionados con click en la fila de la tabla con ng-grid de productos en la vista
      $scope.seleccion = [];
    //Este es un objeto con campos necesarios para recoger los datos a ser editados y se modificaran a medida que los editen.
        //(Se utilizara en la funcion edicion!)
      $scope.editarproducto =
      {
          int_id: "",
          descripcion: "",
          numGrupo: "",
          numUnidad: "",
          numMinimo: "",
          numMaximo: ""
      };

    //Este es un conjunto de parametros de comportamiento del ng-grid
    $scope.gridOptions = {
      data: 'awesomeThings',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      //showGroupPanel: true,
      showFooter: true,
      //enableCellEdit: true,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      afterSelectionChange: function (theRow, evt) {
          $scope.editarproducto.int_id = parseInt(theRow.entity.int_id);
          $scope.editarproducto.descripcion = theRow.entity.Producto;
          $scope.editarproducto.numGrupo = theRow.entity.Grupo;
          $scope.editarproducto.numMinimo = parseFloat(theRow.entity.flt_min);
          $scope.editarproducto.numMaximo = parseFloat(theRow.entity.flt_max);
          $scope.editarproducto.numUnidad = theRow.entity.Unidad_medida;
        },
      columnDefs: [
//        {field: 'int_id', displayName: 'Id'},
        {field: 'Producto', displayName: 'Descripcion'},
        {field: 'Grupo', displayName: 'Grupo'},
        {field: 'Unidad_medida', displayName: 'Medida'},
        {field: 'flt_min', displayName: 'Valor minimo'},
        {field: 'flt_max', displayName: 'Valor máximo'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate}
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
    //Funcion que prepara las cabeceras con los parametros del producto editado y luego las envia a editar
    // (Contiene la funcion de update() para actualizar los datos de la vista)
    $scope.editar = function(productoEditar){
      $http({
        method:'POST',
        url: '/api/producto/editar/',
        params:{
          _id: productoEditar.int_id,
        _descripcion: productoEditar.descripcion,
        _num_grupo: productoEditar.numGrupo.id,
        _num_unidad: productoEditar.numUnidad.int_id,
        _flt_min: productoEditar.numMinimo,
        _flt_max:productoEditar.numMaximo
        }
      }).success(function(data){
          $scope.update();
      }).error(function(){
        console.log("Error en el controller producto !!!!");
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
//-----------------------------------------------------------
    //Funcion que prepara las cabeceras con los parametros del producto nuevo y luego las envia a guardar
    // (Contiene la funcion de update() para actualizar los datos de la vista)
    $scope.guardar = function (productoNuevo){
        $http({
        method: 'POST',
        url: '/api/producto/guardar',
        params:
        {
          _descripcion: productoNuevo.descripcion,
          _num_grupo: productoNuevo.numGrupo.id,
          _num_unidad: productoNuevo.numUnidad.int_id,
          _flt_min: productoNuevo.numMinimo,
          _flt_max:productoNuevo.numMaximo
        }
      }).success(function(data) {
        //aqui un mensaje
            $scope.update();
      }).error(function() {
        //aqui un mensaje
      });
    };

  //Funcion que prepara las cabeceras con los parametros del producto a ser eliminado y luego las envia a eliminar de forma logica
  $scope.eliminarProducto = function(_id){
    $http({
      method: 'POST',
      url: '/api/producto/eliminar',
      params: {
        _id: _id
      }
    }).
        success(function(data) {

        }).
        error(function() {

        });
  };

    //Funcion para traer los datos actualizados
    $scope.update = function(){
      $http.get('/api/producto').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    };

    //Funcion para testear los datos posibles enviados desde la vista
    $scope.tester = function(productoNuevo){
      console.log(productoNuevo);
    }
  });

//Servicios Factory que devuelve datos necesarios para el ingreso y edicion de los productos.
// Este retorna valores de: -->

//MyAPIService--> valores de todos los grupos
angular.module('proyectoSaludApp')
    .factory('MyAPIService', function($resource) {
      return $resource('/api/grupoPuro');
    });

//MyAPIServiceUnidad--> valores de todas las unidades.
angular.module('proyectoSaludApp')
    .factory('MyAPIServiceUnidad', function($resource) {
        return $resource('/api/unidad');
    });