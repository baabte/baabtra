angular.module('baabtra').directive('assignmentViewerEv',  ['$rootScope','$state','assignmentFunctions',function($rootScope, $state, assignmentFunctions) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/assignmentViewerEv/directives/Directive-assignmentViewerEv.html',
		link: function(scope, element, attrs, fn) {

		
//_______________________________________________________________________________________________

		// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

	//looping in the elements array of the assignment object to hide the question's individual submit button 
		var elementArray = angular.copy(scope.$parent.previewData.elements);
		
		
		var currentElement;
		//looping in the original parent object to calculate the marks, any change in the parent scope will force the respective directive to load once more as it will trigger a watch on the parent scope. That is the reason why we are taking a copy of the parnet scope in the line above. But here we want the watch to trigger as it has to modify a custom property on the question directive which will hide the submit button.		
		for (var i in scope.$parent.previewData.elements)	{
			 currentElement = scope.$parent.previewData.elements[i];
			 if(!angular.equals(currentElement,null)){
			 	if(angular.equals(currentElement.type, 'question-viewer')){


			 		//get the total marks for the assignment
			 	    if (angular.equals(scope.totalMarks, undefined)){
			 	    	scope.totalMarks = 0;
			 	    }			 	   
			 		scope.totalMarks = parseInt(scope.totalMarks) + parseInt(currentElement.value.mark.totalMark);

			 	}
			 }
		}
 


 //_______________________________________________________________________________________________
   

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
	//function to show the status if a penalty rule is applicable 
	scope.fnShowPenaltyAppliedStatus = function(rule){
		for (var i in scope.$parent.previewData.penaltyHistory){
			if(angular.equals(rule, scope.$parent.previewData.penaltyHistory[i])){
				return true;
			}
		}

		return false;
	}
// -----------------------------------------------------------------------------------------------------

//function to set the totalMarks object when the markscored in any of the elements inside the assignment object changes
 scope.fnCalulateTotalMarks = function(){


 	//initialising the mark object, if the assignment already has marks (as a result of objective questions which will be assessed on submission), we should start off with that mark
	 	scope.result.data.markScored = 0;
	 	
	 	if(!angular.equals(scope.$parent.previewData.markScored, undefined)){
	 		scope.result.data.markScored = parseInt(scope.$parent.previewData.markScored);
	 	} 	
 
 	// Looping throuth the elemets in the elements array, if any element has a markscored value defied, that will be added to the total mark scored for the assignment
 		for (var i in scope.$parent.result){
 			var curElement = scope.$parent.result[i];

 			if(!angular.equals(curElement.data.markScored,undefined) && !angular.equals(curElement.data.markScored,{})){		

 				if(!angular.equals(curElement.data.markScored[0],undefined)){ 				
 					scope.result.data.markScored = scope.result.data.markScored +  parseInt(curElement.data.markScored[0]);

 					scope.result.data.markScored = assignmentFunctions.applyPenalty(scope.$parent.previewData,  scope.result.data.markScored);

 				} 			

 			}

 		}


 		scope.result.data.markScored = scope.result.data.markScored.toFixed(2)


 		return scope.result.data.markScored.toFixed(2);

 }

// -----------------------------------------------------------------------------------------------------
//setting up a watch on the elements array to sense the change in the mark scored bject in each element to run the function that calculates the total marks of the assignment
	
	scope.$watch('fnCalulateTotalMarks()', function(){});

// -----------------------------------------------------------------------------------------------------




		}//.End link
	};//.End return
}]);
