angular.module('baabtra').directive('assignmentViewer',['$rootScope','$state','assignmentFunctions','$alert','$modal',function($rootScope, $state, assignmentFunctions,$alert,$modal) {
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
		var exceptionArray = ['question-viewer', 'assignment-question-viewer'];
		//looping in the original parent object to calculate the marks, any change in the parent scope will force the respective directive to load once more as it will trigger a watch on the parent scope. That is the reason why we are taking a copy of the parnet scope in the line above. But here we want the watch to trigger as it has to modify a custom property on the question directive which will hide the submit button.		
		for (var i in scope.$parent.previewData.elements)	{
			 currentElement = scope.$parent.previewData.elements[i];
			 if(!angular.equals(currentElement,null)){

			 	if(!angular.equals(exceptionArray.indexOf(currentElement.type), -1)){


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
  scope.submitAssignment = function(submitStatus, $hide) {

  	
  	var totalMarksScored = 0;

  	for (var i in elementArray)	{
			 currentElement = elementArray[i];
			 if(!angular.equals(currentElement,null)){
			 	
			 	if(!angular.equals(exceptionArray.indexOf(currentElement.type), -1)){

			 		 		
			 		//calling the save answer function in the question viewer directive, but here we want the submit status to be saved as draft or whatever status which is sent from here, so if that function is passed with an argument, the function will replce those keys with the values passed from here.
			 		var evStatus = 2;
			 		if(angular.equals(submitStatus,"submitted")){
			 			evStatus = 0;
			 		}
			 		scope.$parent.childElementScopes[i].saveAnswer({submitStatus:submitStatus,
			 			evaluated:evStatus});


			 		if(!angular.equals(currentElement.value.markScored, undefined)){

			 			totalMarksScored = parseInt(totalMarksScored) + parseInt(currentElement.value.markScored);
			 		}
			 		
			 	}
			 }
	}

	

	//check for and apply penalties
	if(angular.equals(submitStatus,'submitted')) {		
		if(scope.checkAndApplyPenalty){			
			assignmentFunctions.findPenalty(scope);
			if(scope.penaltyHistory.length > 0){
				totalMarksScored = assignmentFunctions.applyPenalty(scope,  totalMarksScored);
			}

					
		}
	}
     

     // building the object to be saved in database
     var objToBeSaved = {};
 
 	 objToBeSaved.objDetails = scope.$parent.previewData;
     objToBeSaved.lastUpdatedBy = $rootScope.userinfo.ActiveUserData.roleMappingObj._id;
     objToBeSaved.markScored = totalMarksScored;
     objToBeSaved.status = submitStatus;
     //objToBeSaved.answerArray = answerArray
     objToBeSaved.courseMappingId = $state.params.courseMappingId;

     var statusHistory = [];
     if(!angular.equals(scope.$parent.previewData.statusHistory, undefined) && !angular.equals(scope.$parent.previewData.statusHistory, null)){
     	
     	statusHistory = angular.copy(scope.$parent.previewData.statusHistory);
     }

     var date = new Date();
     statusHistory.push({changedFrom:scope.$parent.previewData.status, changedTo:submitStatus, changedBy:$rootScope.userinfo.ActiveUserData.roleMappingObj._id.$oid, changedOn:date});

     objToBeSaved.statusHistory = statusHistory;
     objToBeSaved.penaltyHistory = scope.penaltyHistory;

   
    var response = assignmentFunctions.fnSubmitAssignment(objToBeSaved);
     
     response.then(function(response){

     	response = angular.fromJson(JSON.parse(response.data));
     	
     	if(angular.equals(response.result,"success")) {

     		if(angular.equals(submitStatus, 'draft')){
			$alert({title:'Success',content:'All changes have been saved', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});

     		}
     		else{
     			$alert({title:'Success',content:'The assignment has been submitted. Your assignment will be evaluated by the concerned evaluator soon', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});
     		}


     	  //changing the submit status in the scope. This will disable the save and submit button
     	  scope.status = submitStatus;


     	}
     	else{


     		if(angular.equals(submitStatus, 'draft')){
			$alert({title:'Error',content:'Sorry, some error occurred in saving the current changes. Please retry', placement:'top-right', duration:'8', animation:'am-fade-and-slide-bottom', type:'danger', show:true});

     		}
     		else{
     			$alert({title:'Error',content:'Sorry, some error occurred in submitting the assignment, please retry', placement:'top-right', duration:'8', animation:'am-fade-and-slide-bottom', type:'danger', show:true});
     		}

     	}

     });

	$hide();
  }

 //_______________________________________________________________________________________________

	//function to check whether penalty is applicable
	scope.checkAndApplyPenalty = false;
	scope.timeDiff = 0;
    // array to hold the penalty history
	scope.penaltyHistory = [];
// -----------------------------------------------------------------------------------------------------

//function to block the submission if penalty is applicable
var fnBlockSubmission = function(){



	var currentAppliedPenalty = {};
    
    for (var i in scope.penaltyHistory) {

    	currentAppliedPenalty = scope.penaltyHistory[i];

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
//this function is used to format the date from milliseconds
	scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
	}; 

// block the submission if the assignment is already submitted
 if(angular.equals(scope.$parent.previewData.status, 'submitted')){
    	scope.blockSubmission = true;

    	scope.penaltyMessage = "Submitted on " + scope.convertDate(scope.$parent.previewData.submittedOn.$date).day + ', ' + scope.convertDate(scope.$parent.previewData.submittedOn.$date).time;
    }

   
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
//if block submission is true, don't show the penalty frequency
			scope.fnShowPenaltyFrequency = function(rule){

				if (rule.blockSubmission) {
					return "";
				}
				else{
					return "for" + rule.penaltyFrequency;
				}
				
			}
// -----------------------------------------------------------------------------------------------------
// Pre-fetch an external template populated with a custom scope
   var submitModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentViewer/modals/submitConfirmation.html', show: false,placement:'center'});
 // Show when some event occurs (use $promise property to ensure the template has been loaded)

// ask for confirmation while submitting
scope.askConfirmation = function(){
	submitModal.$promise.then(submitModal.show);
}

// -----------------------------------------------------------------------------------------------------


//check for penalty in the assignment level
assignmentFunctions.checkForPenalty(scope);



//if penalty is applicable, find the applicable penalties
if(scope.checkAndApplyPenalty){
	assignmentFunctions.findPenalty(scope);
}

//if there are penalties applicable, block the submission if the rule implies blocking of submission
if(scope.penaltyHistory.length > 0){
	fnBlockSubmission();
}



		}//.End link
	};//.End return
}]);
