'use strict';

angular.module('proyectoSaludApp')
  .controller('FrecuenciaCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
