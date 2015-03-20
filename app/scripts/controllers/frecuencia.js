'use strict';

angular.module('proyectoSaludApp').controller('FrecuenciaNuevaCtrl', function ($scope, $http, close){
  $scope.asignar_datos = function () {
    close({_frecuenciadescripcion: $scope.frecuenciadescripcion, _frecuenciacoeficiente: $scope.frecuenciacoeficiente}, 500);
  };
});

angular.module('proyectoSaludApp').controller('FrecuenciaCtrl', function ($scope, $http) {

  /* Mostar listado de frecuencias */
    //Se asigna un listado de datos de la base de datos al ejecutar la ruta
    $http.get('/api/frecuencia').success(function(datos) {
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


  /* Insertar un elemento en frecuencia */


    $scope.mostrar_modal = function() {
      ModalService.showModal({
        templateUrl: 'views/frecuencia_insertar.html',
        controller: "FrecuenciaNuevaCtrl"
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
          $scope.insertar_elemento(result._frecuenciadescripcion, result._frecuenciacoeficiente);
        });
      });
    };

    $scope.insertar_elemento = function (descripcion, coeficiente){
      $http({
        method: 'POST',
        url: '/api/frecuencia/guardar',
        params:
        {
          _frecuenciadescripcion: descripcion,
          _frecuenciacoeficiente: coeficiente
        }
      }).success(function(data) {
        //aqui un mensaje
      }).error(function() {
        //aqui un mensaje
      });
    };

});




