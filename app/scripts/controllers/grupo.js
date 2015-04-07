'use strict';

angular.module('proyectoSaludApp')
  .controller('GrupoCtrl', function ($scope, $http){//, close){// close){

    $http.get('/api/grupo').success(function(awesomeThings) {
      $scope.data = awesomeThings;
      $scope.nuevoProductoNumGrupo = awesomeThings[0].int_id;
        });
//-----------------GUARDAR PRODUCTO------------------------

    $scope.guardarProducto = function () {
        close({_num_grupo: $scope.nuevoProductoNumGrupo, _descripcion: $scope.nuevoProductoDescripcion}, 500);
    }
//----------------------------------------------------------
//**************************************************************
    $scope.remove = function(scope) {
      scope.remove();
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
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
      console.log(data);
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
/*
    $scope.data =

      [ { "id": "12", "int_padre": null, "int_tiene_hijos": "1", "flt_numero": "12", "title": "FRUTAS NO CÍTRICAS", "str_estado": "Activo",
        "nodes": [] },
        { "id": "11", "int_padre": null, "int_tiene_hijos": "1", "flt_numero": "11", "title": "FRUTAS CITRICAS ", "str_estado": "Activo",
          "nodes": [] },
        { "id": "8", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "8", "title": "GRASA ANIMAL", "str_estado": "Activo",
          "nodes": [] },
        { "id": "7", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "7", "title": "GRASA VEGETAL", "str_estado": "Activo",
          "nodes": [] },
        { "id": "6", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "6", "title": "AZÚCAR Y DULCES", "str_estado": "Activo",
          "nodes": [] },
        { "id": "5", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "5", "title": "PANES Y PASTAS", "str_estado": "Activo",
          "nodes": [] },
        { "id": "4", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "4", "title": "CEREALES Y DERIVADOS", "str_estado": "Activo",
          "nodes": [] },
        { "id": "3", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "3", "title": "LECHE Y DERIVADOS", "str_estado": "Activo",
          "nodes": [] },
        { "id": "2", "int_padre": null, "int_tiene_hijos": "0", "flt_numero": "2", "title": "PESCADO Y PRODUCTOS DEL MAR", "str_estado": "Activo",
          "nodes": [ { "id": "10", "int_padre": "2", "int_tiene_hijos": "1", "flt_numero": "10", "title": "LEGUMINOSAS Y OLEAGINOSAS", "str_estado": "Activo",
            "nodes": [ { "id": "15", "int_padre": "10", "int_tiene_hijos": "1", "flt_numero": "15", "title": "OTROS VEGETALES ", "str_estado": "Activo",
              "nodes": [ { "id": "13", "int_padre": "15", "int_tiene_hijos": "1", "flt_numero": "13", "title": "RAÍCES Y TUBERCULOS", "str_estado": "Activo",
                "nodes": [] } ] },
              { "id": "14", "int_padre": "10", "int_tiene_hijos": "1", "flt_numero": "14", "title": "VEGETALES DE HOJAS", "str_estado": "Activo",
                "nodes": [] } ] } ] },
        { "id": "1", "int_padre": null, "int_tiene_hijos": "1", "flt_numero": "1", "title": "CARNES Y PRODUCTOS CARNICOS/EMBUTIDOS", "str_estado": "Activo",
          "nodes": [ { "id": "9", "int_padre": "1", "int_tiene_hijos": "0", "flt_numero": "9", "title": "HUEVOS", "str_estado": "Activo",
            "nodes": [] } ] } ];
            */
//**************************************************************
  });
