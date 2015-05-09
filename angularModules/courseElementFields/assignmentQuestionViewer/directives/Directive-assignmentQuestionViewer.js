angular.module('baabtra').directive('assignmentQuestionViewer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			courseElement:'=',
			courseId:'=',
			showSubmitButton:'@',
		},
		templateUrl: 'angularModules/courseElementFields/assignmentQuestionViewer/directives/Directive-assignmentQuestionViewer.html',
		link: function(scope, element, attrs, fn) {
			scope.questionData={}
			scope.questionData.value=JSON.parse(scope.data).value.question;
			// //scope.data = JSON.parse(scope.data);
			// scope.question = JSON.stringify(scope.data.value.question);

		}
	};
});
