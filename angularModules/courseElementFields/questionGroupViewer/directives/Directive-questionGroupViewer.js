angular.module('baabtra').directive('questionGroupViewer', function() {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionGroupViewer/directives/Directive-questionGroupViewer.html',
		link: function(scope, element, attrs, fn) {
			


		}
	};
});
