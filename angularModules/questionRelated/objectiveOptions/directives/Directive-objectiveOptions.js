angular.module('baabtra').directive('objectiveOptions', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			options:'=',
			answerType:'=',
			answer:'=',
			markScored:'=',
			markObj:'=',
			userAnswer:'='
		},
		templateUrl: 'angularModules/questionRelated/objectiveOptions/directives/Directive-objectiveOptions.html',
		link: function(scope, element, attrs, fn) {
			scope.selectedAnswer=[];
			scope.markScored=0;
			scope.$watch('selectedAnswer',function () {
				var answerList=angular.copy(scope.answer);
				scope.userAnswer=angular.copy(scope.selectedAnswer);
				var count=0;
				var correctAnswer=0;
				while(answerList.length!=0&&scope.selectedAnswer.length>count){

					if(answerList[0].Name==scope.selectedAnswer[count]){
						correctAnswer++;
						answerList.splice(0,1);
					}
					
					count++;
					
				}

				while(scope.userAnswer.indexOf('')!=-1){
					var indexNum=scope.userAnswer.indexOf('');
					scope.userAnswer.splice(indexNum,1);
				}

				if(correctAnswer==scope.answer.length&&scope.userAnswer.length==correctAnswer){
					scope.markScored=scope.markObj.totalMark;
				}
				else{
					scope.markScored=0;
				}
			},true);

		}
	};
});
