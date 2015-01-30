angular.module('baabtra').controller('DraftedcoursesCtrl',['$scope', '$rootScope', '$state', 'draftedCourses', 'commonService','$alert', function($scope, $rootScope, $state, draftedCourses, commonService ,$alert){

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

	//for undo deleted course
	$scope.undo = function(){
		draftedCourses.fnManageDraftedCourse($scope,{activeFlag:1},$scope.lastDeletedCourseId, $scope.rm_id);
	};
	
	//delete course
	$scope.deleteCourseDetails = function(courseId){
		$scope.lastDeletedCourseId = courseId;
		$alert({scope: $scope, container:'body', keyboard:true, animation:'am-fade-and-slide-top', template:'views/ui/angular-strap/alert.tpl.html', title:'Undo', content:'The course has been moved to the Trash <i class="fa fa-smile-o"></i>', placement: 'top-right', type: 'warning'});
		draftedCourses.fnManageDraftedCourse($scope,{activeFlag:0},courseId, $scope.rm_id);
	};

}]);