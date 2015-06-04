'use strict';

angular.module('proyectoSaludApp')
  .controller('VariableCtrl', function ($scope, $http) {
    $http.get('/api/variable').success(function(awesomeThings) {
      $scope.data = awesomeThings;
    });

      //-----------------------------------------------------------
      //Funcion que prepara las cabeceras con los parametros del producto nuevo y luego las envia a guardar
      // (Contiene la funcion de update() para actualizar los datos de la vista)
      $scope.guardar = function (variableNueva){
        $http({
          method: 'POST',
          url: '/api/variable/guardar',
          params:
          {
            _id_padre: 'NULL',
            _descripcion: variableNueva.descripcion
          }
        }).success(function(data) {
          //aqui un mensaje
          $scope.update();
        }).error(function() {
          //aqui un mensaje
        });
      };

//-----------------------------------------------------------
      $scope.update = function(){
        $http.get('/api/variable').success(function(awesomeThings) {
          $scope.data = awesomeThings;
        });
      };
//Funcion Guardar Subgrupo : Declaracion de un objeto nuevoSubGrupo para recoger y predisponer del id padre y title en el modal.
      $scope.guardarSubVariable = function(nuevaSubVariable){

        $http({
          method: 'POST',
          url: '/api/variable/guardar',
          params:
          {
            _id_padre: nuevaSubVariable.id_padre,
            _descripcion: nuevaSubVariable.descripcion
          }
        }).success(function(data) {
          //aqui un mensaje
          $scope.update();
        }).error(function() {
          //aqui un mensaje
        });
      };


      $scope.eliminar = function (){
        $http({
          method: 'POST',
          url: '/api/variable/eliminar',
          params:
          {
            variable: idVariableEliminar
          }
        }).success(function(data) {
          //aqui un mensaje
          //$scope.update();
          alert('Exito al eliminar el reggistro');
        }).error(function() {
          alert('Error al eliminar el reggistro');
          //aqui un mensaje
        });
      };


      $scope.nuevaSubVariable = {
        id_padre: '',
        descripcionPadre: ''
      };

      $scope.variableEliminar = {};

      $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        $scope.nuevaSubVariable.id_padre=nodeData.id;
        $scope.nuevaSubVariable.descripcionPadre=nodeData.title;
        console.log($scope.nuevaSubVariable);
      };
//--------------------------------------------------------------------------------
      $scope.confirmacion = null;

      $scope.remove = function(scope) {
        var nodeData = scope.$modelValue;
        console.log(nodeData);
        scope.remove();
      };

      var idVariableEliminar = [];

      $scope.remove2 = function(scope) {
        var nodeData = scope.$modelValue;
        $scope.variableEliminar = nodeData;
        idVariableEliminar.push($scope.variableEliminar.id);
        loopEliminar($scope.variableEliminar);
      };



      var loopEliminar = function(currentNode){
        var i,
            currentChild;
          // Use a for loop instead of forEach to avoid nested functions
          // Otherwise "return" will not work properly
          for (i = 0; i < currentNode.nodes.length; i += 1) {
            currentChild = currentNode.nodes[i];
            idVariableEliminar.push(currentChild.id);
            // Search in the current child
            loopEliminar(currentChild);
        }
      };

      $scope.tester = function(){
        console.log(idVariableEliminar);
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