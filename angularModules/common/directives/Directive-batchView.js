angular.module('baabtra').directive('batchView',['$filter','$state', function($filter,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			batch:"=",
			actionFlag:"=",
			shadow: "="
		},
		templateUrl: 'angularModules/common/directives/Directive-batchView.html',
		link: function(scope, element, attrs, fn) {
			//if(angular.equals(scope.shadow,undefined)){
			scope.shadow=true;
			//}

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
						scope.description = '<div class="text-xs">Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />End date: '+$filter('date')(scope.batch.endDate.$date)+'</div>';
					}else{
						var days=scope.batch.repeats.every;
						scope.description = '<div class="text-xs">Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />Duration: Repeats each '+days+' months</div>';
					}

					//function to add course materials
					scope.fnAssignMaterial=function(){
						$state.go("home.main.batchAssignment",{batchMappingId:scope.batch._id.$oid});
					};


				});


		}
	};
}]);
