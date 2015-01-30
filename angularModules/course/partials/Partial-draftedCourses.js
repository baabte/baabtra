angular.module('baabtra').controller('DraftedcoursesCtrl',['$scope', '$rootScope', '$state', 'draftedCourses', 'commonService', function($scope, $rootScope, $state, draftedCourses, commonService){

	/*login detils start*/

	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if($rootScope.loggedIn==false){
		$state.go('login');
	}

	$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;

    /*login detils ends*/

	draftedCourses.fnLoadDraftedCourses($scope)//this fn load in-completed course details

	//edit course details
	$scope.editCourseDetails = function(courseId){
		$state.go('home.main.addCourse.step1',{'courseId':courseId});
	};

	//delete course
	$scope.deleteCourseDetails = function(courseId){
		alert(courseId);
	};

}]);