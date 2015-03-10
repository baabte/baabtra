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

			scope.feedbackShow=false;
			scope.feddbackModel={};

		 scope.dropDown=function (index) {
		    	var list=[];
		    	
		    	list.push({text:"Remove",click:function() {
		    		scope.placeindex=index;
		    		if(scope.questionGroupModel.length>=1){
			    		scope.questionGroupModel.splice(index,1); //removes that object if 
		    			if(angular.equals(index,0)){
		    				scope.questionShow=true;
		    			}
		    		}
		    		}});

		    list.push({text:"Insert before",click:function() {
		    		scope.placeindex=index;
		    		scope.position='before';
		    		scope.questionShow=true;
		    		// scope.questionGroupModel.splice(index,0,{});
		    		}});
		    list.push({text:"Insert after",click:function() {
		    		scope.placeindex=index;
		    		scope.position='after';
		    		scope.questionShow=true;
		    		// scope.QuestionModalOpen();
		    		// scope.questionGroupModel.splice(index+1,0,{});
		    		}});

		    	return list;
		    };

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
            	
            	scope.feedbackModel={};//questionmodel reset to default
            	scope.feedbackShow=false;//question field hidden after adding question
            };

            scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };


		}
	};
});
