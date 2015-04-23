angular.module('baabtra').controller('AllocateevaluatorCtrl',['$scope', '$rootScope', '$state', 'commonService', 'allocateEvaluator', function ($scope, $rootScope, $state, commonService, allocateEvaluator){

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

  $scope.data = {};   
  var loadCoureBatchResponse = allocateEvaluator.LoadCoureBatchByBatchId($state.params.batchMappingId, companyId);
  loadCoureBatchResponse.then(function(response){
  	var coureBatch = angular.fromJson(JSON.parse(response.data));
  	$scope.data.courseTimeline = coureBatch.courseTimeline;
  });//data.expandDetails = element.evaluator[$index]

  $scope.expandDetails = function(expandElem){
  	if(!angular.equals($scope.data.expandDetails, expandElem)){
  		$scope.data.expandDetails = expandElem;
  	}else{
  		$scope.data.expandDetails = "";
  	}
  };

  $scope.data.elementList = [];

  $scope.elementCheckBoxChange = function(element, elementCheckBox){
  	
  	if(elementCheckBox){
  		$scope.data.elementList.push(element);
  	}
  	else{

  		for(var elem in $scope.data.elementList){
  			if(angular.equals($scope.data.elementList[elem].code, element.code)){
  				$scope.data.elementList.splice(elem, 1);
  			}  			
  		}
  	}
  };

  $scope.saveEvaluatorList = function(){
  	
  	angular.forEach($scope.data.elementList, function(element){
  		var elem = $scope.data.courseTimeline[element.tlPointInMinute][element.Name][element.index];
  		if(angular.equals(elem.evaluator,undefined)){
  			elem.evaluator = [];
  		}
  		elem.evaluator.push($scope.data.evaluator[0]);

  		$scope.data.elementList = [];
  		$scope.data.elementCheckBox = [];
  	})
  };

}]);