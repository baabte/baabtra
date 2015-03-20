angular.module('baabtra').controller('BatchassignmentCtrl',['$scope','viewBatches','$rootScope','$stateParams',function($scope,viewBatches,$rootScope,$stateParams){

	$scope.batchObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadBatchDetails=viewBatches.loadBatchMentees($scope,$stateParams.batchId);
		//$scope.urmId=$stateParams.userId;
		loadBatchDetails.then(function(response){ //promise for batch load

			$scope.batchObj.batchDetails=angular.fromJson(JSON.parse(response.data)).batchList;
			$scope.batchObj.userList=angular.fromJson(JSON.parse(response.data)).userDetails;
		});
	});
}]);