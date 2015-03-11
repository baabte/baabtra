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
  $scope.data.feedbackResponse = [];
	var FeedbackRequestDetailsResponse = viewFeedback.fnLoadFeedbackRequestDetails($scope.cmp_id, $state.params.feedBackId);
	FeedbackRequestDetailsResponse.then(function(response){
		$scope.data.feedBackDetails = angular.fromJson(JSON.parse(response.data))[0];
	});

	$scope.submitMyResponse = function(){
		var responseObject = [];
		for(var questionsCount = 0;questionsCount < $scope.data.feedBackDetails.questions.length; questionsCount++){
			responseObject[questionsCount] = [];
			var options = $scope.data.feedBackDetails.questions[questionsCount].options;
			var userResponse = $scope.data.feedbackResponse[questionsCount].userResponse;
			angular.forEach(userResponse,function(value){
				angular.forEach(options,function(option){
					if(angular.equals(option.Name,value)){
						responseObject[questionsCount].push(option.value);
					}
				});
			});
		}
		console.log(responseObject);
		var saveUserFeedbackResponse = viewFeedback.fnSaveUserFeedback($state.params.feedBackId ,responseObject, $scope.rm_id);
				saveUserFeedbackResponse.then(function(response){
					//console.log(angular.fromJson(JSON.parse(response.data)));
				});
	};

}]);