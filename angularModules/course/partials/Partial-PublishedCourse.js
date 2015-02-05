angular.module('baabtra').controller('PublishedcourseCtrl',['$scope','$rootScope','commonService','$state','PublishedCourse',function($scope,$rootScope,commonService,$state,PublishedCourse){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
if($rootScope.loggedIn==false){
  $state.go('login');
}
PublishedCourse.loadPublishedCourses($scope);

$scope.loadPublishedCoursesCallback=function(data){
	$scope.publishedCourses=angular.fromJson(JSON.parse(data));
	console.log($scope.publishedCourses);
};

}]);