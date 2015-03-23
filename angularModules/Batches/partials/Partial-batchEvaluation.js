angular.module('baabtra').controller('BatchevaluationCtrl',['$scope','$rootScope','viewBatches','$stateParams','$alert',function($scope,$rootScope,viewBatches,$stateParams,$alert){

	$scope.batchObj={}; //mainObject
	$rootScope.$watch('userinfo',function(){ //watch for getting the basic details from rootscope
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		$scope.batchMappingId=$stateParams.batchMappingId;
		loadCourseMaterialsDDl=viewBatches.loadCourseMaterials4batchAtt($scope);

		loadCourseMaterialsDDl.then(function(response){ //promise for batch load
		
			var outcomeObj=angular.fromJson(JSON.parse(response.data))
			if(!angular.equals(outcomeObj.result,'notfound')){
					$scope.batchObj.batchDetails=outcomeObj.courseBatchObj;
					$scope.batchObj.materialList=outcomeObj.userCourseElementlist;
					$scope.status=true;
			}
			else{
					$scope.batchObj.batchDetails=outcomeObj.courseBatchObj;

					$scope.status=false;
			}
		});
	});


}]);