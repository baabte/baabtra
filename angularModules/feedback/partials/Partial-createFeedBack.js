angular.module('baabtra').controller('CreatefeedbackCtrl',['$scope', '$rootScope', '$state', 'commonService', 'commonSrv', function ($scope, $rootScope, $state, commonService, commonSrv){
	

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
  $scope.myForm.questions = {};
  $scope.myForm.formAccessTo = "Public";

  //other datas
  $scope.data = {};
  $scope.data.companyRoles = "";
  $scope.data.feedbackAboutDropdown = [{value:"course",label:"Course"},
  									   {value:"mentee",label:"Mentee"},
  									   {value:"company",label:"Company"},
  									   {value:"batch",label:"Batch"},
  									   {value:"appliction",label:"Appliction"}];
 	var rolesLoadResponse = commonSrv.fnLoadRoleUnderCompany($scope.cmp_id);
  	rolesLoadResponse.then(function(response){
  		$scope.data.companyRoles = angular.fromJson(JSON.parse(response.data));
  		angular.forEach($scope.data.companyRoles, function(role){
  			$scope.data.feedbackAboutDropdown.push({value:role.roleName,label:role.roleName});
  			role.text = role.roleName;
  			delete role.roleName;
  		});
  	});


  	$scope.createFeedbackForm = function(){
  		$scope.myForm.feedbackAbout = {};
  		$scope.myForm.feedbackAbout.type = $scope.data.selectedFeedbackAbout;
  		$scope.myForm.feedbackAbout.feedbackOn = [];
  		angular.forEach($scope.data.course,function(course){
  			$scope.myForm.feedbackAbout.feedbackOn.push(course._id);
  		});
  		$scope.myForm.rmId = $scope.rm_id;
  		console.log($scope.myForm);
  	};

}]);