angular.module('baabtra').controller('PaymentrefundCtrl',['$scope','$rootScope','$state','commonService','paymentRefund',function($scope,$rootScope,$state,commonService,paymentRefund){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


console.log($state.params.key);

var functionArray=[{},{}];


$rootScope.$watch('userinfo',function(){
	var ofId=$state.params.ofId;
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }
  // var fnOFDetailsPromise=paymentRefund.(ofId,companyId);
  // fnOFDetailsPromise.then(function(data){
  //  $scope.refundRequests=angular.fromJson(JSON.parse(data.data));
  //  console.log($scope.refundRequests)
  // });

});





}]);