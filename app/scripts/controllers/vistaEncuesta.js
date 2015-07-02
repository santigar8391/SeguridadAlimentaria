'use strict';

angular.module('proyectoSaludApp')
  .controller('VistaencuestaCtrl', function ($scope, $http, datosvistaEncuestaCanton, datosvistaEncuestaParroquia, datosvistaEncuestaComunidad) {
    $http.get('/api/encuesta').success(function(awesomeThings) {
      $scope.listadoEncuesta = awesomeThings;
    });

      datosvistaEncuestaCanton.get().success(function(datos){
        $scope.listadoCanton = datos;
        //PARA UBICAR EN PRIMERA POSICION EL SELECT CON LOS OPTIONS.
        $scope.modeloCanton = $scope.listadoCanton[0].str_descripcion;
        console.log($scope.modeloCanton);
      }).error(function(err){
        console.log('Error en el servicio datosvistaEncuestaCanton!!! mensaje de log en controlador vistaEncuesta');
      });


      datosvistaEncuestaParroquia.get().success(function(datos){
        $scope.listadoParroquia = datos;
        $scope.modeloParroquuia = $scope.listadoParroquia[0].str_descripcion;
      }).error(function(err){
        console.log('Error en el servicio datosvistaEncuestaParroquia!!! mensaje de log en controlador vistaEncuesta');
      });


      datosvistaEncuestaComunidad.get().success(function(datos){
        $scope.listadoComunidad = datos;
        $scope.modeloComunidad = $scope.listadoComunidad[0].str_descripcion;
      }).error(function(err){
        console.log('Error en el servicio datosvistaEncuestaComunidad!!! mensaje de log en controlador vistaEncuesta');
      });

      //PARA LA RESPUESTA ACTUAL.
      $scope.trueFalse = function(node){
        $scope.respuesta.seleccion = node.respuesta;
        loopAsignarRespuesta(node);
      };

      var loopAsignarRespuesta = function(currentNode){
        //currentNode.respuesta = true;
        var i, j;
        alert('entro en el loop'+ JSON.stringify(currentNode));
        for (i = 0; i < $scope.preguntas[2].length; i += 1) {
          console.log('Longitud de las preguntas ' +$scope.preguntas[2].length);
          if($scope.preguntas[2][i].int_id == currentNode.int_id_pregunta){

            for (j = 0; j < $scope.preguntas[2][i].nodes.length; j+= 1) {

              if($scope.preguntas[2][i].nodes[j].int_id != $scope.respuesta.seleccion){
                $scope.preguntas[2][i].nodes[j].respuesta = false;
              }
            }
          }
        }
      };



      $scope.respuesta = {
        'seleccion': ''
      }



      //PARA LA FECHA ACTUAL.
      $scope.fechaActual = {
       'fecha':  new Date()
      };



      //Template para visualizar los botones de editar y eliminar para cada registro de productos
      var removeTemplate =
          '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" ng-click="seleccionarEncuesta(row.entity)"> ' +
          '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button>';

      //Este array contiene productos que han sido seleccionados con click en la fila de la tabla con ng-grid de productos en la vista
      $scope.seleccion = [];
      //Este es un objeto con campos necesarios para recoger los datos a ser editados y se modificaran a medida que los editen.
      //(Se utilizara en la funcion edicion!)

//Este es un conjunto de parametros de comportamiento del ng-grid
      $scope.gridOptions = {
        data: 'listadoEncuesta',
        selectedItems: $scope.seleccion,
        enableRowSelection: true,
        enableCellSelection: false,
        showGroupPanel: false,
        showFooter: true,
        enableCellEdit: false,
        showSelectionCheckbox: true,
        enableColumnResize: true,
        enableColumnReordering: false,
        enableRowReordering: false,
        multiSelect: false,
        afterSelectionChange: function (theRow, evt) {
          console.log('id desde afterSelectionChange: '+theRow.entity.int_id);
              /*
              $scope.encuestaEditar.id = theRow.entity.int_id,
              $scope.encuestaEditar.titulo = theRow.entity.str_titulo,
              $scope.encuestaEditar.descripcion = theRow.entity.str_descripcion,
              $scope.encuestaEditar.objetivo = theRow.entity.str_objetivo,
              $scope.encuestaEditar.destinadoA = theRow.entity.str_destinado_a,
              $scope.encuestaEditar.instrucciones = theRow.entity.str_instrucciones,
              $scope.encuestaEditar.fechaCreacion = theRow.entity.dt_fecha_creacion,
              $scope.encuestaEditar.fechaModificacion = theRow.entity.dt_fecha_modificacion,
              $scope.encuestaEditar.estado = theRow.entity.str_estado
              */
        },

        columnDefs: [
          {field: 'int_id', displayName: 'Id', width: '2%', pinnable: 'false'},
          {field: 'str_titulo', displayName: 'Titulo', width: '10%'},
          {field: 'str_objetivo', displayName: 'objetivo', width: '7%'},
          {field: 'str_destinado_a', displayName: 'Destinado a', width: '7%'},
          {field: 'dt_fecha_creacion', displayName: 'Fecha de creación', width: '4%'},
          {field: 'str_descripcion', displayName: 'Descripcion', width: '38%', visible: false},
          {field: 'str_instrucciones', displayName: 'Instrucciones', width: '10%', visible: false},
          {field: 'dt_fecha_modificacion', displayName: 'Fecha modificacion', width: '11%', visible: false},
          {field: 'str_estado', displayName: 'Estado', width: '4%'},
          {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate, width: '4%'}
        ]};


      $scope.tester = function (index) {
        /*
        console.log('En el tester '+ JSON.stringify(index));
        $scope.visible = false;
        */
        console.log('En el tester viendo que mismo: '+ JSON.stringify(index));
        $scope.visible = true;
      };

      $scope.seleccionarEncuesta = function(encuesta)
      {
        console.log('Encuesta seleccionada: '+ JSON.stringify(encuesta));
        $scope.todo(encuesta);
        //$scope.preguntas.push(encuesta);
        $scope.visible = false;
      };

      $scope.visible = true;
      $scope.preguntas = [];
      $scope.longitud = 0;

      $scope.numeroFamilia = 0;

      $scope.todo = function(encuesta) {
        $http({
          method: 'GET',
          url: '/api/vistaEncuesta/obtenertodo',
          params:{
            intId: encuesta.int_id
          }
        }).success(function(exito){
          $scope.preguntas.push(encuesta);
          $scope.preguntas.push($scope.fechaActual);
          $scope.preguntas.push(exito);
          $scope.visible = false;
          $scope.longitud = $scope.preguntas.length;
          console.log('Longitud: '+$scope.longitud);
        }).error(function(err){

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

    });
