angular.module('baabtra').directive('questionViewer',['$compile','questionAnsweringSrv','$rootScope','$state', function($compile,questionAnsweringSrv,$rootScope,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
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
			var evStatus=0;
			scope.isMentee=false;
			if(roleId==3){
				userLoginId=$rootScope.userinfo.userLoginId;
				courseId=$state.params.id;
				scope.isMentee=true;
			}

			scope.saveAnswer=function (argument) {
				
				var promise=questionAnsweringSrv.saveAnswer(courseId,userLoginId,keyName,tlPointInmins,outerIndex,innerIndex,{userAnswer:scope.userAnswer,markScored:scope.mark,evaluated:evStatus});
				promise.then(function (data) {
					data=angular.fromJson(JSON.parse(data.data));
					if(data.success){
						scope.question.userAnswer=scope.userAnswer;
						scope.dbAnswer=scope.userAnswer;
						scope.question.markScored=scope.mark;
					}
				});
			};
			



			//console.log(scope.courseElement);
			scope.randomKey=Math.floor(Math.random()*1000000);

			

			scope.mark=0;
			var unbind=scope.$watch('data',function (argument) {
				if(!(scope.data instanceof Object)){
					scope.data=JSON.parse(scope.data);					
				}
				// else{
				// 	unbind();
				// 	return 0;
				// }
				scope.question=scope.data.value;

				//if(!angular.equals(scope.data,undefined))
				{
					if(scope.question.userAnswer){

						scope.dbAnswer=scope.question.userAnswer;
					}
					//else{

						scope.userAnswer=[];
					//}

				var answerArea=$('#answers'+scope.randomKey);
				if(scope.question.type=='objective'){
					evStatus=1;
					var optionsElem=$('<objective-options>');
					    optionsElem.attr('options',"question.options");
					    optionsElem.attr('answer-type',"question.answerType");
					    optionsElem.attr('answer',"question.answer");
					    optionsElem.attr('mark-scored','mark');
					    optionsElem.attr('user-answer','userAnswer');
					    optionsElem.attr('db-answer','dbAnswer');
					    optionsElem.attr('mark-obj',JSON.stringify(scope.question.mark));
					answerArea.html(optionsElem);
					$compile(optionsElem)(scope);
					//scope.$digest();
				}
				else if(scope.question.type=='descriptive'){
					evStatus=0;
					var descriptiveElem=$('<descriptive-answer>');
						descriptiveElem.attr('primary','question.primaryAnswer');
						descriptiveElem.attr('user-answer','userAnswer');
						descriptiveElem.attr('mark-scored','mark');
						descriptiveElem.attr('db-answer','dbAnswer');
						console.log('descriptive',scope.randomKey);
					answerArea.html(descriptiveElem);
					$compile(descriptiveElem)(scope);
				}
				}
			},true);
			
		}
	};
}]);
