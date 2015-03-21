angular.module('baabtra').controller('MenteeattendanceCtrl',['$scope','$rootScope','viewBatches','$stateParams','$alert','assignCourseMaterial',function($scope,$rootScope,viewBatches,$stateParams,$alert,assignCourseMaterial){

	$scope.menteeObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		$scope.urmId=$stateParams.userId;
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.menteeObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
			$scope.menteeObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
		});
	});

	$scope.$watch('selectedCourse',function(){
		loadCourseMaterialsDDl=viewBatches.loadCoursesMaterials4menteeAtt($scope);
		loadCourseMaterialsDDl.then(function(response){ //promise for batch load
			var outcomeObj=angular.fromJson(JSON.parse(response.data));
			if(!angular.equals(outcomeObj,'notfound')){
				$scope.menteeObj.userCourseList=outcomeObj.userCourseList;
				$scope.menteeObj.userCourseElementlist=outcomeObj.userCourseElementlist;
				$scope.status=true;
			}
			else{
				$scope.status=false;
			}
			//$scope.menteeObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
		});
	});

}]);