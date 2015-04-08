'use strict';

angular.module('proyectoSaludApp')
  .controller('ProductoCtrl', function ($scope, $http, MyAPIService, MyAPIServiceUnidad){
    $http.get('/api/producto').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
        console.log($scope.awesomeThings);
      $scope.dataGrupo = MyAPIService.query();
      $scope.dataUnidad = MyAPIServiceUnidad.query();
    })
      var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarProductoModal" ng-click="indexProductoEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="indexProducto($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';

      $scope.seleccion = [];
      $scope.editarproducto =
      {
          int_id: "",
          descripcion: "",
          numGrupo: "",
          numUnidad: "",
          numMinimo: "",
          numMaximo: ""
      };
    $scope.gridOptions = {
      data: 'awesomeThings',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      //showGroupPanel: true,
      showFooter: true,
      //enableCellEdit: true,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      afterSelectionChange: function (theRow, evt) {
          $scope.editarproducto.int_id = parseInt(theRow.entity.int_id);
          $scope.editarproducto.descripcion = theRow.entity.Producto;
          $scope.editarproducto.numGrupo = theRow.entity.Grupo;
          $scope.editarproducto.numMinimo = parseFloat(theRow.entity.flt_min);
          $scope.editarproducto.numMaximo = parseFloat(theRow.entity.flt_max);
          $scope.editarproducto.numUnidad = theRow.entity.Unidad_medida;
        },
      columnDefs: [
//        {field: 'int_id', displayName: 'Id'},
        {field: 'Producto', displayName: 'Descripcion'},
        {field: 'Grupo', displayName: 'Grupo'},
        {field: 'Unidad_medida', displayName: 'Medida'},
        {field: 'flt_min', displayName: 'Valor minimo'},
        {field: 'flt_max', displayName: 'Valor máximo'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate}
    ]};

      //---------------------------------------------------------
        $scope.indexProducto = function(){
          $scope.objetoFila = this.row.rowIndex;
            console.log($scope.seleccion);
        }


      $scope.indexProductoEditar = function(){
          $scope.objetoFila = this.row.rowIndex;
          console.log($scope.seleccion[0]);
      }

        $scope.removeRow = function() {
          $scope.eliminarProducto($scope.seleccion[0].int_id);
          $scope.gridOptions.selectItem($scope.objetoFila, false);
          $scope.awesomeThings.splice($scope.objetoFila, 1);

        };
  //--------------ngGridEventEndCellEdit-----------------------
/*
      $scope.$on('ngGridEventEndCellEdit', function(evt){
      $scope.editarProducto(evt.targetScope.row.entity.id_producto, evt.targetScope.row.entity.desc_producto, evt.targetScope.row.entity.num_grupo);
      });

*/
    $scope.editar = function(productoEditar){
      //----------AQUI VA UNA ADVERTENCIAS
      $http({
        method:'POST',
        url: '/api/producto/editar/',
        params:{
          _id: productoEditar.int_id,
        _descripcion: productoEditar.descripcion,
        _num_grupo: productoEditar.numGrupo.id,
        _num_unidad: productoEditar.numUnidad.int_id,
        _flt_min: productoEditar.numMinimo,
        _flt_max:productoEditar.numMaximo
        }
      }).success(function(data){
          $scope.update();
      }).error(function(){
        console.log("Error en el controller producto !!!!");
      });
    };
//-----------------------------------------------------------
    $scope.agregarItem = function(productoNuevo) {
        $scope.awesomeThings.push({int_id:"0", Producto:
            productoNuevo.descripcion, Grupo:productoNuevo.numGrupo.title, Unidad_medida:
            productoNuevo.numUnidad.str_descripcion, flt_min:productoNuevo.numMinimo, flt_max:productoNuevo.numMaximo});
    };
//-----------------------------------------------------------
    $scope.guardar = function (productoNuevo){
        //$scope.agregarItem(productoNuevo);
        $http({
        method: 'POST',
        url: '/api/producto/guardar',
        params:
        {
          _descripcion: productoNuevo.descripcion,
          _num_grupo: productoNuevo.numGrupo.id,
          _num_unidad: productoNuevo.numUnidad.int_id,
          _flt_min: productoNuevo.numMinimo,
          _flt_max:productoNuevo.numMaximo
        }
      }).success(function(data) {
        //aqui un mensaje
            $scope.update();
      }).error(function() {
        //aqui un mensaje
      });
    };

      //+++++++++++ELIMINA UN PRODUCTO+++++++++++++++
      $scope.eliminarProducto = function(_id){
        $http({
          method: 'POST',
          url: '/api/producto/eliminar',
          params: {
            _id: _id
          }
        }).
            success(function(data) {
              //$scope.mostrarProducto();
            }).
            error(function() {
              //$scope.mostrarProducto();
            });
      }

    //Funcion para traer los datos actualizados
    $scope.update = function(){
      $http.get('/api/producto').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;
      });
    };

    $scope.tester = function(productoNuevo){
      console.log(productoNuevo);
    }
  });

//-------------------------------------------------------------------
angular.module('proyectoSaludApp')
    .factory('MyAPIService', function($resource) {
      return $resource('/api/grupo');
    });

angular.module('proyectoSaludApp')
    .factory('MyAPIServiceUnidad', function($resource) {
        return $resource('/api/unidad');
    });