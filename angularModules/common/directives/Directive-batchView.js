angular.module('baabtra').directive('batchView',['$filter','$state', function($filter,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			batch:"=",
			actionFlag:"=",
			specificOption:"=",
			shadow: "="
		},
		templateUrl: 'angularModules/common/directives/Directive-batchView.html',
		link: function(scope, element, attrs, fn) {
			scope.$watch('batch',function(){

				scope.actions = [
				/*{
				"text": "<i class=\"fa fa-users\"></i>&nbsp;View mentees",
				"click": "fnViewMentees()"
				},*/
				{
				"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Mark attendance",
				 "click": "fnMarkAttendance()"
				},
				{
				"text": "<i class=\"fa fa-paperclip\"></i>&nbsp;Assign a course material",
				"click": "fnAssignMaterial()"

				},
				{
				"text": "<i class=\"fa fa-check\"></i>&nbsp;Evalute",
				"click": "fnEvaluate()"

				},
				{
				"text": "<i class=\"mdi-social-person-add hidden-xs\"></i>&nbsp;Allocate Evaluator",
				"click": "fnAllocateEvaluator()"

				}
				];
				
				/*if(scope.batch.batchMode=="onetime"){
					scope.description = 'Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />End date: '+$filter('date')(scope.batch.endDate.$date);
				}else{
					var days=scope.batch.repeats.every;
					scope.description = 'Starting date '+$filter('date')(scope.batch.startDate.$date)+'<br />Total joinings:'+scope.batch.totalJoining+'<br />Duration: Repeats each '+days+' months';
				}*/

				scope.dateConvertion=function(date){
					return $filter('date')(date);
				};


				//function to add course materials
				scope.fnAssignMaterial=function(){
					$state.go("home.main.batchAssignment",{batchMappingId:scope.batch._id.$oid});
				};

				//function to load the mark the batch attendance 
				scope.fnMarkAttendance=function(){
					$state.go("home.main.batchAttendance",{batchMappingId:scope.batch._id.$oid});
				};

				//function to load evaluation partial based on batchMappingId
				scope.fnEvaluate=function(){
					$state.go("home.main.batchEvaluation",{batchMappingId:scope.batch._id.$oid});
				};

				//function to load evaluation partial based on batchMappingId
				scope.fnAllocateEvaluator=function(){
					$state.go("home.main.allocateEvaluator",{batchMappingId:scope.batch._id.$oid});
				};

				// function for executing functions from name
				scope.executeFunction=function (functionName) {
					functionName=functionName.replace('()','');
					scope[functionName]();
				};


				});


		}
	};
}]);
