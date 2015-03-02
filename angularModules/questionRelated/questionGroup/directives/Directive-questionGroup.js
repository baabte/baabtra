angular.module('baabtra').directive('questionGroup',['$modal', function($modal) {
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

			
		 scope.dropDown=function (index) {
		 		scope.index=index;
		    	var list=[];
		    //if(!angular.equals(scope.answers[index].value,undefined)){
		    	
		    	list.push({text:"Remove",click:function() {
		    		if(scope.questionGroupModel.length>=1){
			    		scope.questionGroupModel.splice(index,1); //removes that object if 
		    		}
		    		}});

		    list.push({text:"Insert before",click:function() {
		    		scope.position='before';
		    		scope.QuestionModalOpen();
		    		// scope.questionGroupModel.splice(index,0,{});
		    		}});
		    list.push({text:"Insert after",click:function() {
		    		scope.position='after';
		    		scope.QuestionModalOpen();
		    		// scope.questionGroupModel.splice(index+1,0,{});
		    		}});

		    	return list;
		    };


		    // Pre-fetch an external template populated with a custom scope
            var questionModal = $modal({scope: scope, template: 'angularModules/questionRelated/questionGroup/directives/Modal-question.html', show: false});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)
            scope.QuestionModalOpen = function() {
              questionModal.$promise.then(questionModal.show);
            };
            scope.addQuestion =function(questionModel,index){
            	if(angular.equals(scope.index,undefined)){
            	scope.questionGroupModel.push(questionModel);//must pass questionmodel instead of scope.questionmodel
            	scope.ngModel=scope.questionGroupModel;
            	}
            	if(!angular.equals(scope.index,undefined)){
            		if(!angular.equals(scope.position,'before')){
		    		 scope.questionGroupModel.splice(scope.index,0,questionModel);
            		scope.ngModel=scope.questionGroupModel;
            		}
            		else if(!angular.equals(scope.position,'after')){
		    		scope.questionGroupModel.splice(scope.index+1,0,questionModel);
            		scope.ngModel=scope.questionGroupModel;
            		}
            		delete scope.index;//deleted to set the index back to default state
            	}

            };

            scope.fnFormatObj=function (question) {
            	return JSON.stringify({value:question});
            };

			scope.questionModel={"mark":{"markCriteria":[{}],"totalMark":10},"answer":[{"Name":"c","value":"Answer"}],"multiAnswer":true,"question":"<div class=\"line\" id=\"line-1\">This is Testing Question</div>","type":"objective","answerType":"singleAnswer","options":[{"Name":"a","value":"option a"},{"Name":"b","value":"option b"},{"Name":"c","value":"Answer"},{"Name":"d","value":"option d"},{"Name":"e"}]};

		}
	};
}]);
