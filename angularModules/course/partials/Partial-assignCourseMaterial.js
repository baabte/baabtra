angular.module('baabtra').controller('AssigncoursematerialCtrl',['$scope','$rootScope','assignCourseMaterial','$stateParams',function($scope,$rootScope,assignCourseMaterial,$stateParams){

	$scope.courseObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		$scope.urmId=$stateParams.userId;
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.courseObj.courseList=angular.fromJson(JSON.parse(response.data));
			
		});
	});

	$scope.assignCourseMaterial2timeline=function(){
		assignResponse=assignCourseMaterial.assignCourseMaterial2timeline($scope);
		assignResponse.then(function(response){ //promise for batch load
			//$scope.courseObj.courseMaterialList=angular.fromJson(JSON.parse(response.data));
		});
	};

}]);