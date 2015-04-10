angular.module('baabtra').directive('assignmentCreator',['$modal',function($modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/assignmentCreator/directives/Directive-assignmentCreator.html',
		link: function(scope, element, attrs, fn) {

			if(angular.equals(scope.ngModel,undefined)){
			scope.assignmentsModel=[];//array to keep the 	
			scope.assignmentModel={mark:{}};
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};



			}
			else{
			scope.assignmentModel={mark:{}};
			scope.assignmentsModel=scope.ngModel.assignmentsModel;
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Test'};
			



			}

			//options button to edit delete insert before after the question	
			scope.dropDown=function (index) {
		    	var list=[];

		    list.push({text:"Edit",click:function() {
		    			scope.placeindex=index;
		    			scope.assignmentModel=angular.copy(scope.assignmentsModel[index]);
		    			scope.position='edit';
			    	 	scope.questionShowActivate();

		    		
		    		}});
		    list.push({text:"Insert before",click:function() {
		    		scope.placeindex=index;
		    		scope.position='before';
		    		// scope.questionShow=true;
		    	 	scope.questionShowActivate();

		    		// scope.questionGroupModel.splice(index,0,{});
		    		}});
		    list.push({text:"Insert after",click:function() {
		    		scope.placeindex=index;
		    		scope.position='after';
		    		// scope.questionShow=true;
		    	 	scope.questionShowActivate();

		    		// scope.QuestionModalOpen();
		    		// scope.questionGroupModel.splice(index+1,0,{});
		    		}});
		    list.push({text:"Remove",click:function() {
		    		scope.placeindex=index;
		    		if(scope.assignmentsModel.length>=1){
			    		scope.assignmentsModel.splice(index,1); //removes that object if 
		    			if(angular.equals(index,0)){
		    				// scope.questionShow=true;
			    	 	scope.questionShowActivate();

		    			}
		    		}
		    		}});

		    	return list;
		    };

			 // Pre-fetch an external template populated with a custom scope
            var questionModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentCreator/directives/Modal-assignment.html', show: false,placement:'top'});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)
          
              scope.questionShowActivate =function(){
		    	 questionModal.$promise.then(questionModal.show);
		    	
		    };

		     scope.questionShowDeactivate =function(){
            	 scope.assignmentModel={mark:{}};//questionmodel reset to default
		    	 questionModal.$promise.then(questionModal.show);
		    	
		    };


		    scope.addQuestion =function(assignmentModel,placeindex){

          	// console.log(placeindex);
          	var tempArray=[];
          	for(var key in assignmentModel.answer){
          		var tempObj={};
          		tempObj=assignmentModel.answer[key];
          		tempArray.push(tempObj);
          	}
          	assignmentModel.answer=tempArray;
            	if(angular.equals(placeindex,undefined)){
            	scope.assignmentsModel.push(assignmentModel);//must pass questionmodel instead of scope.questionmodel
            	// console.log(scope.questionGroupModel);
            		
            		scope.ngModel={mark:scope.mark,questionView:scope.questionView,resultMode:scope.resultMode,duration:scope.duration,actualDuration:scope.actualDuration,assignmentsModel:scope.assignmentsModel};
            		scope.assignmentModel={mark:{}};//questionmodel reset to default
            	}//to add a question to a specific position 

            		if(!angular.equals(placeindex,undefined)){

            		if(angular.equals(scope.position,'edit')){
            			// console.log(scope.position);
            			scope.assignmentsModel[placeindex]=assignmentModel;
            			
            		scope.ngModel={mark:scope.mark,questionView:scope.questionView,resultMode:scope.resultMode,duration:scope.duration,actualDuration:scope.actualDuration,assignmentsModel:scope.assignmentsModel};         
            		
            		}
            		else if(!angular.equals(scope.position,'before')){
            			scope.assignmentsModel.splice(placeindex+1,0,assignmentModel);
            			
            		scope.ngModel={mark:scope.mark,questionView:scope.questionView,resultMode:scope.resultMode,duration:scope.duration,actualDuration:scope.actualDuration,assignmentsModel:scope.assignmentsModel};         
            		
            		}
            		else if(!angular.equals(placeindex,'after')){
		    			scope.assignmentsModel.splice(placeindex,0,assignmentModel);
		    		    
            		scope.ngModel={mark:scope.mark,questionView:scope.questionView,resultMode:scope.resultMode,duration:scope.duration,actualDuration:scope.actualDuration,assignmentsModel:scope.assignmentsModel};

            		}
            		scope.assignmentModel={mark:{}};//questionmodel reset to default
            	    delete scope.placeindex;//deleted to set the index back to default state
            	}
            	questionModal.hide();

            };

            scope.fnFormatObj=function (assignment) {
            	return JSON.stringify({value:assignment});
            };



		}
	};
}]);
