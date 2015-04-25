angular.module('baabtra').directive('evaluationLoader',['evaluationService','$alert',function (evaluationService,$alert) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			 courseTimeline:'=',
			 elementOrder:'=',
			 evaluatorId:'=',
			 courseMappingId:'='
		},
		templateUrl: 'angularModules/evaluation/directives/Directive-evaluationLoader.html',
		link: function(scope, element, attrs, fn) {
				var keyArray = scope.elementOrder.split('.');

				var obj = scope.courseTimeline;

				var index = 0;
				for(var key in keyArray){
					if(!angular.equals(obj[keyArray[key]],undefined)){
						obj = obj[keyArray[key]];
						index++;
						if(angular.equals(keyArray.length, index)){
							scope.element = obj;
						}
					}
					else{
						break;
					}
				}
			}
		};
}]);
