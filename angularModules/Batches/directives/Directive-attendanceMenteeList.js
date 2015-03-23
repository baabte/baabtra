angular.module('baabtra').directive('attendanceMenteeList',['attendenceService','$aside', function(attendenceService,$aside) {
	return {
		restrict: 'E',
		replace: true,
		required:"ngModel",
		scope: {
			exclusionList:"=",
			timeLineObj:"=",
			searchText:"=",
			pageType:"=",
			evalutorId:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-attendanceMenteeList.html',
		link: function(scope, element, attrs, fn) {
			scope.$watch('timeLineObj',function(){
				
				if(!angular.equals(scope.timeLineObj,undefined)){
					if(angular.equals(scope.timeLineObj.courseElement.excludeList,undefined)){
						scope.timeLineObj.courseElement.excludeList=[];
					}
				}
			});

			
			//marking attendence function will triger on click
			scope.fnMarkAttendence=function(user){	
				//console.log(courseElement.courseElement.attendence);
				
				var markAttendencePromise=attendenceService.markAttendence(user._id.$oid,scope.timeLineObj.tlpoint,scope.timeLineObj.userCourseElementType,scope.timeLineObj.innerIndex,scope.timeLineObj.courseElement.attendence);
				markAttendencePromise.then(function(data){
			    var result=angular.fromJson(JSON.parse(data.data));
				

				});
			};
			//converting back to day
			scope.changeminutes2day=function(minutes) {
				var day= Math.ceil((minutes/60)/24);
				return day;
			};

			//function to view the aside window for evaluation 
			scope.fnEvaluate=function(userMappingId){
				 var evaluateMentee=$aside({scope: scope,animation:'am-fade-and-slide-top',placement:'top', template: 'angularModules/Batches/partials/aside-evaluation.html',show:true });
				 scope.evalId=userMappingId+'.'+scope.timeLineObj.tlpoint+'.'+scope.timeLineObj.userCourseElementType+'.'+scope.timeLineObj.innerIndex;
				 
			};
			
		}
	};
}]);
