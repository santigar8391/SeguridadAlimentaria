'use strict';

angular.module('proyectoSaludApp')
    .controller('PreguntaCtrl', function ($scope, $http) {

      $http.get('/api/awesomeThings').success(function(awesomeThings) {
        //$scope.data = awesomeThings;
      });

      $scope.objTipoPregunta = [
        {
          id:0,
          type: "checkbox"
        },
        {
          id:1,
          type: "radio"
        },
        {
          id:2,
          type: "text"
        }
      ];

      //++++++++++++++++++++++++++++++++++++++++++++++
      $scope.formVisibility=true;
      //++++++++++++++++++++++++++++++++++++++++++++++
      /*        $scope.ShowForm=function(){
       $scope.formVisibility=true;
       $scope.nnum_grupo = $scope.datoCicloGrupo[0].desc_grupo;
       }
       $scope.opciones = function(nuevaPregunta){
       if(nuevaPregunta.tipoPregunta.id == 0 || nuevaPregunta.tipoPregunta.id == 1 || nuevaPregunta.tipoPregunta.id == 2){
       $scope.formVisibility=true;
       }
       };*/
      //++++++++++++++++++++++++++++++++++++++++++++++
      (function () {
        //console.log(pregunta.descripcionPregunta);
      }());


      var contador = 2;

      $scope.addPregunta = function(preguntaNueva){
        $scope.data.push(
            {
              "id": contador,
              type: null,
              "int_id_padre": null,
              "flt_numero": "1",
              "title": preguntaNueva.descripcionPregunta,
              "nodes": [
                {
                  "id": "1.1",
                  type: preguntaNueva.tipoPregunta.type,
                  "int_id_padre": contador,
                  "flt_numero": "3",
                  "title": preguntaNueva.descripcionPreguntaRespuesta,
                  "nodes": []
                }
              ]
            }
        );
        contador++;
      };

      $scope.remove = function(scope) {
        console.log(scope.remove());
      };

      $scope.toggle = function(scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBegginig = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
      };

      $scope.newItem = function (scope) {
        var nodeData = scope.$modelValue;
        alert(JSON.stringify(nodeData));
        $scope.data.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          //id: nodeData.id * 10 + nodeData.nodes.length,
          //title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          //nodes: [],
          id: nodeData.id.length+1,
          type: nodeData.nodes[0].type,
          int_id_padre: nodeData.id,
          flt_numero: "3",
          title: "respuesta 1.1",
          nodes: []
        });
        console.log(nodeData);
      };

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

      $scope.data = [
        {
          "id": "1",
          type: null,
          "int_id_padre": null,
          "flt_numero": "1",
          "title": "Pregunta 1?",
          "nodes": [
            {
              "id": "1.1",
              type: "checkbox",
              "int_id_padre": "1",
              "flt_numero": "3",
              "title": "respuesta 1.1",
              "nodes": []
            }
          ]
        }
      ]
    });