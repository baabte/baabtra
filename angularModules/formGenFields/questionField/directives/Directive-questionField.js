/* 
    Created by:lijin
    Created on:13-02-2015
    use: This can be used for displaying question input
    Example:"<question-field ng-model="question"></question-field>"
    required attributes: ng-model
*/


angular.module('baabtra').directive('questionField',['courseElementFieldsManaging', function(srvCrs) {
	return {
		restrict: 'E',
		scope: { // should take an input object to bind the output
			question:'=ngModel'
		},
		templateUrl: 'angularModules/formGenFields/questionField/directives/Directive-questionField.html',
		link: function(scope, element, attrs, fn) {


			//setting default tab
			scope.selectedTab='question';
			//output plain text from html
			scope.outputPlainText=function(str){
				if(!angular.equals(str,undefined)){
					return str.trim().replace(/<[^>]+>/gm, '');
				}

			};


			scope.answerTypes=[];
			var gotCourseElements=srvCrs.fnGetCourseElementFields();
			gotCourseElements.then(function (data) {
				var courseElems=angular.fromJson(JSON.parse(data.data));
				var loopIter=0;
				for ( loopIter;loopIter<courseElems.length; loopIter++) {

					if (!angular.equals(courseElems[loopIter].canBeAnAnswer,undefined)) {
						if (courseElems[loopIter].canBeAnAnswer==true) {
							var elem={Debug:courseElems[loopIter].Debug,Name:courseElems[loopIter].DispalyName,icon:courseElems[loopIter].icon};
						    scope.answerTypes.push(elem);
						}
					}
				}
			});


			//we should create a duplicate copy of options object otherwise unwanted properties from multi select will go to database
			scope.$watch('question.options',function () {
				scope.optionsTemp=angular.copy(scope.question.options);
			},true);

			//this is for managing object design according to expected answer type
			scope.questionTypeChange=function (type) {
				if(type=='objective'){
					scope.question.answerType="singleAnswer";
				}
				else if(type=='descriptive'){
					delete scope.question.answerType;
					delete scope.question.options;
				}
			};

			//initializing toway bindable objects
			scope.question={};
			// scope.question.type="objective";
			// scope.question.answerType="singleAnswer";
			scope.question.mark={};

		}
	};
}]);
