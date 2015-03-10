angular.module('baabtra').controller('CreatefeedbackCtrl',['$scope', '$rootScope', 'commonService', 'RoleMenuMappingSrv', function ($scope, $rootScope, commonService, RoleMenuMappingSrv){
	

 /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.rm_id  = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.cmp_id = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  //other datas
  $scope.data = {};
  $scope.data.companyRoles = "";
  $scope.data.feedbackAboutDropdown = [{"value":"course","label":"<i class=\"fa mdi-social-public text-md\"></i> Course"},
  									   {"value":"mentee","label":"<i class=\"fa mdi-social-person text-md\"></i> Mentee"},
  									   {"value":"company","label":"<i class=\"fa mdi-social-domain text-md\"></i> Company"},
  									   {"value":"batch","label":"<i class=\"fa mdi-social-group-add text-md\"></i> Batch"},
  									   {"value":"appliction","label":"<i class=\"fa mdi-social-group-add text-md\"></i> Appliction"}];

  // bulding form object
  $scope.myForm = {};
  $scope.myForm.formAccessTo = "Public";

  //for load roles under company
  $scope.loadCompanyRoles = function(){

  	//checking allready loaded the roles 
  	if(!$scope.data.companyRoles.length){
  		var roleLoadResponse = RoleMenuMappingSrv.FnGetRoles($scope, $scope.cmp_id, "", "");
  		roleLoadResponse.then(function(response){
  			$scope.data.companyRoles = angular.fromJson(JSON.parse(response.data)).roles;
  			angular.forEach($scope.data.companyRoles, function(role){
  				role.text = role.roleName;
  				delete role.roleName;
  			});
  		});
  	}
  };



}]);