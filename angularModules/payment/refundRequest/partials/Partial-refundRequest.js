angular.module('baabtra').controller('RefundrequestCtrl',['$scope','$rootScope','$state','commonService','bbConfig','refundRequest','manageOrderFormSrvc','$modal',function($scope,$rootScope,$state,commonService,bbConfig,refundRequest,manageOrderFormSrvc,$modal){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}



$rootScope.$watch('userinfo',function(){
	var ofId=$state.params.ofId;
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }
  var fnOFDetailsPromise=manageOrderFormSrvc.fnOFDetails(ofId);
  fnOFDetailsPromise.then(function(data){
   $scope.orderFormDetails=angular.fromJson(JSON.parse(data.data));
   console.log($scope.orderFormDetails)
  });
});

$scope.request={}

//this function is used to format the date from milliseconds
$scope.convertDate=function (millisec) {
    var date=new Date(millisec);
    return {day:date.toDateString(),time:date.toTimeString()};
};

// Pre-fetch an external template populated with a custom scope
var refundRequestModal = $modal({scope: $scope,template: 'angularModules/payment/refundRequest/partials/modal-refundRequest.html', show: false,placement:'center'});
// Show when some event occurs (use $promise property to ensure the template has been loaded)
             
$scope.refundRequestModalshowModal = function(transaction) {
  $scope.selectedTransaction=angular.copy(transaction);
  $scope.request={}
  refundRequestModal.$promise.then(refundRequestModal.show);
};

$scope.fnRequestRefund=function ($hide) {
console.log($scope.request);
$scope.request.companyId=$scope.companyId;
$scope.request.loggedusercrmid=$scope.loggedusercrmid;
$scope.request.ofId=$scope.selectedTransaction.orderFormId;
$scope.request.oderFormId=$scope.orderFormDetails.orderForm.customCompanyCode;
$scope.request.transactionFor=$scope.selectedTransaction.transactionFor;
$scope.request.transactionId=$scope.selectedTransaction._id.$oid;
$scope.request.details=$scope.selectedTransaction.actHead.details;
$scope.request.status='Requested';
console.log($scope.request);






$hide();
};











}]);