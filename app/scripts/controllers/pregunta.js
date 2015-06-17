'use strict';

angular.module('proyectoSaludApp')
    .controller('PreguntaCtrl', function ($scope, $http, MyAPIServiceFactory, datosEncuestaPregunta) {
      $http.get('/api/awesomeThings').success(function(awesomeThings) {
        //$scope.datos = awesomeThings;
        /*
        MyAPIServiceFactory.get().success(function(todos) {
          $scope.dataNav = todos;
        }).error(function(error) {
          alert('Failed to load TODOs');
        });
        */
        $scope.encuesta = datosEncuestaPregunta.out();
        $scope.dataNav = datosEncuestaPregunta.out2();
      });

    //UBICACION DE COLUMNAS
      $scope.columnas = [
        {field: 'id', displayName: 'Id'},
        {field: 'name', displayName: 'Name'}
      ];
    //GRID-DATA
      $scope.gridData =[
        {id:1, name:'a'},
        {id:2, name:'b'},
        {id:3, name:'c'},
        {id:4, name:'d'},
        {id:5, name:'e'},
        {id:6, name:'f'},
        {id:7, name:'g'}
      ];

        $scope.rango = {
            "minimo": 1,
            "maximo": 5,
            "valorSeleccionado": 1
        };


    //GRIDOPTIONS CONFIGURACION
      $scope.gridOptions = {
        data: $scope.gridData,
        enableSorting: false,
        columnDefs: $scope.columnas,
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
        }
      };

                                                                                $scope.addColumna = function(){
                                                                                  $scope.columnas.push({
                                                                                    field: 'Genero', displayName: 'Genero+'
                                                                                  });
                                                                                };


      $scope.respuesta = {
        tipoRespuesta: ""
      };
      $scope.respuesta.correcta = "";


                                                                    //Objeto de tipos posibles de respuestas.
                                                                          $scope.objTipoPregunta = [
                                                                            {
                                                                              value:1,
                                                                              type: "checkbox"
                                                                            },
                                                                            {
                                                                              value:2,
                                                                              type: "radio"
                                                                            },
                                                                            {
                                                                              value:3,
                                                                              type: "text"
                                                                            },
                                                                            {
                                                                              value:4,
                                                                              type: "range"
                                                                            },
                                                                          {
                                                                              value:5,
                                                                              type: "date"
                                                                          },
                                                                          {
                                                                              value:6,
                                                                              type: "time"
                                                                          },
                                                                          {
                                                                              value:7,
                                                                              type: "Matriz"
                                                                          }
                                                                          ];

//Objeto tipo respuesta
      $scope.pregunta = {

      };

//Variable para poder mostrar o esconder el div contenedor donde se ingresa la posible respuesta -
// (Se le quitaria porque no tiene ningun objeto por ahora)
      $scope.formVisibility=true;
      $scope.variableSeleccionada = 0;
                                                              //Funcion para testear los datos que obtenemos de la vista.
                                                                    $scope.tester = function(scope){
                                                                      $scope.variableSeleccionada = scope.id;
                                                                      $scope.arrayRespuesta1[0].section = scope.id;
                                                                    };
                                                              //variable global contadora para obtener el id de la preguntar y poder referenciar de manera correcta a las respuestas.
                                                                                var contador = 1;
                                                                                var numEscala = 1;
                                                                                var numId = 1;
                                                                                var numIdPregunta = 1;

//Objeto [] para insertar las opciones respuesta
      $scope.arrayRespuesta1 = [
        {
          int_id_padre: contador,
          title: "",
          title2: "",
          type: $scope.respuesta.tipoRespuesta.type,
          numEscala:numEscala++,
          numId:numId++,
          valor: false,
          section: $scope.variableSeleccionada,
          nodes: []
        }
      ];
//Objeto que me permite visualizar las opciones de respuesta renderizadas en la vista antes de ingresar por completo en el array de preguntas aviles.
      //Esto se puede simplificar para no hacerle tanta vuelta pero por el momento esta bien no hace daño tampoco.
      //$scope.arrayRespuesta1 = arrayRespuesta;
                                                          //-----------------------------------------------------------
                                                                $scope.tabularValido = function(data){
                                                                  var numTabular = parseInt(data);
                                                                  for(var i=$scope.arrayRespuesta1.length - 1; i>=0; i--){
                                                                    if(numTabular == $scope.arrayRespuesta1[i].numEscala){
                                                                      return "Tabular duplicado. No valido!";
                                                                    }
                                                                  }
                                                                };
//-----------------------------------------------------------
//Funcion que agrega todas las opciones posibles de respuesta en el arrayRespuesta para luego ingresarlo en el array de preguntas.
      $scope.addOpcionRespuesta = function(respuestaNueva){
        $scope.arrayRespuesta1.push(
            {
              int_id_padre: contador,
              title: respuestaNueva.descripcionRespuesta,
              title2: "",
              type: respuestaNueva.tipoRespuesta.type,
              numEscala:numEscala++,
              numId:numId++,
              valor: false,
              section: $scope.variableSeleccionada,
              nodes: []
            }
        );
      };
                                                  //Funcion que agrega la pregunta con sus respuestas.
                                                        $scope.addPregunta = function(preguntaNueva){
                                                          var arrayRespuestaLocal = $scope.arrayRespuesta1; //array local donde se almacena las respuestas pre-insertadas --se lo puede quitar y hacerle directamente
                                                          $scope.data.push(
                                                              {
                                                                id_encuesta: $scope.encuesta.int_id,
                                                                id_pregunta: contador,
                                                                obligatoriedad: preguntaNueva.obligatoriedadPregunta,
                                                                ayuda: preguntaNueva.ayudaPregunta,
                                                                section: $scope.variableSeleccionada,
                                                                type: $scope.respuesta.tipoRespuesta.type,
                                                                int_id_padre: null,
                                                                numId:numIdPregunta++,
                                                                title: preguntaNueva.descripcionPregunta,
                                                                codigo: preguntaNueva.codigoPregunta,
                                                                nodes: []

                                                              }
                                                          );
                                                          preguntaNueva.descripcionPregunta = null;
                                                          arrayRespuestaLocal.forEach(function (respuesta) { //forEach que ingresa opcion de pregunta por odp porque no permitia asi no mas
                                                            respuesta.type = $scope.respuesta.tipoRespuesta.type;
                                                            if(respuesta.numEscala == $scope.respuesta.correcta){
                                                              respuesta.valor = true;
                                                            }
                                                            respuesta['codigo'] = preguntaNueva.codigoPregunta;

                                                              if(respuesta.type == 'range'){
                                                                  respuesta.numEscala = $scope.rango.maximo;
                                                                  respuesta.numId = $scope.rango.minimo;
                                                              }
                                                            $scope.data[$scope.data.length-1].nodes.push(respuesta);
                                                            });
                                                          contador++; //aunmenta en 1 el contador para preparar la siguiente pregunta.
                                                          numEscala = 1;
                                                          numId = 1;
                                                          $scope.arrayRespuesta1.splice(0, $scope.arrayRespuesta1.length); //Elimina todos las opciones de respuestas de la pregunta vigente para la nueva pregunta en cuestion.
                                                          $scope.pregunta.codigoPregunta = null;
                                                            $scope.pregunta.ayudaPregunta = null;
                                                          $scope.respuesta.correcta = null;
                                                          $scope.arrayRespuesta1.push(
                                                            {
                                                              int_id_padre: contador,
                                                              title: "",
                                                              title2: "",
                                                              type: $scope.respuesta.tipoRespuesta.type,
                                                              numEscala:numEscala++,
                                                              numId:numId++,
                                                              valor: false,
                                                              section: $scope.variableSeleccionada,
                                                              nodes: []

                                                            }
                                                          )
                                                        };
        $scope.guardar = function(){
            $http({
                method: 'POST',
                url: '/api/pregunta/guardar',
                data: $scope.data
            }).success(function(data) {
                    alert('Succeful en $scope.guardar en script/pregunta.js');
            }).error(function() {
                alert('Error en $scope.guardar en script/pregunta.js');
            });
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
      $scope.data = [];

//Datos de prueba para hacer el navBar

    });