angular.module('baabtra').controller('PaymentrefundCtrl',['$scope','$rootScope','$state','commonService',function($scope,$rootScope,$state,commonService){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


console.log($state.params.key);

var functionArray=[{},{}];



}]);