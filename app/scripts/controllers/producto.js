'use strict';

angular.module('proyectoSaludApp')
  .controller('ProductoCtrl', function ($scope, $http, ModalService){
    $http.get('/api/producto').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

      var removeTemplate = '<button type="submit" class="btn btn-default btn-sm" ng-click="removeRow($index)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';
      $scope.seleccion = [];

    $scope.gridOptions = {
      data: 'awesomeThings',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      showGroupPanel: true,
      showFooter: true,
      enableCellEdit: true,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      columnDefs: [
        {field: 'id_producto', displayName: 'id', enableCellEdit: false},
        {field: 'desc_producto', displayName: 'Descripcion'},
        {field: 'num_grupo', displayName: 'Grupo', enableCellEdit: false},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate , enableCellEdit: false}
    ]};


      //---------------------------------------------------------
      $scope.removeRow = function(index) {
        ModalService.showModal({
          templateUrl: 'views/confirmacionTemplate.html',
          controller: "ConfirmacionCtrl",
          inputs:{
            _descripcion: "ID: " + $scope.seleccion[0].id_producto + " -  Descripcion: " + $scope.seleccion[0].desc_producto
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            //$scope.message = "You said " + result;
            if(result=='Si'){
                $scope.eliminarProducto($scope.seleccion[0].id_producto);
            }
            if(result=='No'){
              alert("NO elimina!!")
            }

          });
        });
      };
      //-----------------------------------------------------------

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
  });


//-----------MENSAJE DE CONFIRMACION-elimina un producto--------------
angular.module('proyectoSaludApp').controller('ConfirmacionCtrl', function($scope, close, _descripcion) {
  $scope._descripcion = _descripcion;
  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };
});
