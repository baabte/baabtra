angular.module('baabtra').directive('feedbackViewer',['$rootScope','bbConfig','$compile',function ($rootScope,bbConfig,$compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			feedbackForm:'=',
			feedbackResponse:'='
		},
		templateUrl: 'angularModules/feedback/feedbackViewer/directives/Directive-feedbackViewer.html',
		link: function(scope, element, attrs, fn) {

			var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId; // Role id of logged user
			
			var isDescriptive=false;
			scope.isMentee=false;

			//if user is mentee copying all required datas 
			if(roleId===bbConfig.MURID){
				// userLoginId=$rootScope.userinfo.userLoginId;
				// courseId=$state.params.courseId;
				scope.isMentee=true;
			}

			
			//this function is used to format the date from milliseconds
			scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
			};



			//For creating element with unique ID
			scope.randomKey=Math.floor(Math.random()*1000000);

			
			//initializing mark
			scope.markScored=0;
			
			//this is to format the data attribute of this directive into JSON object
			scope.$watch('feedbackForm',function (argument) {
				if(!(scope.feedbackForm instanceof Object)){
					scope.feedbackForm=JSON.parse(scope.feedbackForm);					
				}
				scope.feedback=scope.feedbackForm;
				
				
						
			 	scope.feedbackResponse.userResponse=[];		
			 			
						scope.feedback.answer=scope.feedback.options;

				
				//Creating directive elements according to type of question
				var answerArea=$('#answers'+scope.randomKey);
				if(scope.feedback.type=='objective'){

					var optionsElem=$('<objective-options>');
					    optionsElem.attr('options',"feedback.options");
					    optionsElem.attr('answer-type',"feedback.answerType");
					    optionsElem.attr('answer',"feedback.answer");
					    optionsElem.attr('mark-scored','markScored');
					    optionsElem.attr('user-answer','feedbackResponse.userResponse');
					    optionsElem.attr('db-answer','dbAnswer');
					    optionsElem.attr('mark-obj',JSON.stringify({totalMark:0}));
					answerArea.html(optionsElem);
					$compile(optionsElem)(scope);
								
				}
				

			},true);
		
			// scope.$watch('feedbackResponse.userResponse',function (argument) {
			// 	for(var index in scope.feedbackResponse.userResponse){
			// 		for(var opindex in scope.feedback.options){
			// 			if(angular.equals(scope.feedback.options[opindex].Name,scope.feedbackResponse.userResponse[index])){
			// 				scope.feedbackResponse.userResponseIndex.push();
			// 			}

			// 		}
			// 	}

			// },true);


	
    	
			


		}
	};
}]);
