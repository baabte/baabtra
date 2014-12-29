angular.module('baabtra').controller('AddcourseCtrl',['$scope','$select','$state',function ($scope,$select,$state){
$scope.fee=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
			{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
			{id: "3",name: "SR"}];
$scope.selectedFee= "1";


$scope.paymentTypes=[{id: "1",name: "Before The Course"},
					 {id: "2",name: "During The Course"},
					 {id: "3",name: "After The Course"}];
$scope.selectedPaymentType="1";

$scope.selectedDuration="1";

$scope.courseDetails=[]; // for supressing errors lijin have commented this and you can uncomment below and
						 // remove this line. There is no use of this variable.
					  
$scope.totalCourseDuration=259200; // course duration in minutes


$scope.callbackFunctions=[];
$scope.callbackFunctions['step3']=function(arg){
	$scope.courseDetails=[];
for (var i = 0; i < 180; i++) {
	$scope.courseDetails.push({day:[i]});
}
console.log($scope.courseDetails);
};
$scope.callbackFunctions['step2']=function(arg){
console.log('step2:'+arg);
};



}]);