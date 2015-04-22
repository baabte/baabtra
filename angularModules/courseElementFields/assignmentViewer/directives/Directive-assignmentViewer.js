angular.module('baabtra').directive('assignmentViewer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/assignmentViewer/directives/Directive-assignmentViewer.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
