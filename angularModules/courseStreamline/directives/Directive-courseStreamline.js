angular.module('baabtra').directive('courseStreamline', function() {
	return {
		restrict: 'E',
		scope: {
			previewData:'='
		},
		templateUrl: 'angularModules/courseStreamline/directives/Directive-courseStreamline.html',
		link: function(scope, element, attrs, fn) {
		}
	};
});
