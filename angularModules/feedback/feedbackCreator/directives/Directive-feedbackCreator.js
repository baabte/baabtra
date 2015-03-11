angular.module('baabtra').directive('feedbackCreator', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			feedbackFormModel:'=ngModel'
		},
		templateUrl: 'angularModules/feedback/feedbackCreator/directives/Directive-feedbackCreator.html',
		link: function(scope, element, attrs, fn) {


			if(angular.equals(scope.feedbackFormModel.length,undefined)){				
			scope.feedbackFormModel=[];//array to keep the feddbackModel
			}

			scope.feedbackShow=true;

		 

		    scope.feedbackShowActivate =function(){
		    	scope.feedbackShow=true;
		    	
		    };
		     scope.feedbackShowDeactivate =function(){
		    	scope.feedbackShow=false;
		    };

		    
          scope.addFeedback =function(feedbackModel){
          	for(var index in feedbackModel.options){
          		if(angular.equals(feedbackModel.options[index].value,undefined)){
          		 feedbackModel.options.splice(index,1);
          		}
          	};
          	
            	scope.feedbackFormModel.push(feedbackModel);//must pass questionmodel instead of scope.questionmodel
            	
            	delete scope.feedbackModel;//questionmodel reset to default
            	scope.feedbackShow=false;//question field hidden after adding question
            };

            scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };


		}
	};
});