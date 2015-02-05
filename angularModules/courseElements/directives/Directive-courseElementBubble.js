angular.module('baabtra').directive('courseElementBubble', function() {
	return {
		restrict: 'E',
		templateUrl: 'angularModules/courseElements/directives/Directive-courseElementBubble.html',
		link: function(scope, element, attrs, fn) {
			scope.count = 1;
			console.log(scope.count);

			scope.viewAllBubble = function(length){
				scope.count = length;
			}
		}
	};
});
