angular.module('baabtra').controller('CandidatecourseviewCtrl',['$scope','$rootScope','candidateCourseView','commonService',function($scope,$rootScope,candidateCourseView,commonService){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
var courses = candidateCourseView.loadCoursesForCandidates($rootScope.userinfo.userLoginId);
	courses.then(function (data) {
		$scope.courses = angular.fromJson(JSON.parse(data.data));
		console.log($scope.courses);
});


}]);