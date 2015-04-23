angular.module('baabtra').directive('resultView', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userObject:"=",
			companyObject:"="
		},
		templateUrl: 'angularModules/Result/directives/Directive-resultView.html',
		link: function(scope, element, attrs, fn) {
			scope.data = {};
			scope.data.user = {};
			scope.data.grandTotal = 0;
			scope.data.siNo=0;
		}
	};
});
