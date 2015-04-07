'use strict';

angular.module('proyectoSaludApp')
  .controller('ProductoCtrl', function ($scope, $http, MyAPIService){
    $http.get('/api/producto').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      $scope.dataGrupo = MyAPIService.query();
    })
//button.btn.btn-primary.btn-xs.pull-left(type="button", data-toggle="modal", data-target="#eliminarProductoModal")
      var removeTemplate =
//'<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="removeRow($index)"> ' +
'<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="removeIndex($index)"> ' +
'<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';

      $scope.seleccion = [];

    $scope.gridOptions = {
      data: 'awesomeThings',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      //showGroupPanel: true,
      showFooter: true,
      enableCellEdit: true,
      //showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      columnDefs: [
        {field: 'int_id', displayName: 'id', enableCellEdit: false},
        {field: 'Producto', displayName: 'Descripcion'},
        {field: 'Grupo', displayName: 'Grupo', enableCellEdit: false},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate , enableCellEdit: false}
    ]};


      //---------------------------------------------------------
        $scope.removeIndex = function(){
          $scope.objetoFila = this.row.rowIndex;
        }

        $scope.removeRow = function() {
          $scope.eliminarProducto($scope.seleccion[0].int_id);
          $scope.gridOptions.selectItem($scope.objetoFila, false);
          $scope.awesomeThings.splice($scope.objetoFila, 1);

        };
  //-------------------------------------
    $scope.mostrarModal = function() {
      $scope.nuevoProducto = {};
        ModalService.showModal({
          templateUrl: 'views/nuevoProducto.html',
          controller: "GrupoCtrl"
        }).then(function (modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            console.log(result);
            $scope.saveProducto(result._num_grupo, result._descripcion);
            $scope.update();
          });
        });
    };

      $scope.$on('ngGridEventEndCellEdit', function(evt){

      $scope.editarProducto(evt.targetScope.row.entity.id_producto, evt.targetScope.row.entity.desc_producto, evt.targetScope.row.entity.num_grupo);
      });

    $scope.editarProducto = function(id, descripcion, num_grupo){
      //----------AQUI VA UNA ADVERTENCIAS
      $http({
        method:'POST',
        url: '/api/producto/editar/',
        params:{
          _id: id,
          _descripcion: descripcion,
          _num_grupo: num_grupo
        }
      }).success(function(data){

      }).error(function(){
        console.log("Error en el controller producto !!!!");
      });
    };

    $scope.saveProducto = function (productoNumGrupo, productoDescripcion){
      $http({
        method: 'POST',
        url: '/api/producto/guardar',
        params:
        {
          _num_grupo: productoNumGrupo,
          _descripcion: productoDescripcion
        }
      }).success(function(data) {
        //aqui un mensaje
      }).error(function() {
        //aqui un mensaje
      });
    };

      //+++++++++++ELIMINA UN PRODUCTO+++++++++++++++
      $scope.eliminarProducto = function(_id){
        $http({
          method: 'POST',
          url: '/api/producto/eliminar',
          params: {
            _id: _id
          }
        }).
            success(function(data) {
              //$scope.mostrarProducto();
            }).
            error(function() {
              //$scope.mostrarProducto();
            });
      }

    //Funcion para traer los datos actualizados
    $scope.update = function(){
      $http.get('/api/producto').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    }

    $scope.tester = function(productoNuevo){
      console.log(productoNuevo);
    }
  });

//-------------------------------------------------------------------
angular.module('proyectoSaludApp')
    .factory('MyAPIService', function($resource) {
      return $resource('/api/grupo'); // Note the full endpoint address
    });

 /*
  .service('MyAPIService', function($http){
    var myData="viendo que pasa";

     return {
     getData: function(){

     $http.get('/api/grupo')
     .success(function(data, status, config, headers){
          myData = data;
         //return myData;
     })
     .error(function(){
     console.log("hay error en el service factory");//handler errors here
     });
     },
     data: function() { return myData; }
     };
  });
  */

//-----------MENSAJE DE CONFIRMACION-elimina un producto--------------
angular.module('proyectoSaludApp').controller('ConfirmacionCtrl', function($scope, close, _descripcion) {
  $scope._descripcion = _descripcion;
  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };
});
