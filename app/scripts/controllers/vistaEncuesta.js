'use strict';

angular.module('proyectoSaludApp')
  .controller('VistaencuestaCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

      $scope.todo = function () {

        $http({
          method: 'GET',
          url: '/api/vistaEncuesta/obtenertodo'
        }).success(function(exito){

        }).error(function(err){

        });
      }
  });
