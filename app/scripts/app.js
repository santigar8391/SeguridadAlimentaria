'use strict';

var proyectoSaludApp = angular.module('proyectoSaludApp', [
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.selection',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngGrid',
  'angularModalService',
  'ui.tree',
  'xeditable',
  'angular-jwt'
])
  .config(function ($routeProvider, $httpProvider, jwtInterceptorProvider) {

      jwtInterceptorProvider.tokenGetter = function(){
        return window.localStorage.getItem('token');
      } ;

      $httpProvider.interceptors.push('jwtInterceptor');

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
      .when('/vistaEncuesta', {
        templateUrl: 'views/vistaEncuesta.html',
        controller: 'VistaencuestaCtrl'
      })
      .when('/error404', {
        templateUrl: 'views/error404.html',
        controller: 'Error404Ctrl'
      })
      .when('/encuesta', {
        templateUrl: 'views/encuesta.html',
        controller: 'EncuestaCtrl'
      })
      .when('/variable', {
        templateUrl: 'views/variable.html',
        controller: 'VariableCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
