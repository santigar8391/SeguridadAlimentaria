'use strict';

angular.module('proyectoSaludApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngGrid',
  'angularModalService',
  'ui.tree',
  'xeditable'
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
      .when('/unidad',{
        templateUrl: 'views/unidad.html',
        controller: 'UnidadCtrl'
      })
      .when('/pregunta', {
        templateUrl: 'views/pregunta.html',
        controller: 'PreguntaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
