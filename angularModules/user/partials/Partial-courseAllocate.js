angular.module('baabtra').controller('CourseallocateCtrl',['$scope','bbConfig','$rootScope','$state','commonService','$alert',function($scope,bbConfig,$rootScope,$state,commonService,$alert){

	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


$scope.selectedCourse={};


}]);