'use strict';

angular.module('proyectoSaludApp')
  .controller('GrupoCtrl', function ($scope, $http, _num_grupo, _descripcion, close){//, close){//, instance) {

    $http.get('/api/grupo').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
        $scope.nuevoProductoNumGrupo = awesomeThings[0].num_grupo;
        });

    //-------------------------------------------------------------
    /*$scope.close = function(result) {
      close(result, 500); // close, but give 500ms for bootstrap to animate
    };
*/
    $scope.guardarProducto = function () {

      $scope._num_grupo = $scope.nuevoProductoDescripcion;
      $scope._descripcion = $scope.nuevoProductoNumGrupo;
      close("Cerrar", 500);
    }

  });
