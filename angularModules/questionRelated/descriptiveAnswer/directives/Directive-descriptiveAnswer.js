angular.module('baabtra').directive('descriptiveAnswer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			primary:'=',
			secondary:'=',
			userAnswer:'=',
			markScored:'=',
			dbAnswer:'='
		},
		templateUrl: 'angularModules/questionRelated/descriptiveAnswer/directives/Directive-descriptiveAnswer.html',
		link: function(scope, element, attrs, fn) {
			scope.enteredAnswer={};
			scope.primaryForm={};
			scope.primaryForm.fields=[];
			var primaryLoop=0;
			for(primaryLoop;primaryLoop<scope.primary.length;primaryLoop++){
				scope.primaryForm.fields.push(angular.fromJson(JSON.parse(scope.primary[primaryLoop].Debug)));
			}

		}
	};
});
