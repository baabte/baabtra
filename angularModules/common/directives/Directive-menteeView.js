angular.module('baabtra').directive('menteeView', function() {
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
			"text": "<i class=\"fa fa-download\"></i>&nbsp;View mentees",
			"click": "fnViewMentees()"
			},
			{
			"text": "<i class=\"fa fa-globe\"></i>&nbsp;Mark attendance",
			 "click": "fnMarkAttendance()"
			},
			{
			"text": "<i class=\"fa fa-external-link\"></i>&nbsp;Assign a course material",
			"click": "fnAssignMaterial()"

			},
			{
			"text": "<i class=\"fa fa-external-link\"></i>&nbsp;Evalute",
			"click": "fnEvaluate()"

			}/*,
			{
			"divider": true
			},
			{
			"text": "Separated link",
			"href": "#separatedLink"
			}*/
			];
		}
	};
});
