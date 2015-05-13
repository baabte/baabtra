angular.module('baabtra').directive('randomQuestionExam', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/randomQuestionExam/directives/Directive-randomQuestionExam.html',
		link: function(scope, element, attrs, fn) {
			scope.units=['minute(s)','hour(s)'];

			if(angular.equals(scope.ngModel,undefined)){

			scope.randomExam={};
			scope.randomExam.duration={unit:"minute(s)"};
			scope.randomExam.mark={};
			scope.randomExam.questionView={mode:'single'};
			scope.randomExam.resultMode='submit';
			scope.randomExam.testModel=[];
			
			}else{
			scope.randomExam=angular.copy(scope.ngModel);

			}

			 scope.$watch(function(){return scope.randomExam;},function(){

			 	scope.ngModel=angular.copy(scope.randomExam);

			 },true)

			


		}
	};
});
