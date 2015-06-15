/**
 * Created by darioh on 06/04/15.
 */

proyectoSaludApp.factory('MyAPIServiceFactory', ["$http", function ($http) {
    return {
    get: function () {
      //var url = '/todos';
      return $http.get('/api/variable');
    },
    create: function (todo) {
      //var url = '/todos';
      //return $http.post(url, todo);
    },
    update: function (todo) {
      //var url = '/todos/' + todo.id;
      //return $http.put(url, todo);
    },
    delete: function(id) {
      //var url = '/todos/' + id;
      //return $http.delete(url);
    }
  };
}])

.service('loginService', function($http){

    var loginSvc = {};

    loginSvc.login = function(user){
        return $http({
            method: 'POST',
            skipAuthorization: true,
            url: '/api/login',
            data: user
            }).success(function(msg){
            alert('alert en el loginService'+msg.success);
        }).error(function (e) {
            alert(JSON.stringify(e.msg));
        });

    };
    return loginSvc;
})


.service('requestService', function($http){

    var requestSvc = {};

        requestSvc.info = function(){
        return $http({
            method: 'POST',
            skipAuthorization: false,
            url: '/api/producto/info'
        }).success(function(msg){
            alert('alert en el loginService'+msg.success);
        }).error(function (e) {
            alert(JSON.stringify(e.msg));
        });

    };
    return requestSvc;
})



.service('datosEncuestaPregunta', function(){

        var datosCompartir;
        var variablesCompartir;
        return {
            get: function (encuesta, variables) {
                datosCompartir = encuesta;
                variablesCompartir = variables;
            },
            out: function () {
                return datosCompartir;
            },
            out2: function () {
                return variablesCompartir;
            },
            delete: function(id) {
                //var url = '/todos/' + id;
                //return $http.delete(url);
            }
        };
})

.factory('authInterceptor', function($rootScope, $q, $localStorage){
       return {
          request: function(config){
            config.headers = config.headers || {};
              if($localStorage.token){
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
              }
            return config;
          },
           response: function(response){
            if(response.status == 401 || response.status === 403){
                alert('Usuario Fallo al autenticarse.');
                //$location.path('/signin');
            }
               return response || $q.when(response);
           }
       };
    });

