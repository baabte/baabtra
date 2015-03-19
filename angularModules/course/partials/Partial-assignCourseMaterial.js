angular.module('baabtra').controller('AssigncoursematerialCtrl',['$scope','$rootScope','assignCourseMaterial','$stateParams',function($scope,$rootScope,assignCourseMaterial,$stateParams){

	$scope.courseObj={};
	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
		$scope.urmId=$stateParams.userId;
		loadCourseDDl.then(function(response){ //promise for batch load
			$scope.courseObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
			$scope.courseObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
		});
	});

	$scope.assignCourseMaterial2timeline=function(){

		angular.forEach($scope.courseObj.courseMaterials,function(element){
				$scope.courseObj.existCourseObj.courseTimeline[element.key]=element.courseElem;
				
				for(keyNew in element.elemOrder){
					if(element.elemOrder[keyNew].indexOf(element.key+'.')==0){
						$scope.courseObj.existCourseObj.elementOrder[keyNew]=element.elemOrder[keyNew];
						//$scope.courseObj.courseMaterials.courseObj.elementOrder[keyNew]=element.elemOrder[keyNew];
					}
					
				}
		});
		//console.log($scope.courseObj.courseMaterials);
		assignResponse=assignCourseMaterial.assignCourseMaterial2timeline($scope);
		assignResponse.then(function(response){ //promise for batch load
			if(angular.fromJson(JSON.parse(response.data))=='success'){
				$alert({title: "Success", content: 'Sucessfully Added course material to user Timeline' , placement: 'top-right',duration:3, type: 'info'});
			}
		});
	};

	


}]);