angular.module('baabtra').directive('courseSelector', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:'='
		},
		templateUrl: 'angularModules/common/courseSelector/directives/Directive-courseSelector.html',
		link: function(scope, element, attrs, fn) {
			scope.ngModel={};
			scope.ngModel.batch={};
			



		}
	};
});
