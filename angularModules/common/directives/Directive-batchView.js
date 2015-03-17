angular.module('baabtra').directive('batchView',['$filter', function($filter) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			batch:"=",
			actionFlag:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-batchView.html',
		link: function(scope, element, attrs, fn) {
			
			scope.$watch('batch',function(){

				scope.actions = [
				{
				"text": "<i class=\"fa fa-users\"></i>&nbsp;View mentees",
				"click": "fnViewMentees()"
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

				if(scope.batch.batchMode=="onetime"){
					scope.description = '<div class="text-xs">Starting date '+$filter('date')(scope.batch.startDate.startDate)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />Duration:'+scope.batch.seats+'days</div>';
				}else{
					scope.description = '<div class="text-xs">Starting date '+$filter('date')(scope.batch.startDate.startDate)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />Duration: Repeats each '+scope.batch.repeats.repeatsAfter+'days</div>';
				}
			});


		}
	};
}]);
