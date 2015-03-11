angular.module('baabtra').controller('FeedbackdetailsCtrl',['$scope', '$rootScope', '$state', 'commonService', 'viewFeedback', function($scope, $rootScope, $state, commonService, viewFeedback){

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
  $scope.data = {};
	var FeedbackRequestDetailsResponse = viewFeedback.fnLoadFeedbackRequestDetails($scope.cmp_id, $state.params.feedBackId);
	FeedbackRequestDetailsResponse.then(function(response){
		$scope.data.feedBackDetails = angular.fromJson(JSON.parse(response.data));
	});

}]);