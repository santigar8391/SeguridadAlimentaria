'use strict';

angular.module('proyectoSaludApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    var baseUrl ="http://lorempixel.com/1350/450";

    $scope.slider = [
      {
        title: "Naturaleza",
        image: baseUrl+"/nature/"
      },
      {
        title: "Buena Alimentacion",
        image: baseUrl+"/food/"
      },
      {
        title: "Deporte es vida",
        image: baseUrl+"/sports/"
      }
    ];

  });
