angular.module('baabtra').directive('questionField', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'angularModules/formGenFields/questionField/directives/Directive-questionField.html',
		link: function(scope, element, attrs, fn) {


			//output plain text from html
			scope.outputPlainText=function(str){
				if(!angular.equals(str,undefined)){
					return str.trim().replace(/<[^>]+>/gm, '');
				}

			};

			scope.question={};
			scope.question.type="objective";
			scope.question.answerType="singleAnswer";

		}
	};
});
