angular.module('baabtra').controller('BatchevaluationCtrl',['$scope','$rootScope','$state','viewBatches','$stateParams','$alert' ,'commonService',function($scope,$rootScope, $state,viewBatches,$stateParams,$alert, commonService){

  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

	$scope.batchObj = {};
	$scope.batchMappingId = $state.params.batchMappingId;

	var loadCourseMaterialsDDl = viewBatches.loadCourseMaterials4batchAtt($scope);
	loadCourseMaterialsDDl.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.batchObj.batchDetails = result.courseBatchObj;
		
		var usersList = [];
		for(var user in result.courseBatchObj.users){
			
			usersList.push(result.courseBatchObj.users[user].fkUserRoleMappingId.$oid);
			if(angular.equals(result.courseBatchObj.users.length, usersList.length)){
				var courseId = result.courseBatchObj.fkCourseId.$oid;

				console.log(result.courseBatchObj);
			}
		}


		$scope.batchObj.materialList = [];
		var coureTimeline = $scope.batchObj.batchDetails.courseTimeline;
		angular.forEach($scope.batchObj.batchDetails.elementOrder, function(elementOrder){

			var splitedElementOrder = elementOrder.split('.');
			var obj = coureTimeline;
			var index = 0;
			for(var key in splitedElementOrder){
				obj = obj[splitedElementOrder[key]];
				
				index++;

				if(angular.equals(index,splitedElementOrder.length) && obj){
					if(obj.evaluable){
						angular.forEach(obj.evaluator, function(evaluator){
							if(angular.equals(evaluator.roleMappingId, rm_id)){
								console.log(obj);
								$scope.batchObj.materialList.push({Name:obj.elements[0].value ,elementCode:obj.code})
							}	
						});
					}
					
				}
			}
		});
	});

	$scope.cousrseMaterialSelected = function(data){
		console.log(data);
	};


}]);