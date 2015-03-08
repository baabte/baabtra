angular.module('baabtra').directive('questionGroupViewer',['$rootScope','bbConfig','$state',function($rootScope,bbConfig,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:'@',
			index:'=',
			courseElement:'='
		},
		templateUrl: 'angularModules/courseElementFields/questionGroupViewer/directives/Directive-questionGroupViewer.html',
		link: function(scope, element, attrs, fn) {
			var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId; // Role id of logged user
			var userLoginId;
			var courseId;
			var innerIndex=scope.index;
			var outerIndex=scope.courseElement.index;
			var tlPointInmins=scope.courseElement.tlPointInMinute;
			var keyName=scope.courseElement.Name;
			var evStatus=0;
			var isDescriptive=false;
			scope.isMentee=false;
			scope.start=0;
			scope.questionAnswer=[];
			

			//if user is mentee copying all required datas 
			if(roleId===bbConfig.MURID){
				userLoginId=$rootScope.userinfo.userLoginId;
				courseId=$state.params.courseId;
				scope.isMentee=true;
			}
			if(roleId===bbConfig.CURID){
				scope.startTest=true;
			}

			scope.dataValue= JSON.parse(scope.data);
			
			if (angular.equals(scope.questionAnswer.length,0)){
			scope.noOfQuestions=scope.dataValue.value.testModel.length;
			for (var i = 0; i < scope.noOfQuestions; i++) {
				var obj={};
				scope.questionAnswer.push(obj);
			}
			}
			if(angular.equals(scope.dataValue.value.questionView.mode,'multiple')){
				scope.questionPerPage=scope.dataValue.value.questionView.questionPerPage;
				scope.stop=scope.questionPerPage;
			}
			else{
				scope.questionPerPage=scope.noOfQuestions;
				scope.stop=scope.questionPerPage;
			}

			scope.questionChangeNext=function(start,stop){
				scope.start=stop;
				scope.stop+=scope.questionPerPage;
				if (scope.stop>scope.noOfQuestions) {
					scope.stop=scope.noOfQuestions;
				}
			};
			scope.questionChangePrevious=function(start,stop){
				scope.stop=start;
				scope.start-=scope.questionPerPage;
				
				if (scope.stop>scope.noOfQuestions) {
					scope.stop=scope.noOfQuestions;
				}
			};

			 scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };
            


		}
	};
}]);
