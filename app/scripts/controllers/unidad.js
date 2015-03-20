'use strict';

angular.module('proyectoSaludApp')
  .controller('UnidadCtrl', function ($scope, $http, ModalService){//, close) {

    //Se asigna un listado de datos de la base de datos al ejecutar la ruta
    $http.get('/api/unidad').success(function(datos) {
      $scope.lista = datos;
    });

    //Se asigna a una variable el botón eliminar (ícono con tacho de basura)
    var removeTemplate = '<button type="submit" class="btn btn-default btn-sm" ng-click="removeRow($index)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';
    $scope.seleccion = [];

    //Se crea la tabla grid (ng-grid) con sus datos y configuraciones
    //Mostrar Listado
    $scope.listado = {
      data: 'lista',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      showGroupPanel: false,
      showFooter: true,
      enableCellEdit: true,
      showSelectionCheckbox: false,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      columnDefs: [
        {field: 'int_id', displayName: 'Id', enableCellEdit: false},
        {field: 'str_descripcion', displayName: 'Descripción'},
        {field: 'flt_coeficiente', displayName: 'Coeficiente', enableCellEdit: false},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate , enableCellEdit: false}
      ]};


    $scope.save = function(unidad){
      console.log(unidad);
    }



    $scope.mostrarModal = function() {
      ModalService.showModal({
        templateUrl: 'views/unidad_insertar.html',
        controller: "NuevaUnidadCtrl"
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
          $scope.insertarElemento(result._frecuenciaDescripcion, result._frecuenciaCoeficiente);
          $scope.update();
        });
      });
    };

    $scope.insertarElemento = function (descripcion, coeficiente){
      $http({
        method: 'POST',
        url: '/api/unidad/guardar',
        params:
        {
          _frecuenciaDescripcion: descripcion,
          _frecuenciaCoeficiente: coeficiente
        }
      }).success(function(data) {
        //aqui un mensaje
      }).error(function() {
        //aqui un mensaje
      });
    };

//Funcion para traer los datos actualizados de las frecuencias, utilizado despues de insertar y eliminar...
    $scope.update = function(){
      $http.get('/api/unidad').success(function(datos) {
        $scope.lista = datos;
      });
    }
  });


//Controlador para obtener datos de la ventana modal frecuencia_insertar...
angular.module('proyectoSaludApp')
  .controller('NuevaUnidadCtrl', function ($scope, $http, close) {

    $scope.asignarDatos = function () {
      close({
        _frecuenciaDescripcion: $scope.frecuenciaDescripcion,
        _frecuenciaCoeficiente: $scope.frecuenciaCoeficiente
      }, 500);
    };
  });





