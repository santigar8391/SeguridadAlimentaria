'use strict';

angular.module('proyectoSaludApp')
  .controller('ProductoCtrl', function ($scope, $http, ModalService){
    $http.get('/api/producto').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.gridOptions = {
      data: 'awesomeThings',
      enableRowSelection: true,
      showGroupPanel: true,
      //jqueryUITheme: true,
      showFooter: true,
      enableCellEdit: true,
      //enableCellEditOnFocus: true,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      jqueryUIDraggable: true,
      columnDefs: [
        {field: 'id_producto', displayName: 'Id', enableCellEdit: false},
        {field: 'desc_producto', displayName: 'Descripcion'},
        {field: 'num_grupo', displayName: 'Grupo', enableCellEdit: false}
    ]};

    $scope.mostrarModal = function() {
      $scope.nuevoProducto = {};
        ModalService.showModal({
          templateUrl: 'views/nuevoProducto.html',
          controller: "GrupoCtrl"
        }).then(function (modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            console.log(result);
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

    $scope.Save = function(){
      $http({
        method: 'POST',
        url: '/guardar/producto',
        params:
        {
          num_grupo: $scope.nnum_grupo,
          desc_producto: $scope.ndesc_producto
        }
      }).success(function(data) {
        //$scope.mostrarProducto();
      }).error(function() {
        $scope.mostrarProducto();
      });
      $scope.formVisibility=false;
      console.log($scope.formVisibility);
    };

  });

angular.module('proyectoSaludApp')
.controller('ModalController', function($scope, close) {
  $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
  };
    $scope.a = "aaa";
});
