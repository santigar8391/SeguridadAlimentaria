'use strict';

angular.module('proyectoSaludApp')
    .controller('PreguntaCtrl', function ($scope, $http) {
      $http.get('/api/awesomeThings').success(function(awesomeThings) {
        //$scope.data = awesomeThings;
      });
//Objeto de tipos posibles de respuestas.
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

//Variable para poder mostrar o esconder el div contenedor donde se ingresa la posible respuesta -
// (Se le quitaria porque no tiene ningun objeto por ahora)
      $scope.formVisibility=true;
//Funcion para testear los datos que obtenemos de la vista.
      $scope.tester = function(nuevaRespuesta){
        //console.log(nuevaRespuesta);
        //console.log($scope.respuesta);
        console.log($scope.data.length);
      };
//variable global contadora para obtener el id de la preguntar y poder referenciar de manera correcta a las respuestas.
      var contador = 2;

//Objeto [] para insertar las opciones respuesta
      var arrayRespuesta=[];
//Objeto que me permite visualizar las opciones de respuesta renderizadas en la vista antes de ingresar por completo en el array de preguntas aviles.
      //Esto se puede simplificar para no hacerle tanta vuelta pero por el momento esta bien no hace daño tampoco.
      $scope.arrayRespuesta1 = arrayRespuesta;

//Funcion que agrega todas las opciones posibles de respuesta en el arrayRespuesta para luego ingresarlo en el array de preguntas.
      $scope.addOpcionRespuesta = function(respuestaNueva){
        arrayRespuesta.push(
            {
              int_id_padre: contador,
              title: respuestaNueva.descripcionRespuesta,
              type: respuestaNueva.tipoRespuesta.type,
              nodes: []
            }
        );
      };
//Funcion que agrega la pregunta con sus respuestas.
      $scope.addPregunta = function(preguntaNueva){
        var arrayRespuestaLocal = arrayRespuesta; //array local donde se almacena las respuestas pre-insertadas --se lo puede quitar y hacerle directamente
        $scope.data.push(
            {
              id: contador,
              type: null,
              int_id_padre: null,
              title: preguntaNueva.descripcionPregunta,
              nodes: []
            }
        );

        arrayRespuestaLocal.forEach(function (respuesta) { //forEach que ingresa opcion de pregunta por odp porque no permitia asi no mas
          $scope.data[$scope.data.length-1].nodes.push(respuesta);
          });
        contador++; //aunmenta en 1 el contador para preparar la siguiente pregunta.
        arrayRespuesta.splice(0, arrayRespuesta.length); //Elimina todos las opciones de respuestas de la pregunta vigente para la nueva pregunta en cuestion.
      };
//Funcion que remueve una opcion de respuesta una vez en el array de las preguntas ya ingresadas.
      $scope.remove = function(scope) {
        console.log(scope.remove());
      };
//Funcion que no se que mismo!!!
      $scope.toggle = function(scope) {
        scope.toggle();
      };
//Funcion de mover un registro ultimo al inicio de todos los registros.
      $scope.moveLastToTheBegginig = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0,0, a);
      };
//Funcion que ingresa un nuevo registro --No se le usa.
      $scope.newItem = function (scope) {
        var nodeData = scope.$modelValue;
        alert(JSON.stringify(nodeData));
        $scope.data.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };
//Funcion que ingresa una nueva opcion de respuesta en la pregunta.
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
//Datos de pruebas iniciales.
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