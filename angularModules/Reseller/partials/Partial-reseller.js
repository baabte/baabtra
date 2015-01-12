angular.module('baabtra').controller('ResellerCtrl',['$scope', 'commonService', '$rootScope', 'userRegistrationService',function($scope, commonService, $rootScope, userRegistrationService){
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}
	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.existingEmail = ""
	userRegistrationService.FnFetchUserDetails($scope);

}]);