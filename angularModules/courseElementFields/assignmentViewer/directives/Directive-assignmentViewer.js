angular.module('baabtra').directive('assignmentViewer',  ['$rootScope','$state','assignmentFunctions',function($rootScope, $state, assignmentFunctions) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/assignmentViewer/directives/Directive-assignmentViewer.html',
		link: function(scope, element, attrs, fn) {

		
//_______________________________________________________________________________________________

		//looping in the elements array of the assignment object to hide the question's individual submit button 
		var elementArray = angular.copy(scope.$parent.previewData.elements);
		
		
		var currentElement;		
		for (var i in elementArray)	{
			 currentElement = elementArray[i];
			 if(!angular.equals(currentElement,null)){
			 	if(angular.equals(currentElement.type, 'question-viewer')){
			 	
			 		// create a custom attributes array if it does not exist
			 		if(angular.equals(currentElement.customAttributes, undefined)){
			 			currentElement.customAttributes = {};
			 		}

			 		if(angular.equals(currentElement.customAttributes['show-submit-button'],undefined)){
			 			currentElement.customAttributes['show-submit-button'] ='false';
			 		}

			 		//get the total marks for the assignment
			 	    if (angular.equals(scope.totalMarks, undefined)){
			 	    	scope.totalMarks = 0;
			 	    }			 	   
			 		scope.totalMarks = parseInt(scope.totalMarks) + parseInt(currentElement.value.mark.totalMark);

			 	}
			 }
		}
 


 //_______________________________________________________________________________________________
 
  // function to save the answer of the assignment
  scope.submitAssignment = function(submitStatus) {



  	//an array to save the answer objects
  	var answerArray = [];
  	var totalMarksScored = 0;
  	for (var i in elementArray)	{
			 currentElement = elementArray[i];
			 if(!angular.equals(currentElement,null)){
			 	
			 	if(angular.equals(currentElement.type, 'question-viewer')){			 		
			 	
			 		scope.$parent.childElementScopes[i].saveAnswer(function (argument) {		 			
			 			//changing the submit status of the answer
			 			argument.answer.submitStatus = submitStatus;			 			

			 			answerArray.push(argument);
			 			
			 		})

			 		totalMarksScored = parseInt(totalMarksScored) + parseInt(currentElement.value.markScored);

			 		
			 	}
			 }
	}

	

	//check for and apply penalties
	if(angular.equals(submitStatus,'submitted')) {		
		if(checkAndApplyPenalty){			
			findPenalty();
			if(penaltyHistory.length > 0){

				totalMarksScored = applyPenalty(totalMarksScored);
			}

					
		}
	}
     

     // building the object to be saved in database
     var objToBeSaved = {};
 
 	 objToBeSaved.objDetails = scope.$parent.previewData;
     objToBeSaved.lastUpdatedBy = $rootScope.userinfo.ActiveUserData.roleMappingObj._id;
     objToBeSaved.markScored = totalMarksScored;
     objToBeSaved.status = submitStatus;
     objToBeSaved.answerArray = answerArray
     objToBeSaved.courseMappingId = $state.params.courseMappingId;

     var statusHistory = [];
     if(!angular.equals(scope.$parent.previewData.statusHistory, undefined) && !angular.equals(scope.$parent.previewData.statusHistory, null)){
     	
     	statusHistory = angular.copy(scope.$parent.previewData.statusHistory);
     }

     var date = new Date();
     statusHistory.push({changedFrom:scope.$parent.previewData.status, changedTo:submitStatus, changedBy:$rootScope.userinfo.ActiveUserData.roleMappingObj._id, changedOn:date});

     objToBeSaved.statusHistory = statusHistory;
     objToBeSaved.penaltyHistory = penaltyHistory;


     
     var response = assignmentFunctions.fnSubmitAssignment(objToBeSaved);
     
     response.then(function(response){

     	response = angular.fromJson(JSON.parse(response.data));
     	
     	if(angular.equals(response.result,"success")) {
     	  scope.status = submitStatus;
     	}

     });


  }

 //_______________________________________________________________________________________________

	// -----------------------------------------------------------------------------------------------------
	//function to check whether penalty is applicable
	var checkAndApplyPenalty = false;
	var timeDiff = 0;
    
    var checkForPenalty = function() {		

			

				//checking if there is an assigned date
				if(!angular.equals(scope.$parent.previewData.assignedDate,undefined)){		

					var assignedDate = new Date(scope.$parent.previewData.assignedDate);
					assignedDate = assignedDate.getTime();
					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					
					if(sumbittedDate > assignedDate){
						checkAndApplyPenalty = true;
						timeDiff = Math.abs(sumbittedDate - assignedDate);
					}
																																																											
				
				
				} else{
					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					
					var courseAssignedDate = new Date(scope.$parent.previewData.courseAssignedDate);
					courseAssignedDate = courseAssignedDate.getTime();
					
					var tlPoint = parseInt(scope.$parent.previewData.tlPointInMinute)*60*1000;
					
					if(sumbittedDate > (courseAssignedDate + tlPoint)){
						checkAndApplyPenalty = true;
						timeDiff = Math.abs(sumbittedDate - (courseAssignedDate + tlPoint));	
				}
					
			}
			
			
		
	}
// -----------------------------------------------------------------------------------------------------

// function to apply penalty
var penaltyHistory;
var findPenalty = function() {	

	penaltyHistory = [];

    if (!angular.equals(scope.$parent.previewData.penaltyHistory,undefined) && !angular.equals(scope.$parent.previewData.penaltyHistory,null)){
		penaltyHistory = angular.copy(scope.$parent.previewData.penaltyHistory);
	}
	
	var penaltyArray = scope.data.value.penaltyArray;
				


	// a metrics for the calculation in accordance with the late time units 
	var calculationMetrics = {hours:3600000,
							  days:86400000,
							  months:2592000000};	

	//finding out the applicable penalty obj
	for (var i in penaltyArray){
		currentPenaltyObj =penaltyArray [i];
		

		var currentDuration = parseInt(currentPenaltyObj.lateTime)*(calculationMetrics[currentPenaltyObj.lateTimeUnits]);

		if(angular.equals(scope.$parent.previewData.status,"to be resubmitted")){

			if(angular.equals(currentPenaltyObj.submissionMode,"re-submitted")){
				//pushing the penalty object into the penalty array
				penaltyHistory.push(currentPenaltyObj);
			}

			if(angular.equals(currentPenaltyObj.submissionMode,"re-submission is late")){
				if(timeDiff>currentDuration){
						//pushing the penalty object into the penalty array
						penaltyHistory.push(currentPenaltyObj);
				}
			}			

			return;
		}


		if(timeDiff>currentDuration){			
			//pushing the penalty object into the penalty array
			penaltyHistory.push(currentPenaltyObj);
		}
	}

	

	
 	
	return;
			
}

// -----------------------------------------------------------------------------------------------------

//function to apply the penalty
var applyPenalty = function(totalMarks){


	

	//calculating the reduction marks
	var reduce = 0;

	for (var i in penaltyHistory){
	

	var currentPenalty = penaltyHistory[i];

		//if an exemption is set manually for applying the  skip that object
    	if(!angular.equals(currentPenalty.exemptRule, undefined)){
			if(currentPenalty.exemptRule){
				continue;
			}
		}

		if(currentPenalty.blockSubmission){
			scope.blockSubmission = true;
		}

		

		if(angular.equals(currentPenalty.penaltyCalculationUnit,"% of marks")){
			
			reduce = totalMarks*(currentPenalty.reductionUnits/100);
		}
		else if (angular.equals(currentPenalty.penaltyCalculationUnit,"times of marks")){
			reduce = totalMarks*currentPenalty.reductionUnits;
		}
		else if (angular.equals(currentPenalty.penaltyCalculationUnit,"marks")){
			reduce = currentPenalty.reductionUnits;
		}

		

		//multiplying the reduction marks with the frequency
		if(angular.equals(currentPenalty.penaltyCalculationUnit,"each day delayed")){
			var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			reduce = reduce*diffDays;
		}

		totalMarks = totalMarks - reduce;
	}
	
 	
	return totalMarks;	

}
// -----------------------------------------------------------------------------------------------------

//function to block the submission if penalty is applicable
var fnBlockSubmission = function(){



	var currentAppliedPenalty = {};
    
    for (var i in penaltyHistory) {

    	currentAppliedPenalty = penaltyHistory[i];

    	//if an exemption is set manually for blocking submission skip that object
    	if(!angular.equals(currentAppliedPenalty.exemptBlocking, undefined)){
			if(currentAppliedPenalty.exemptBlocking){
				//continue;
			}
		}
		else{
			//if not exempted block the submission
			if(currentAppliedPenalty.blockSubmission){
				scope.blockSubmission = true;
				scope.penaltyMessage = 'Submission is blocked for this assignment because you are late by ' + currentAppliedPenalty.lateTime + ' ' + currentAppliedPenalty.lateTimeUnits + ' in submission';
			}

		}
    }
	
}
// -----------------------------------------------------------------------------------------------------

//function to show or hide the from parameter based on selected values
			scope.fnShowBlockSubmission = function(blockSubmission) {

				if (blockSubmission) {
					return "block submission and ";
				}
				else{
					return "";
				}
			}

// -----------------------------------------------------------------------------------------------------



//check for penalty in the assignment level
checkForPenalty();

//if penalty is applicable, find the applicable penalties
if(checkAndApplyPenalty){
	findPenalty();
}

//if there are penalties applicable, block the submission if the rule implies blocking of submission
if(penaltyHistory.length > 0){
	fnBlockSubmission();
}



		}//.End link
	};//.End return
}]);
