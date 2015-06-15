'use strict';

angular.module('proyectoSaludApp')
  .controller('LoginCtrl', function ($scope, $http, $location, $localStorage, loginService) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

      $scope.login = function(user){
        var user1 = JSON.stringify(user);
        loginService.login(user1).then(function(result){
          alert(JSON.stringify('En el LoginCtrl result sin data '+ result.data.token + 'con STRINGIFY' +JSON.stringify(result)));
          $localStorage.token = result.data.token;
          alert('POSIBLE ALMACENAMIENTO DEL TOKEN EN EL CONTROLER LoginCtrl/$scope.login ==' + $localStorage.token);
          $location.path('/');
        });
      };
  });
