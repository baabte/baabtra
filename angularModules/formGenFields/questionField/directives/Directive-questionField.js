/* 
    Created by:lijin
    Created on:13-02-2015
    use: This can be used for displaying question input
    Example:"<question-field></question-field>"
    required attributes:
*/


angular.module('baabtra').directive('questionField', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: { // should take an input object to bind the output

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
