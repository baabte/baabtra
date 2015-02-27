angular.module('baabtra').controller('CoursedetailsCtrl',['$scope','$rootScope','commonService','addCourseService','$state',function($scope,$rootScope,commonService,addCourseService,$state){


  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/


  var promise = addCourseService.fnLoadCourseDetails($scope, $state.params.courseId);
  promise.then(function(course){
    $scope.course = angular.fromJson(JSON.parse(course.data))[0];

    //Course Duration details
    angular.forEach($scope.course.Duration.DurationDetails,function(key, value){
		$scope.prettyDuration = "";
		$scope.prettyDuration = $scope.prettyDuration + key + ' ' + value + ' ';
	})

    //Course Fee Details

    $scope.feeDetails = {};
    if(!$scope.course.Fees.free){
    	$scope.feeDetails.amount = $scope.course.Fees.totalAmount;
    	$scope.feeDetails.paymentIn = $scope.course.Fees.currency.currency;
    	$scope.feeDetails.payment = {};
    	if($scope.course.Fees.payment.oneTime){
    		$scope.feeDetails.payment.Mode = "One time";
    		$scope.feeDetails.payment.When = $scope.course.Fees.payment.mode.name;
    	}
    	else{
    		$scope.feeDetails.payment.Mode = "Installments";
    	}
    }
    else{
    	$scope.feeDetails.amount = "FREE";
    }

  });

}]);