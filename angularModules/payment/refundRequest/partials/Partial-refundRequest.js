angular.module('baabtra').controller('RefundrequestCtrl',['$scope','$rootScope','$state','commonService','bbConfig','refundRequest',function($scope,$rootScope,$state,commonService,bbConfig,refundRequest){

	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}



$rootScope.$watch('userinfo',function(){
	var userId='';

	if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,bbConfig.MURID)){
		var userId=$rootScope.userinfo.userLoginId;
	}else{
	var userId=$state.params.userId;
	}

	if(angular.equals(userId,'')){
	var userId='557bf47734b7716a5336e678'

	}

    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    if(angular.equals($rootScope.userinfo.ActiveUserData.modernView,'classic')){
    	$scope.classic=true;
    }
    var userCourseDetailsOFPromise=refundRequest.userCourseDetailsOF(userId);
	userCourseDetailsOFPromise.then(function(data){
	 $scope.userCourseList=angular.fromJson(JSON.parse(data.data));
	 console.log($scope.userCourseList)

	});
    
});











}]);