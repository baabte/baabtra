angular.module('baabtra').directive('assignmentViewer', function() {
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
		var elementArray = scope.$parent.previewData.elements;
		
		
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

			 			totalMarksScored = totalMarksScored + parseInt(currentElement.value.markScored);

			 			answerArray.push(argument);
			 			
			 		})

			 	}
			 }
	}

	// -----------------------------------------------------------------------------------------------------
		//applying penalty rules
		//if(angular.equals(submitStatus,'submitted')) {

				var checkAndApplyPenalty = false;
				//checking if there is an assigned date
				if(!angular.equals(scope.$parent.previewData.assignedDate,undefined)){
					
					var assignedDate = new Date(scope.$parent.previewData.assignedDate);
					assignedDate = assignedDate.getTime();
					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					
					if(sumbittedDate > assignedDate){
						checkAndApplyPenalty = true;
						var timeDiff = Math.abs(sumbittedDate - assignedDate);
					}
																																																											
				//var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				
				} else{
					
					var sumbittedDate = new Date();
					sumbittedDate = sumbittedDate.getTime();
					
					var courseAssignedDate = new Date(scope.$parent.previewData.courseAssignedDate);
					courseAssignedDate = courseAssignedDate.getTime();
					
					var tlPoint = parseInt(scope.$parent.previewData.tlPointInMinute)*60*1000;
					
					if(sumbittedDate > (courseAssignedDate + tlPoint)){
						checkAndApplyPenalty = true;
						var timeDiff = Math.abs(sumbittedDate - (courseAssignedDate + tlPoint));	
				}
					
			}

			// if(checkAndApplyPenalty && totalMarksScored > 0){
				var penaltyArray = scope.data.value.penaltyArray;

				console.log(penaltyArray);
			// }


		//}
// -----------------------------------------------------------------------------------------------------


	

  }

 //_______________________________________________________________________________________________

		}
	};
});
