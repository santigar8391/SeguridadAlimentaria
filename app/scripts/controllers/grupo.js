'use strict';

angular.module('proyectoSaludApp')
  .controller('GrupoCtrl', function ($scope, $http, close){// close){

    $http.get('/api/grupo').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
        $scope.nuevoProductoNumGrupo = awesomeThings[0].num_grupo;
        });
//-----------------GUARDAR PRODUCTO------------------------

    $scope.guardarProducto = function () {
        close({_num_grupo: $scope.nuevoProductoNumGrupo, _descripcion: $scope.nuevoProductoDescripcion}, 500);
    }
//----------------------------------------------------------

  });
