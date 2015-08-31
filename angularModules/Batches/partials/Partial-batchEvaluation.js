angular.module('baabtra').controller('BatchevaluationCtrl',['$scope','$rootScope','$state','viewBatches','$stateParams','$alert' ,'commonService','candidateCourseFullView','$modal',function($scope,$rootScope, $state,viewBatches,$stateParams,$alert, commonService,candidateCourseFullView,$modal){

  /*login detils start*/
var courseMappingId;
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/
  var userId = $state.params.userId;
	$scope.batchObj = {};
	$scope.batchObj.rm_id = $scope.rm_id;
	$scope.batchMappingId = $state.params.batchMappingId;
	 /*login detils ends*/

		 $scope.lastViewedOrder=0;
		 $scope.lastElement=true;
		 $scope.totalMark=0;
		 $scope.markScored=0;

		 $scope.getElementClicked = false;

	

	if(!angular.equals($scope.batchMappingId,"")){

	var loadCourseMaterialsDDl = viewBatches.loadCourseMaterials4batchAtt($scope);
	loadCourseMaterialsDDl.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.batchObj.batchDetails = result.courseBatchObj;
		
		var usersList = [];
		for(var user in result.courseBatchObj.users){
			
			usersList.push(result.courseBatchObj.users[user].fkUserRoleMappingId.$oid);
			if(angular.equals(result.courseBatchObj.users.length, usersList.length)){
				var courseId = result.courseBatchObj.fkCourseId.$oid;
				var courseDetailsResponse = viewBatches.LoadUserCourseDetails(usersList, courseId);
				courseDetailsResponse.then(function(response){

					$scope.batchObj.courseDetails = angular.fromJson(JSON.parse(response.data));
					// usersId=$scope.batchObj.courseDetails[0]["id"];
					if($state.params.courseId){
						
						for(var coursCount in $scope.batchObj.courseDetails){
							if(angular.equals($state.params.courseId, $scope.batchObj.courseDetails[coursCount].
								_id.$oid)){
								$scope.batchObj.selectedCourse = $scope.batchObj.courseDetails[coursCount];
								$scope.batchObj.elementOrderArray = Object.keys($scope.batchObj.selectedCourse.elementOrder);
							}
						}
					}
					
				});
			}
		}


		$scope.batchObj.materialList = [];
		// var coureTimeline = $scope.batchObj.batchDetails.courseTimeline;
		// angular.forEach($scope.batchObj.batchDetails.elementOrder, function(elementOrder){

		// 	var splitedElementOrder = elementOrder.split('.');
		// 	var obj = coureTimeline;
		// 	var index = 0;
		// 	for(var key in splitedElementOrder){
		// 		obj = obj[splitedElementOrder[key]];
				
		// 		index++;

		// 		if(angular.equals(index,splitedElementOrder.length) && obj){
		// 			if(obj.evaluable){
		// 				angular.forEach(obj.evaluator, function(evaluator){
		// 					if(angular.equals(evaluator.roleMappingId, rm_id)){
		// 						
		// 						$scope.batchObj.materialList.push({Name:obj.elements[0].value ,elementCode:obj.code})
		// 					}	
		// 				});
		// 			}
					
		// 		}
		// 	}
		// });
	});
	
	}

	if($state.params.courseId){

						for(var coursCount in $scope.batchObj.courseDetails){
							if(angular.equals($state.params.courseId, $scope.batchObj.courseDetails[coursCount].
								_id.$oid)){
								$scope.batchObj.selectedCourse = $scope.batchObj.courseDetails[coursCount];
							}
						}
					}
	// var courseMappingId = $state.params.courseMappingId;


	$scope.evaluateTrainee = function(course,id){
		
		$scope.batchObj.selectedCourse = course;
		$scope.batchObj.selectedCourse = id;
		var usersId=course.fkUserLoginId.$oid;
				courseMappingId=course._id.$oid;
				$state.go('home.main.menteeEvaluation',{courseId:courseMappingId,userId:usersId});
			   
           
		
		
		
  };

// if (!$state.params.userId) {
// 	console.warn("var usersId = $state.params.userId does not exist");
// }
// else{
// 	var usersId = $state.params.userId;
// 	// var courseMappingId = $state.params.courseMappingId;
//   		    var courseMappingIdResponse = viewBatches.getcourseMappingId(usersId);
// 			courseMappingIdResponse.then(function(response){

// 				res = angular.fromJson(JSON.parse(response.data));
// 				console.log(res["_id"]["$oid"]);
// 				courseMappingId=res["_id"]["$oid"];
// 			});
// 			userLoginId=usersId;
			
// 	 	var gotCourseSyllabus4CandidateView=candidateCourseFullView.getCourseSyllabus4CandidateView(usersId,courseMappingId);
// 		gotCourseSyllabus4CandidateView.then(function (data) {		    	
      
// 		    	 $scope.candidateCourse=angular.fromJson(JSON.parse(data.data));
// 		    	 console.log(angular.fromJson(JSON.parse(data.data)));
// 		});
// 		$scope.$watch('selectedElement',function(){

// 		if((!angular.equals($scope.selectedElement.element.order,undefined))&&(!angular.equals($scope.selectedElement.element.ElementOrder,undefined))){

// 		orders=$scope.selectedElement["element"]["ElementOrder"];
// 		console.log(orders);
// 		var courseDetailsResponse = viewBatches.LoadUserCourseevaluation(courseMappingId,orders);
// 			courseDetailsResponse.then(function(response){

// 				$scope.course = angular.fromJson(JSON.parse(response.data));
// 				// $scope.course = result;
// 				$scope.courseMappingId=courseMappingId;
// 				$scope.rm_id=rm_id;
// 				console.log(angular.fromJson(JSON.parse(response.data)));
// 			});
// 		}

// 		},true);
	
// }


}]);