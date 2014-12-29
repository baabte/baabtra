angular.module('baabtra').controller('AddcourseCtrl',['$scope','$select','$state',function ($scope,$select,$state){
$scope.fee=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
			{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
			{id: "3",name: "SR"}];
$scope.selectedFee= "1";
$scope.currentState=$state.current.name; // for setting call back function - lijin

$scope.paymentTypes=[{id: "1",name: "Before The Course"},
					 {id: "2",name: "During The Course"},
					 {id: "3",name: "After The Course"}];
$scope.selectedPaymentType="1";

$scope.selectedDuration="1";

$scope.courseDetails=[]; // for supressing errors lijin have commented this and you can uncomment below and
						 // remove this line. There is no use of this variable.

// $scope.courseDetails=[{group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {},
// 					  {group:["1"]},
// 					  {group:["1"]},		
// 					  {},
// 					  {},
// 					  {}];
					  
$scope.totalCourseDuration=259200; // course duration in minutes

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