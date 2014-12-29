angular.module('baabtra').controller('AddcourseCtrl',['$scope','$select',function ($scope,$select){

$scope.selects=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
				{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
				{id: "3",name: "SR"}];
$scope.selectedItem= "1";

$scope.courseDuration={};
$scope.courseDuration.days=0;
$scope.courseDuration.months=0;
$scope.courseDuration.years=0;



$scope.$watch('courseDuration', function(newVal, oldVal){
    
    if(($scope.courseDuration.days!==0)||($scope.courseDuration.months!==0)||($scope.courseDuration.years!==0)){		
                 		$scope.duration=0;
                 		$scope.duration=(($scope.courseDuration.days*1)*24*60)+(($scope.courseDuration.months*30)*24*60)+(($scope.courseDuration.years*365)*24*60);
                 	
                 		console.log($scope.duration);
                 		
                 }
	else{
		$scope.duration=0;
		console.log($scope.duration);

	}                 
}, true);

}]);