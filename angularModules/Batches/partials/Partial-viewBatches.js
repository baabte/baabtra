angular.module('baabtra').controller('ViewbatchesCtrl',['$scope','viewBatches','$rootScope',function($scope,viewBatches,$rootScope){
	//getting the user role mapping id
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		var loadBatchPromise=viewBatches.viewBatchesForManage($scope);
		loadBatchPromise.then(function(response){ //promise for batch load
			$scope.batchObj.batchList=angular.fromJson(JSON.parse(response.data));

		});
	});

	$scope.batchObj={};
	$scope.activeTab="true";
	
	//call the function to load the batches
	$scope.viewBatches=function(){
		$scope.activeTab="true";
		/*var loadBatchPromise=viewBatches.viewBatchesForManage($scope);
		loadBatchPromise.then(function(response){ //promise for batch load
			$scope.batchObj.batchList=angular.fromJson(JSON.parse(response.data));

		});*/
	};

	$scope.viewMentees=function(){
		$scope.activeTab="false";
		$scope.batchObj.mtype='initial'
		$scope.batchObj.mlastId='';
		$scope.batchObj.mfirstId='';
		if(angular.equals($scope.batchObj.menteeList,undefined)){
			var loadMenteePromise=viewBatches.viewMenteesForManage($scope);
			loadMenteePromise.then(function(response){ //promise for batch load
				$scope.batchObj.menteeList=angular.fromJson(JSON.parse(response.data)).userList;
				$scope.batchObj.mfirstId=angular.fromJson(JSON.parse(response.data)).firstId;
				$scope.batchObj.mlastId=angular.fromJson(JSON.parse(response.data)).lastId;
			});
		}
	};
}]);