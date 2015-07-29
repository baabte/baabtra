angular.module('baabtra').directive('collegeLoader',['','$rootScope', function(,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			outModel:"="
		},
		templateUrl: 'angularModules/college/collegeLoader/directives/Directive-collegeLoader.html',
		link: function(scope, element, attrs, fn) {
			console.log(scope.outModel);




		}
	};
});
