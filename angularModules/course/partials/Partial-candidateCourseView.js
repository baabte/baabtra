angular.module('baabtra').controller('CandidatecourseviewCtrl',['$scope','$rootScope','candidateCourseView','commonService','$state',function($scope,$rootScope,candidateCourseView,commonService,$state){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
var courses = candidateCourseView.loadCoursesForCandidates($rootScope.userinfo.userLoginId);
	courses.then(function (data) {
		$scope.courses = angular.fromJson(JSON.parse(data.data));
});

$scope.navigateToDetails=function(courseId){
	$state.go('home.main.CandidateCourseDetails',{courseId:courseId});
	// $state.go('home.main.viewCourse',{courseId:courseId});
};


}]);