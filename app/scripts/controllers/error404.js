'use strict';

angular.module('proyectoSaludApp')
  .controller('Error404Ctrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
