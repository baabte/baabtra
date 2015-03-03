angular.module('baabtra').directive('questionGroup',['$aside', function($aside) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/questionRelated/questionGroup/directives/Directive-questionGroup.html',
		link: function(scope, element, attrs, fn) {

		// scope.questionGroup.push(scope.questionModel)
			scope.questionGroupModel=[];//array to keep the 
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};
			//dummy object created to view the question here
			scope.questionShow=true;
			
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

		    scope.questionShowActivate =function(){
		    	scope.questionShow=true;
		    };


          scope.addQuestion =function(questionModel,placeindex){

            	if(angular.equals(placeindex,undefined)){
            	scope.questionGroupModel.push(questionModel);//must pass questionmodel instead of scope.questionmodel
            	scope.ngModel=scope.questionGroupModel;
            	}
            	if(!angular.equals(placeindex,undefined)){
            		if(!angular.equals(scope.position,'before')){
            			scope.questionGroupModel.splice(placeindex+1,0,questionModel);
            		scope.ngModel=scope.questionGroupModel;
            		}
            		else if(!angular.equals(placeindex,'after')){
		    			scope.questionGroupModel.splice(placeindex,0,questionModel);
            		scope.ngModel=scope.questionGroupModel;
            		}
            	    scope.placeindex;//deleted to set the index back to default state
            	}
            	delete questionModel;
            	scope.questionShow=false;
            	

            };

            scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };

		}

	};
}]);
