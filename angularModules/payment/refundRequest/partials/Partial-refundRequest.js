angular.module('baabtra').controller('RefundrequestCtrl',['$scope','$rootScope','$state','commonService','bbConfig','refundRequest','manageOrderFormSrvc',function($scope,$rootScope,$state,commonService,bbConfig,refundRequest,manageOrderFormSrvc){

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


 //    var userCourseDetailsOFPromise=refundRequest.userCourseDetailsOF(ofId);
	// userCourseDetailsOFPromise.then(function(data){
	//  $scope.userCourseList=angular.fromJson(JSON.parse(data.data));
	//  console.log($scope.userCourseList)

	// });
    
});











}]);