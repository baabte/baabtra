angular.module('baabtra').controller('AssigncoursematerialCtrl',['$scope','$rootScope','assignCourseMaterial','$stateParams',function($scope,$rootScope,assignCourseMaterial,$stateParams){

	$scope.courseObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.courseObj.courseList=angular.fromJson(JSON.parse(response.data));
			console.log($scope.courseObj.courseList);
		});
	});

}]);