angular.module('baabtra').controller('InboxCtrl',['communications','commonService','$scope','$rootScope',function(communications,commonService,$scope,$rootScope){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
   return;
}

var loginId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkUserLoginId.$oid;
var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
$scope.data = {};

var gotMsgs = communications.loadInbox({filter:{to:loginId}});
	
	gotMsgs.then(function (response) {
		var msgs = angular.fromJson(JSON.parse(response.data));
		$scope.data.messages=msgs;
	});

}]);