angular.module('baabtra').controller('QuestionbankviewCtrl',['$scope','bbConfig','$rootScope','$state','commonService','$alert','questionBankService',function($scope,bbConfig,$rootScope,$state,commonService,$alert,questionBankService){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;






}]);