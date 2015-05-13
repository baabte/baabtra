angular.module('baabtra').directive('questionViewerEv',['$modal', function($modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"=",
			//added by Anoop show assignment related options when the question happens to be inside an assignment
			fromAssignment:"=",
			result:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionViewerEv/directives/Directive-questionViewerEv.html',
		link: function(scope, element, attrs, fn) {

		
			// Anoop . **** these are the things required when the question is appearing inside an assignment
			//scope.fromAssignment = JSON.parse(scope.fromAssignment);

			// creating the preview data object to be shown as answer, the primary answer array is set as the elements property(array) of the preview data object
			scope.answerPreviewData = {};
			scope.answerPreviewData.elements = [];
			if(scope.data.value.userAnswer){
				for(key in scope.data.value.userAnswer[0].primaryAnswer){
				scope.answerPreviewData.elements.push(scope.data.value.userAnswer[0].primaryAnswer[key]);
			}
			}
			



			if(angular.equals(typeof scope.result ,'String')){
				scope.result = JSON.parse(scope.result);
			}

			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			
			

			scope.markChanged = function(mark){
				
				if(!angular.equals(mark, undefined)){	
					console.log(scope.result);
					//scope.$parent.elementMark = 0;
					scope.result.data.markScored = scope.data.value.markScored;
					scope.result.data.value.markScored = scope.data.value.markScored;
					scope.$parent.elementMark = scope.$parent.elementMark +  scope.result.data.markScored;
					

				}

			};

			// //setting up a watch on the markscoredObject of data to update the total marks scored
			// scope.$watch('data.value.markScored', function(){
			// 		alert('hi')
			// 	scope.result.data.markScored = scope.data.value.markScored;

			// });


			// Pre-fetch an external template populated with a custom scope
   			var submitModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentQuestionViewer/modals/showImage.html', show: false,placement:'center'});
 			// Show when some event occurs (use $promise property to ensure the template has been loaded)

			// show the enlarged version of the image in a popup
			scope.showImage = function(mode){	

				
				if (angular.equals(mode,'input')){

					scope.imgToBeShown = scope.fromAssignment.value.inputImage;
				}
				else if (angular.equals(mode,'output')) {
					scope.imgToBeShown = scope.fromAssignment.value.outputImage;
				}
				
				submitModal.$promise.then(submitModal.show);
			}


		}
	};
}]);
