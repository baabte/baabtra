angular.module('baabtra').directive('attendanceMenteeList',['attendenceService', function(attendenceService) {
	return {
		restrict: 'E',
		replace: true,
		required:"ngModel",
		scope: {
			exclusionList:"=",
			timeLineObj:"=",
			searchText:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-attendanceMenteeList.html',
		link: function(scope, element, attrs, fn) {
			scope.$watch('timeLineObj',function(){
				console.log(scope.timeLineObj);
				if(angular.equals(scope.timeLineObj.courseElement.excludeList,undefined)){
					scope.timeLineObj.courseElement.excludeList=[];
				}
			});

			
			//marking attendence function will triger on click
			scope.fnMarkAttendence=function(user){	
				//console.log(courseElement.courseElement.attendence);
				console.log(scope.timeLineObj);
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

			
		}
	};
}]);
