angular.module('baabtra').directive('descriptiveAnswer', function() {
	return {
		restrict: 'E',
		scope: {
			primary:'=',
			secondary:'=',
			userAnswer:'=',
			markScored:'=',
			dbAnswer:'='
		},
		templateUrl: 'angularModules/questionRelated/descriptiveAnswer/directives/Directive-descriptiveAnswer.html',
		link: function(scope, element, attrs, fn) {
			scope.enteredAnswer={};
			scope.enteredAnswer.primaryAnswer={};			
			
			// console.log('obj:',JSON.stringify(scope.dbAnswer),scope.rand,JSON.stringify(scope.enteredAnswer));
			
			scope.primaryForm={};
			scope.primaryForm.fields=[];
			scope.markScored=0;
			var primaryLoop=0;
			for(primaryLoop;primaryLoop<scope.primary.length;primaryLoop++){

				var debugVal=JSON.parse(scope.primary[primaryLoop].Debug);

				if(!angular.equals(scope.dbAnswer,undefined)){
					if (!scope.dbAnswer.length==0) {
						 
						 console.log("%c Name %O", "color:red;font-size: 20pt",scope.dbAnswer[0].primaryAnswer[debugVal.name]);
						if(scope.dbAnswer[0].primaryAnswer[debugVal.name]){
							debugVal.value=scope.dbAnswer[0].primaryAnswer[debugVal.name];
						}
					}
				}

				scope.primaryForm.fields.push(debugVal);
			}
			scope.enteredAnswer.primaryAnswer={};
			scope.enteredAnswer.secondaryAnswer={};		

			scope.$watch('enteredAnswer',function (oldval,newval) {

				if(angular.equals(scope.enteredAnswer,undefined)){
					return 0;
				}
		
				scope.userAnswer[0]=angular.copy(scope.enteredAnswer);
				
			},true);


			

			scope.$watch('enteredAnswer',function (oldval,newval) {

				if(angular.equals(scope.enteredAnswer,undefined)){
					return 0;
				}
		
				scope.userAnswer[0]=angular.copy(scope.enteredAnswer);
				
			},true);
			

		}
	};
});
