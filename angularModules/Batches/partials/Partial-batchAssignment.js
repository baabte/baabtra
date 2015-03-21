angular.module('baabtra').controller('BatchassignmentCtrl',['$scope','viewBatches','$rootScope','$stateParams','$alert',function($scope,viewBatches,$rootScope,$stateParams,$alert){

	$scope.batchObj={};

	$rootScope.$watch('userinfo',function(){
		$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		loadBatchDetails=viewBatches.loadBatchMentees($scope,$stateParams.batchMappingId);
		$scope.batchMappingId=$stateParams.batchMappingId;
		loadBatchDetails.then(function(response){ //promise for batch load
			$scope.batchObj.selectedList = [];
			
			$scope.batchObj.batchDetails=angular.fromJson(JSON.parse(response.data)).batchList;
			//$scope.batchObj.courseTimeline=angular.fromJson(JSON.parse(response.data)).courseObj;
			$scope.batchObj.userArray=angular.fromJson(JSON.parse(response.data)).userList;
			$scope.batchObj.userList=angular.fromJson(JSON.parse(response.data)).userDetails;
		});
	});

	$scope.assignCourseMaterials4Batch=function(){
		var entities=[];
		for (key in $scope.batchObj.userArray) { //loop to get the unselected users
 			var value = $scope.batchObj.userArray[key];
 			if (angular.equals($scope.batchObj.selectedList.indexOf(value.$oid),-1)) {
   				entities.push(value.$oid);
 			}
		}
		
		//loop to build the courseTimeline object
		angular.forEach($scope.batchObj.selectedCourseList,function(element){
				//$scope.batchObj.batchDetails.courseTimeline[element.key]=element.courseElem;
				if(angular.equals($scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]],undefined)){

					$scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]]={};
				}
				if(angular.equals($scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]][element.structureArr[1]],undefined)){
					$scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]][element.structureArr[1]]=[];
				}
				if(angular.equals($scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]],undefined)){

					$scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]]={};
					
				}

				$scope.batchObj.batchDetails.courseTimeline[element.structureArr[0]][element.structureArr[1]][element.structureArr[2]]=element.courseElem;

				for(var keyNew in element.elemOrder){
					if(element.elemOrder[keyNew].indexOf(element.key+'.')==0){
						$scope.batchObj.batchDetails.elementOrder[keyNew]=element.elemOrder[keyNew];
						
					}
					
				}
		});

		angular.forEach($scope.batchObj.batchDetails.courseTimeline, function(elements, key){

			angular.forEach(elements, function(element,key2){
				
					if(angular.equals(typeof element,"object")){

						angular.forEach(element, function(elem,key3){
							if(!angular.equals(elem.Name,"Payment_checkpoint")){
								//scope.summaryDetails.push({code:elem.code, Name:elem.elements[0].value,elem:elem,courseElem:elements,key:key,elemOrder:scope.course.elementOrder}); //[Math.ceil(key*scope.summaryViewIn.mFactor)]
								$scope.batchObj.batchDetails.courseTimeline[key][key2][key3]['excludedList']=entities;
								
							}
							
						})
					}
			});
		});		
		

		var assignCourseMaterialsResponse=viewBatches.assignCourseMaterials4Batch($scope);
		assignCourseMaterialsResponse.then(function(response){ //promise for batch load
			var result=angular.fromJson(JSON.parse(response.data));
			if(angular.equals(result,'success')){
				$alert({title: "Success", content: 'Sucessfully Added course material to this batch' , placement: 'top-right',duration:3, type: 'info'});
			}
		});

	};
}]);