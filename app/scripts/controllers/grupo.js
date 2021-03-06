'use strict';

angular.module('proyectoSaludApp')
    .controller('GrupoCtrl', function ($scope, $http){

      $http.get('/api/grupo').success(function(awesomeThings) {
        $scope.data = awesomeThings;
        $scope.nuevoProductoNumGrupo = awesomeThings[0].int_id;
      });

      //-----------------------------------------------------------
      //Funcion que prepara las cabeceras con los parametros del producto nuevo y luego las envia a guardar
      // (Contiene la funcion de update() para actualizar los datos de la vista)
      $scope.guardar = function (grupoNuevo){
        $http({
          method: 'POST',
          url: '/api/grupo/guardar',
          params:
          {
            _id_padre: 'NULL',
            _descripcion: grupoNuevo.descripcionGrupo
          }
        }).success(function(data) {
          //aqui un mensaje
          $scope.update();
        }).error(function() {
          //aqui un mensaje
        });
      };

      $scope.nuevoGrupo = {
        id_padre: '',
        descripcionPadre: ''
      };
//-----------------------------------------------------------
      $scope.update = function(){
        $http.get('/api/grupo').success(function(awesomeThings) {
          $scope.data = awesomeThings;
        });
      };
//Funcion Guardar Subgrupo : Declaracion de un objeto nuevoSubGrupo para recoger y predisponer del id padre y title en el modal.
      $scope.guardarSubGrupo = function(nuevoSubGrupo){

        $http({
          method: 'POST',
          url: '/api/grupo/guardar',
          params:
          {
            _id_padre:nuevoSubGrupo.id_padre,
            _descripcion: nuevoSubGrupo.descripcionSubGrupo
          }
        }).success(function(data) {
          //aqui un mensaje
          $scope.update();
        }).error(function() {
          //aqui un mensaje
        });
      };

      $scope.nuevoSubGrupo = {
        id_padre: '',
        descripcionPadre: ''
      };

      $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        $scope.nuevoSubGrupo.id_padre=nodeData.id;
        $scope.nuevoSubGrupo.descripcionPadre=nodeData.title;
        console.log($scope.nuevoSubGrupo);
      };
//--------------------------------------------------------------------------------
      $scope.confirmacion = null;

      $scope.remove = function(scope) {
        var nodeData = scope.$modelValue;
        console.log(nodeData);
        scope.remove();
      };

      $scope.remove2 = function(scope) {
        var nodeData = scope.$modelValue;
        console.log(nodeData);
      };

//--------------------------------------------------------------------------------
      $scope.toggle = function(scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBegginig = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
      };
      /*
       $scope.newItem = function (scope) {
       var nodeData = scope.$modelValue;
       alert(JSON.stringify(nodeData));
       $scope.data.push({
       id: nodeData.id * 10 + nodeData.nodes.length,
       title: nodeData.title + '.' + (nodeData.nodes.length + 1),
       nodes: []
       });
       };
       */



      var getRootNodesScope = function() {
        return angular.element(document.getElementById("tree-root")).scope();
      };

      $scope.collapseAll = function() {
        var scope = getRootNodesScope();
        scope.collapseAll();
      };

      $scope.expandAll = function() {
        var scope = getRootNodesScope();
        scope.expandAll();
      };

    });

