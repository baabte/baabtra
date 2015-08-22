angular.module('baabtra').controller('EvaluationviewerCtrl',['$scope','$rootScope','$state','commonService','evaluationService', function($scope,$rootScope,$state,commonService,evaluationService){

	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

// evaluationService.evaluationFetch();

$scope.EvaluationList=[{},{},{},{},{},{},{},{},{},{},{},{}];




}]);