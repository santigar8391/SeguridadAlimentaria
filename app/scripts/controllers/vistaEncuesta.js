'use strict';

angular.module('proyectoSaludApp')
  .controller('VistaencuestaCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
