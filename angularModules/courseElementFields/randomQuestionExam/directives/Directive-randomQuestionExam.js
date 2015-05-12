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
			scope.duration={unit:"minute(s)"};
			scope.units=['minute(s)','hour(s)'];
			scope.mark={totalMark:{}};
			scope.resultMode={};
			scope.questionView={};
			}
			else{
			scope.mark=scope.ngModel.mark;
			scope.duration=scope.ngModel.duration;
			scope.units=['minute(s)','hour(s)'];
			scope.resultMode=scope.ngModel.resultMode;
			scope.questionView=scope.ngModel.questionView;

			}


		}
	};
});
