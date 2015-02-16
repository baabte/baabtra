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
		scope: { // should take an input object to bind the output
			question:'=ngModel'
		},
		templateUrl: 'angularModules/formGenFields/questionField/directives/Directive-questionField.html',
		link: function(scope, element, attrs, fn) {


			//output plain text from html
			scope.outputPlainText=function(str){
				if(!angular.equals(str,undefined)){
					return str.trim().replace(/<[^>]+>/gm, '');
				}

			};


			scope.questionTypeChange=function (type) {
				if(type=='objective'){
					scope.question.answerType="singleAnswer";
				}
				else if(type=='descriptive'){
					delete scope.question.answerType;
					delete scope.question.options;
				}
			};

			scope.question={};
			scope.question.type="objective";
			scope.question.answerType="singleAnswer";
			scope.question.mark={};

		}
	};
});
