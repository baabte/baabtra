angular.module('baabtra').directive('questionViewer',['$compile','questionAnsweringSrv','$rootScope','$state', function($compile,questionAnsweringSrv,$rootScope,$state) {
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
			var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
			var userLoginId;
			var courseId;
			var innerIndex=scope.index;
			var outerIndex=scope.courseElement.index;
			var tlPointInmins=scope.courseElement.tlPointInMinute;
			var keyName=scope.courseElement.Name;
			scope.isMentee=false;
			if(roleId==3){
				userLoginId=$rootScope.userinfo.ActiveUserData.userLoginId;
				courseId=$state.params.id;
				scope.isMentee=true;
			}

			scope.saveAnswer=function (argument) {
				//ObjectId(data['courseId']),ObjectId(data['userId']),data['key'],data['index'],data['answerObj']
				var promise=questionAnsweringSrv.saveAnswer(courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex,{userAnswer:scope.userAnswer,markScored:scope.mark});
				promise.then(function (data) {
					data=angular.fromJson(JSON.parse(data.data));
					if(data.success){
						scope.question.userAnswer=scope.userAnswer;
						scope.question.markScored=scope.mark;
					}
				});
			};
			


			


			




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
