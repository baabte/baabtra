angular.module('baabtra').directive('randomQuestionExam', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/randomQuestionExam/directives/Directive-randomQuestionExam.html',
		link: function(scope, element, attrs, fn) {
			if(angular.equals(scope.ngModel,undefined)){	

			scope.units=['minute(s)','hour(s)'];
			scope.ngModel={};
			scope.ngModel.duration={unit:"minute(s)"};
			scope.ngModel.mark={};
			}
			


		}
	};
});
