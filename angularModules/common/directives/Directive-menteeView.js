angular.module('baabtra').directive('menteeView',['$state', function($state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menteeObj:"=",
			actionFlag:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-menteeView.html',
		link: function(scope, element, attrs, fn) {

			scope.actions = [
			{
			"text": "<i class=\"fa fa-user\"></i>&nbsp;View profile",
			 "click": "fnViewProfile()"
			},
			{
			"text": "<i class=\"fa fa-globe\"></i>&nbsp;View course",
			 "click": "fnViewCourse()"
			},
			{
			"text": "<i class=\"fa fa-globe\"></i>&nbsp;Mark attendance",
			 "click": "fnMarkAttendance()"
			},
			{
			"text": "<i class=\"fa fa-paperclip\"></i>&nbsp;Assign a course material",
			"click": "fnAssignMaterial()"

			},
			{
			"text": "<i class=\"fa fa-external-link\"></i>&nbsp;Evalute",
			"click": "fnEvaluate()"

			}
			];

			//function to view the profile
			scope.fnViewProfile=function(){
				$state.go("home.main.userProfile",{userId:scope.menteeObj.fkUserLoginId.$oid});
			};

			//function to view course
			scope.fnViewCourse=function(){
				$state.go("home.main.course",{courseId:scope.menteeObj.fkCourseId.$oid});
			};

			//function to view course
			scope.fnAssignMaterial=function(){
				$state.go("home.main.assignCourseMaterial",{userId:scope.menteeObj.fkUserRoleMappingId.$oid});
			};
		}
	};
}]);
