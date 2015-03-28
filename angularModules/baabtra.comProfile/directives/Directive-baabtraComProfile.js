angular.module('baabtra').directive('baabtraComProfile',function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userLoginId:'='
		},
		templateUrl: 'angularModules/baabtra.comProfile/directives/Directive-baabtraComProfile.html',
		link: function(scope, element, attrs, fn) {

			console.log(scope.userLoginId);
		}
	};
});
