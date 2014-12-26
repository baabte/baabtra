angular.module('baabtra').controller('AddcourseCtrl',['$scope','$select',function ($scope,$select){
$scope.selects=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
				{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
				{id: "3",name: "SR"}];
$scope.selectedItem= "1";

}]);