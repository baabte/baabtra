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

  //bulding form object
  $scope.myForm = {};
  $scope.myForm.formAccessTo = "Public";

  //other datas
  $scope.data = {};
  $scope.data.companyRoles = "";
  $scope.data.feedbackAboutDropdown = [{value:"course",label:"Course"},
  									   {value:"mentee",label:"Mentee"},
  									   {value:"company",label:"Company"},
  									   {value:"batch",label:"Batch"},
  									   {value:"appliction",label:"Appliction"}];

  var roleLoadResponse = RoleMenuMappingSrv.FnGetRoles($scope, $scope.cmp_id, "", "");
  		roleLoadResponse.then(function(response){
  			$scope.data.companyRoles = angular.fromJson(JSON.parse(response.data)).roles;
  			angular.forEach($scope.data.companyRoles, function(role){
  				$scope.data.feedbackAboutDropdown.push({value:role._id.$oid,label:role.roleName});
  				role.text = role.roleName;
  				delete role.roleName;
  			});
  		});

  	$scope.feedbackTypeChanged = function(){
  		console.log($scope.data.selectedIconFeedbackAbout);
  	};

}]);