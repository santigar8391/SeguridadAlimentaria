/**
 * Created by darioh on 06/04/15.
 */
'use strict';
angular.module('proyectoSaludApp')
  .service('MyAPIService', function($http){
    var myData;

    return {
      getData: function(){

        $http.get('/api/grupo')
          .success(function(data, status, config, headers){
            myData = data;
          })
          .error(function(){
          console.log("hay error en el service factory");//handler errors here
          });
      },
      data: function() { return myData; }
    };

  });

