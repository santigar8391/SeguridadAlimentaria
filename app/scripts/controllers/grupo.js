'use strict';

angular.module('proyectoSaludApp')
  .controller('GrupoCtrl', function ($scope, $http) {

    $http.get('/api/grupo').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
        $scope.nuevoProducto = awesomeThings[0].num_grupo;
        });
    //-------------------------------------------------------------
    $scope.close = function(result) {
      close(result, 500); // close, but give 500ms for bootstrap to animate
    };
  });
