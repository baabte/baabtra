angular.module('baabtra').controller('PublishedcourseCtrl',['$scope','$rootScope','commonService','$state','PublishedCourse',function($scope,$rootScope,commonService,$state,PublishedCourse){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
if($rootScope.loggedIn==false){
  $state.go('login');
}
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

}]);