angular.module('baabtra').controller('ViewcandidatesforparentCtrl',['$scope','parentModule','$rootScope','commonService','$modal',function($scope,parentModule,$rootScope,commonService,$modal){

	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}

	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.fkUserLoginId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;


$scope.data={};
$scope.data.usersObject={};
var gotCandidates = parentModule.getCandidateList($scope.fkUserLoginId);
gotCandidates.then(function (response) {
	var respData = angular.fromJson(JSON.parse(response.data));
		// console.log(respData);
		$scope.data.usersObject.userList=respData;
});

$scope.buildActions = function (index) {
	var loginId = $scope.data.usersObject.userList[index].fkUserLoginId.$oid;
	var ofId = $scope.data.usersObject.userList[index].profile.orderFormId;
	// console.log($scope.data.usersObject.userList[index],ofId);
	return [
				{
				"text": "<i class=\"mdi-action-payment\"></i>&nbsp;View Payment Details",
				 "click": "loadPaymentPopup('"+loginId+"')"
				},
				{
				"text": "<i class=\"fa fa-calendar\"></i>&nbsp;View Attendance Details",
				 "click": "$state.go(\"home.main.menteeAttendance\",{userId:'"+loginId+"'})"
				},
				{
				"text": "<i class=\"fa fa-calendar\"></i>&nbsp;View BP",
				 "click": "$state.go(\"home.main.baabtraProfile\",{type:'detailed', userLoginId:'"+loginId+"'})"
				}
			];
};
$scope.loadPaymentPopup = function (loginId) {
	$scope.data.candidateDetails = [];
	var gotDetails = parentModule.getCandidateDetails(loginId);
		gotDetails.then(function (response) {
			var respData = angular.fromJson(JSON.parse(response.data));
			$scope.data.candidateDetails = respData;
			$modal({scope: $scope, template: 'angularModules/parent/popup/popup-payments.html', show: true,placement:'center'});

		});
	
};



}]);