angular.module('baabtra').controller('MenteeevaluationCtrl',['$scope','$rootScope','viewBatches','$state','$alert','commonService','attendenceService','$aside',function($scope,$rootScope,viewBatches,$state,$alert,commonService,attendenceService,$aside){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	var courseId = $state.params.courseId;
	var usersList = [$state.params.userId];
	$scope.menteeObj = {};
	$scope.menteeObj.evaluableElement = false;
	var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);

	courseDetailsResponse.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.menteeObj.selectedCourse = result[0];
		$scope.menteeObj.elementOrderArray = Object.keys($scope.menteeObj.selectedCourse.elementOrder);
	});
	
}]);