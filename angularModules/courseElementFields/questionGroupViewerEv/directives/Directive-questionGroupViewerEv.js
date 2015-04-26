angular.module('baabtra').directive('questionGroupViewerEv', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"="
		},
		templateUrl: 'angularModules/courseElementFields/questionGroupViewerEv/directives/Directive-questionGroupViewerEv.html',
		link: function(scope, element, attrs, fn) {
			// initialisisng the return variable
			if(angular.equals(scope.result, undefined)){
				scope.result = scope.$parent.result[parseInt(attrs.index)];
				scope.result.data = angular.copy(scope.data);
			}

			console.log(scope.result.data);

			if(angular.equals(scope.result.data.value.markScored,undefined)){
				scope.result.data.value.markScored=0;
			}


			scope.markChanged = function(){
					var totalMark=0
					
				for(var index in scope.result.data.value.testModel){
					var totalMark+=scope.result.data.value.testModel[index].markScored
				}

				scope.result.data.value.markScored=totalMark;

			};

		}
	};
});
