angular.module('baabtra').directive('evaluationLoader',['evaluationService' ,function(evaluationService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			 evalObjKey:'=',
			 evaluatorId:'='
		},
		templateUrl: 'angularModules/evaluation/directives/Directive-evaluationLoader.html',
		link: function(scope, element, attrs, fn) {
			var keyArray=scope.evalObjKey.split('.');
			var evaluationFetchPromise=evaluationService.evaluationFetch(keyArray[0],keyArray[1],keyArray[2],keyArray[3]);
			evaluationFetchPromise.then(function(data){
		    	
		    	scope.evaluationobj=angular.fromJson(JSON.parse(data.data));
				console.log(scope.evaluationobj);
			
		});



		}
	};
}]);
