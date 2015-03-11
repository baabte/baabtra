angular.module('baabtra').controller('ViewfeedbackCtrl', ['$scope', '$rootScope', 'commonService', 'viewFeedback', function ($scope, $rootScope, commonService, viewFeedback){

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



  var FeedbackRequestsResponse  = viewFeedback.fnViewFeedbackRequests($scope.rm_id,$scope.cmp_id)
  FeedbackRequestsResponse.then(function(response){
  	$scope.data.feedbackRequests = angular.fromJson(JSON.parse(response.data));
  	
  	$scope.feedbackResponse = [];
  	for(var i in $scope.data.feedbackRequests.questions){
		tempObj={};
		$scope.feedbackResponse.push(tempObj);
	}
  
  });

}]);