angular.module('baabtra').controller('DepartmentCtrl',['$scope', '$rootScope', '$state', '$aside', 'commonService',function($scope, $rootScope, $state, $aside, commonService){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	$scope.coursePreviewObject={};
	$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data = {};
	$scope.data.departments = [{ 'departmentId': $state.params.branchId, 'parent': null, 'children': null, ancestors: []}];
	

	$scope.addNewDepartment = function(item){
		$scope.data.asideHeading="Create a new department under "+item.$nodeScope.$modelValue.departmentId;
		var myOtherAside = $aside({scope: $scope,placement:'left',animation:'am-slide-left', template: 'angularModules/Department/partials/Aside-addDepartment.html'});
		console.log(item.$nodeScope.$modelValue.departmentId);
	};

	$scope.createNewDepartment = function(department, $hide){
		console.log(department);
	};

}]);