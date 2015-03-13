'use strict';

angular.module('proyectoSaludApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngGrid',
  'angularModalService'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/producto', {
        templateUrl: 'views/producto.html',
        controller: 'ProductoCtrl'
      })
      .when('/grupo', {
        templateUrl: 'views/grupo.html',
        controller: 'GrupoCtrl'
      })
      .when('/frecuencia', {
        templateUrl: 'views/frecuencia.html',
        controller: 'FrecuenciaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
