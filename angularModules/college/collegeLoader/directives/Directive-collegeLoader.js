angular.module('baabtra').directive('collegeLoader',['collegeServices','$rootScope', function(collegeServices,$rootScope) {
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
}]);
