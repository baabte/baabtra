(function() {
  'use strict';

/**
 * @ngdoc function
 * @name baabtra.controller:UserrolemenuctrlCtrl
 * @description
 * # UserrolemenuctrlCtrl
 * Controller of the baabtra
 */
    angular.module('baabtra')
      .controller('UserrolemenuctrlCtrl',['$scope','Rolemenumapping', function ($scope,Rolemenumapping) {
    $scope.menudetails=false;
        Rolemenumapping.FnGetRoles($scope);
        $scope.getId=function(id){
              Rolemenumapping.FnGetRoleMenus($scope,id);
              Rolemenumapping.FnGetAllMenus($scope);
              $scope.menudetails=true;
        };
        $scope.ResetMenu=function(id){
          //alert("Reset");
        };
     $scope.SaveChange=function(id){

    if ($scope.tree1.length) {Rolemenumapping.FnSaveNewRoleMenu($scope,$scope.tree1);}
    else {
            Notify('Please Select Atleast One Menu', 'top-right', '5000', 'warning', 'fa-warning', true);
             //$scope.myValue=true;
           }
    };

     $scope.remove = function(scope) {
          scope.remove();
        };

        $scope.toggle = function(scope) {
          scope.toggle();
        };

        $scope.newSubItem = function(scope) {
          var nodeData = scope.$modelValue;
          nodeData.childMenuStructure.push({
            fkMenuId: nodeData.fkMenuId * 10 + nodeData.childMenuStructure.length,
            MenuName: nodeData.MenuName + '.' + (nodeData.childMenuStructure.length + 1),
            childMenuStructure: []
          });
        };

      }]);

})();

