angular.module('baabtra').directive('questionViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionViewerEv/directives/Directive-questionViewerEv.html',
		link: function(scope, element, attrs, fn) {

			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			console.log(scope.result.data);


		}
	};
});