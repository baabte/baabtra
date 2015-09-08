angular.module('baabtra').controller('AcademicyearCtrl',['$scope', '$rootScope', '$state', 'commonService', 'academicYear',function($scope, $rootScope, $state, commonService, academicYear){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.academicYearObj = {};
	$scope.academicYearObj.newAcademicYear = {};

	$scope.createNewAcademicYear = function(academicYearDetails){
		console.clear();
		console.log(academicYearDetails);
		var academicYearSaveResponse = academicYear.saveAcademicYear(academicYearDetails);
		academicYearSaveResponse.then(function(response){

		});
	};

}]);