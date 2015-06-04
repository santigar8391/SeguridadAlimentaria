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
}]);

