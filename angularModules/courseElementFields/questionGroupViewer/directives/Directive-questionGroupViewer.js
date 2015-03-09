angular.module('baabtra').directive('questionGroupViewer',['$rootScope','bbConfig','$state','testRelated',function($rootScope,bbConfig,$state,testRelated) {
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
			var courseMappingId;
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
				courseMappingId=$state.params.courseMappingId;
				scope.isMentee=true;
				if(scope.courseElement.testStartTime){
					scope.startTest=true;
				}
			}
			if(roleId===bbConfig.CURID){
				scope.startTest=true;
			}

			scope.dataValue= JSON.parse(scope.data);
			// console.log(scope.dataValue);
			

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

			scope.startTimer=function(){
				var time=(new Date()).getTime();

				var StartTimeObj={courseMappingId:courseMappingId,userLoginId:userLoginId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex,timeObj:{key:'testStartTime',value:time}};

				var FnSaveTestStartTimeCallBack= testRelated.FnSaveTestStartTime(StartTimeObj);

				FnSaveTestStartTimeCallBack.then(function(data){

				 var result=angular.fromJson(JSON.parse(data.data));
				 scope.startTest=true;
				// console.log(result);
				});

			};

			scope.submitTest=function(){
				var time=(new Date()).getTime();
				var SubmitTestObj={courseMappingId:courseMappingId,userLoginId:userLoginId,keyName:keyName,tlPointInmins:tlPointInmins,outerIndex:outerIndex,innerIndex:innerIndex,userAnswers:scope.questionAnswer};
				
				

				// var FnSubmitTestCallBack= testRelated.FnSubmitTest(SubmitTestObj);

				// FnSubmitTestCallBack.then(function(data){

				//  var result=angular.fromJson(JSON.parse(data.data));
				//  scope.startTest=true;
				// console.log(result);
				// });


			};

			// for (var i = 0; i < 10; i++) {
				
			// 	var time=(new Date()).getTime();
			// 	console.log(time);
			// 	};

			//this function is used to format the date from milliseconds
			scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
			};


			//for pagination next button
			scope.questionChangeNext=function(start,stop){
				scope.start=stop;
				scope.stop+=scope.questionPerPage;
				if (scope.stop>scope.noOfQuestions) {
					scope.stop=scope.noOfQuestions;
				}
			};

			//for pagination previous button
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
