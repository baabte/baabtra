angular.module('baabtra').controller('AssigncoursematerialCtrl',['$scope','$rootScope','assignCourseMaterial','$stateParams','$alert', 'commonService', 'addCourseService',function($scope,$rootScope,assignCourseMaterial,$stateParams,$alert,  commonService, addCourseService){

	
	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.assignCourseObj = {};
	$scope.assignCourseObj.userrmId = $stateParams.userId;

	loadCourseDDl = assignCourseMaterial.loadCourses4AssigningCourseMaterial(companyId, $stateParams.userId);
	loadCourseDDl.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.assignCourseObj.courses = [];
		for(var course in result.courses){
			$scope.assignCourseObj.courses.push({"text":result.courses[course].Name,"click":"loadCourseMatrials(\""+result.courses[course].fkCourseId.$oid+"\")"});
		}
		if(angular.equals(result.courses.length,1)){
			$scope.loadCourseMatrials(result.courses[0].fkCourseId.$oid);
		}
	});

	$scope.loadCourseMatrials = function(courseId){
		$scope.batchObj = {};
		$scope.batchObj.courseId = courseId;
		var promise = assignCourseMaterial.loadCourses4AssigningCourseMaterialStudent(courseId, $scope.assignCourseObj.userrmId);
	  	promise.then(function(response){
	  		var result = angular.fromJson(JSON.parse(response.data));
	  		$scope.assignCourseObj.selectedCourse = result.course;
	  		$scope.batchObj.courseName = result.course.Name;
	  		$scope.batchObj.selectedList = [];
			$scope.batchObj.selectedCourseList = [];
			$scope.batchObj.batchDetails = result.userCourse;
			$scope.batchObj.course  = $scope.assignCourseObj.selectedCourse
			

			//$scope.batchObj.courseTimeline=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.batchObj.userArray=angular.fromJson(JSON.parse(response.data)).userList;
			$scope.batchObj.userList=angular.fromJson(JSON.parse(response.data)).userDetails;
			
			$scope.batchObj.assignedList = [];
			$scope.batchObj.unAssignedList = [];


			var elementOrderLength = Object.keys($scope.batchObj.course.elementOrder).length;
			
			for (var elemCount = 0; elemCount < elementOrderLength; elemCount++) {

				
				if($scope.batchObj.course.elementOrder[elemCount])
				{
					var elementArray = $scope.batchObj.course.elementOrder[elemCount].split(".");
					var element = $scope.batchObj.batchDetails.courseTimeline;
					for(var elemOrder in elementArray){
						if(!angular.equals(element, undefined)){
							element = element[elementArray[elemOrder]];
						}
					}


					if(!angular.equals(element, undefined) &&  !angular.equals(element, '')){
						if(!angular.equals(element.code, undefined)){
							$scope.batchObj.assignedList.push({courseElement:element});
						}
					}
					else{
						var unAssignedElement = $scope.batchObj.course.courseTimeline;

						for(var elemOrder in elementArray){
							
							if(!angular.equals(unAssignedElement[elementArray[elemOrder]], undefined)){
								unAssignedElement = unAssignedElement[elementArray[elemOrder]];
							}
							
						}
						if(!angular.equals(unAssignedElement.code, undefined)){
							
							$scope.batchObj.unAssignedList.push({Name:unAssignedElement.elements[0].value,elementOrder:$scope.batchObj.course.elementOrder[elemCount],userCourseElementType:unAssignedElement.Name,innerIndex:unAssignedElement.index,tlpoint:unAssignedElement.tlPointInMinute,courseElement:unAssignedElement});
						}
					}
				}
			}
	  	});
	  };

	  $scope.clickedOnElement = function (element){
		
		

		if(angular.equals(element.ticked,undefined)){
			element.ticked = true;
		}
		else{
			element.ticked = !element.ticked;
		}
		if(angular.equals(element.ticked,true)){
			$scope.batchObj.selectedCourseList.push(element);
		}
		else{
			if(!angular.equals($scope.batchObj.selectedCourseList.indexOf(element),-1)){
				$scope.batchObj.selectedCourseList.splice($scope.batchObj.selectedCourseList.indexOf(element),1);
			}
		}
	};

	$scope.assignCourseMaterials4Batch=function(){
		$scope.batchObj.assignedButton = true;
		//getting blacklist users
		$scope.excludeList=[];
			for (key in $scope.batchObj.userArray) { //loop to get the unselected users
	 			var value = $scope.batchObj.userArray[key];
	 			if (angular.equals($scope.batchObj.selectedList.indexOf(value.$oid),-1)) {
	   				$scope.excludeList.push(value.$oid);
	 			}
		}

		//adding exluded list
		angular.forEach($scope.batchObj.selectedCourseList,function(element,key){
			$scope.batchObj.selectedCourseList[key].courseElement.excludeList=$scope.excludeList;
		});


		var assignCourseMaterialsResponse = assignCourseMaterial.assignCourseMaterial2timeline($scope.batchObj.courseId, $scope.assignCourseObj.userrmId, $scope.batchObj.selectedCourseList);
		assignCourseMaterialsResponse.then(function(response){ //promise for batch load
			var result=angular.fromJson(JSON.parse(response.data));
			
			
			if(angular.equals(result,'success')){
				$alert({title: "Success", content: 'Sucessfully Added course material to this batch' , placement: 'top-right',duration:3, type: 'info'});
				
				var selectedCourseList = angular.copy($scope.batchObj.selectedCourseList);
				for(var assignedElement in selectedCourseList){
					$scope.batchObj.assignedList.push({courseElement:selectedCourseList[assignedElement].courseElement});
					
					for(var unAssignedIndex in  $scope.batchObj.unAssignedList){

						if(angular.equals($scope.batchObj.unAssignedList[unAssignedIndex].elementOrder, selectedCourseList[assignedElement].elementOrder)){
							
							$scope.batchObj.unAssignedList.splice(unAssignedIndex,1);
						}
					}
					$scope.batchObj.selectedCourseList = [];
					$scope.batchObj.assignedButton = false;
				}
			}
		});

	};

	// $scope.courseObj={}; //main object
	// $rootScope.$watch('userinfo',function(){ //to load the urmid and company id from userinfo object which present in rootscope.
	// 	$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	// 	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	// 	loadCourseDDl=assignCourseMaterial.loadCourses4AssigningCourseMaterial($scope,$stateParams.userId);
	// 	$scope.urmId=$stateParams.userId;
	// 	loadCourseDDl.then(function(response){ //promise for batch load
	// 		$scope.courseObj.courseList=angular.fromJson(JSON.parse(response.data)).courseList;
	// 		$scope.courseObj.existCourseObj=angular.fromJson(JSON.parse(response.data)).courseObj;
	// 		$scope.courseObj.profile=angular.fromJson(JSON.parse(response.data)).profile;
	// 	});
	// });

	$scope.assignCourseMaterial2timeline=function(){

		//response to the assign course material
		assignResponse=assignCourseMaterial.assignCourseMaterial2timeline($scope);
		assignResponse.then(function(response){ //promise for batch load
			if(angular.fromJson(JSON.parse(response.data))=='success'){
				$alert({title: "Success", content: 'Sucessfully Added course material to user Timeline' , placement: 'top-right',duration:3, type: 'info'});
			}
		});
	};

	


}]);