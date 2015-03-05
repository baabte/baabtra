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
			console.log(scope.courseElement);
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

			//if user is mentee copying all required datas 
			if(roleId===bbConfig.MURID){
				userLoginId=$rootScope.userinfo.userLoginId;
				courseId=$state.params.courseId;
				scope.isMentee=true;
			}

			scope.dataValue= JSON.parse(scope.data);
			console.log(scope.dataValue);
			scope.noOfQuestions=scope.dataValue.value.testModel.length;
			
			if(angular.equals(scope.dataValue.value.questionView.mode,'multiple')){
				scope.questionPerPage=scope.dataValue.value.questionView.questionPerPage;
				console.log(scope.questionPerPage);
			}
			else{
				scope.questionPerPage=scope.noOfQuestions
			}

			

			console.log(scope.dataValue.value.testModel);
			 scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };


		}
	};
}]);
