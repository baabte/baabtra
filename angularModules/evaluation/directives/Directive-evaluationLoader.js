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
		    	for(var index in scope.evaluationobj.evaluator){
		    		scope.evaluationobj.evaluator[index].roleMappingId=scope.evaluationobj.evaluator[index].roleMappingId.$oid;
		    	}
				// console.log(scope.evaluationobj);
			
		});

		scope.fnEvaluate = function(evaluationobj){
			
				var totalMark=0;
			if(angular.equals(evaluationobj.elements[1].type,'question-group-viewer')){
				for(var markindex in evaluationobj.elements[1].value.testModel){
					 totalMark+=evaluationobj.elements[1].value.testModel[markindex].markScored;
					 evaluationobj.elements[1].value.testModel[markindex].evaluated=1;
				}
				evaluationobj.markScored+=totalMark;
			}
			if(angular.equals(evaluationobj.elements[1].type,'question-viewer')){
				evaluationobj.markScored+=evaluationobj.elements[1].value.markScored;
				evaluationobj.elements[1].value.evaluated=1;
			}
				evaluationobj.evaluatedBy=scope.evaluatorId;
			console.log(evaluationobj);
			var evaluateAnswerPromise=evaluationService.evaluateAnswer(keyArray[0],keyArray[1],keyArray[2],keyArray[3],evaluationobj);
			evaluateAnswerPromise.then(function(data){
		    	
		    	var result=angular.fromJson(JSON.parse(data.data));
		    	
				console.log(result);
			
		});

		};



		}
	};
}]);
