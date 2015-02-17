angular.module('baabtra').directive('questionViewer',['$compile','questionAnsweringSrv', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'=',
			index:'=',
			courseElement:'='
		},
		templateUrl: 'angularModules/courseElementFields/questionViewer/directives/Directive-questionViewer.html',
		link: function(scope, element, attrs, fn) {
			var index=scope.index;
			var tlPointInmins=scope.courseElement.tlPointInMinute;
			var keyName=scope.courseElement.Name;

			var updateKey=tlPointInmins+'.'+keyName+'.'+




			console.log(scope.courseElement);
			scope.randomKey=Math.floor(Math.random()*1000000);
			scope.mark=0;
			scope.userAnswer={};
			var unbind=scope.$watch('data',function (argument) {
				scope.question=scope.data.value;

				var answerArea=$('#answers'+scope.randomKey);
				if(scope.question.type=='objective'){
					var optionsElem=$('<objective-options>');
					    optionsElem.attr('options',JSON.stringify(scope.question.options));
					    optionsElem.attr('answer-type',JSON.stringify(scope.question.answerType));
					    optionsElem.attr('answer',JSON.stringify(scope.question.answer));
					    optionsElem.attr('mark-scored','mark');
					    optionsElem.attr('user-answer','userAnswer');
					    optionsElem.attr('mark-obj',JSON.stringify(scope.question.mark));
					answerArea.append(optionsElem);
					$compile(optionsElem)(scope);
				}
			},true);
			
		}
	};
}]);
