angular.module('baabtra').controller('ViewusersforapproveCtrl',['$scope', '$rootScope', '$state', 'commonService', 'viewUsersForApprove', function ($scope, $rootScope, $state, commonService, viewUsersForApprove){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	$scope.coursePreviewObject={};
	$scope.rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.cmpId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/
	$scope.data = {}; 
	var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId);
	LoadMenteesResponse.then(function(response){
		$scope.data.menteesList = angular.fromJson(JSON.parse(response.data));
		console.log(angular.fromJson(JSON.parse(response.data)));
	});

}]);