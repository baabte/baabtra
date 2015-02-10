angular.module('baabtra').controller('PublishedcourseCtrl',['$scope','$rootScope','commonService','$state','PublishedCourse','$alert','draftedCourses',function($scope,$rootScope,commonService,$state,PublishedCourse,$alert,draftedCourses){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
if($rootScope.loggedIn==false){
  $state.go('login');
}
$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId==2){
	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	PublishedCourse.loadPublishedCourses($scope);
}

$scope.loadPublishedCoursesCallback=function(data){
	$scope.publishedCourses=angular.fromJson(JSON.parse(data));
};

$scope.navigateToCourse = function( courseId ){
    $state.go('home.main.viewCourse',{id:courseId});
}
$scope.editCourse=function(courseId){
	$state.go('home.main.addCourse.step1',{courseId:courseId});
};

$scope.undo = function(){
		var undoCourse = draftedCourses.fnDeleteCourse({activeFlag:1},$scope.lastDeletedCourseId, $scope.rm_id, "Publish",$scope.companyId);
		undoCourse.then(function (data) {
			$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));
		});
	};

$scope.deleteCourseDetails = function(courseId){
	// console.log(courseId);
	$scope.lastDeletedCourseId = courseId;		
	var deleteCourse = draftedCourses.fnDeleteCourse({activeFlag:0},courseId, $scope.rm_id , "Publish",$scope.companyId);
	deleteCourse.then(function (data) {
		$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));
		$alert({scope: $scope, container:'body', keyboard:true, animation:'am-fade-and-slide-top', template:'views/ui/angular-strap/alert.tpl.html', title:'Undo', content:'The course has been moved to the Trash <i class="fa fa-smile-o"></i>', placement: 'top-right', type: 'warning'});
	});
		
};

}]);