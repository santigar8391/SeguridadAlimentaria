'use strict';

angular.module('proyectoSaludApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    var baseUrl ="http://lorempixel.com/1350/450";

    $scope.slider = [
      {
        title: "Lorem ipsum dolor sit amet consectetur&mldr",
        image: baseUrl+"/nature/"
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur&mldr",
        image: baseUrl+"/food/"
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur&mldr",
        image: baseUrl+"/sports/"
      }
    ];

  });
