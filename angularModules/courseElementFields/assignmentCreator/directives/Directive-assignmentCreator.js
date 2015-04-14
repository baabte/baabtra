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
			scope.ngModel={};
			scope.ngModel.assignmentsModel=[];//array to keep the 	
			scope.assignmentModel={mark:{}};
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Assignment'};
			scope.ngModel.mark={totalMark:0};
			scope.ngModel.penality={}
			scope.ngModel.penality.unattended={};
			scope.ngModel.penality.unattended.unit='percentage';


			}
			else{
			scope.assignmentModel={mark:{}};
			// scope.assignmentsModel=scope.ngModel.assignmentsModel;
			scope.courseElement={index:1,tlPointInMinute:1000,Name:'Assignment'};
			// scope.penality=scope.ngModel.penality;			

			}


			//watch function to keep track of the the totalmark  
		    scope.$watch(function(){return scope.ngModel.assignmentsModel;},function(){
		    	
		    	var addedQuestionTotal=0;
		    	for(var index in scope.ngModel.assignmentsModel){

			    	if(!angular.equals(scope.ngModel.assignmentsModel[index].mark.totalMark,undefined)){

			    		addedQuestionTotal+=scope.ngModel.assignmentsModel[index].mark.totalMark;
			    	}
			    }
			    scope.ngModel.mark.totalMark=addedQuestionTotal;

		    },true);



			//options button to edit delete insert before after the question	
			scope.dropDown=function (index) {
		    	var list=[];

		    list.push({text:"Edit",click:function() {
		    			scope.placeindex=index;
		    			scope.assignmentModel=angular.copy(scope.ngModel.assignmentsModel[index]);
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
		    		if(scope.ngModel.assignmentsModel.length>=1){
			    		scope.ngModel.assignmentsModel.splice(index,1); //removes that object if 
		    			if(angular.equals(index,0)){
		    				// scope.questionShow=true;
			    	 	scope.questionShowActivate();

		    			}
		    		}
		    		}});

		    	return list;
		    };
			scope.percentageNum=[];
			num=0;		   
		    while(num<=100){
		    	scope.percentageNum[num]=num;
		    	num++;
		    }

			 // Pre-fetch an external template populated with a custom scope
            var questionModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentCreator/directives/Modal-assignment.html', show: false,placement:'top'});
            // Show when some event occurs (use $promise property to ensure the template has been loaded)
          
              scope.questionShowActivate =function(){
		    	 questionModal.$promise.then(questionModal.show);
		    	
		    };

		     scope.questionShowDeactivate =function(){
            	 scope.assignmentModel={mark:{}};//questionmodel reset to default
		    	 questionModal.hide();
		    	
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
            	scope.ngModel.assignmentsModel.push(assignmentModel);//must pass assignmentModel instead of scope.questionmodel
            	// console.log(scope.questionGroupModel);
            		
            	}//to add a question to a specific position 
            	else{

            		if(angular.equals(scope.position,'edit')){
            			// console.log(scope.position);
            			scope.ngModel.assignmentsModel[placeindex]=assignmentModel;
            			
            		
            		}
            		else if(!angular.equals(scope.position,'before')){
            			scope.ngModel.assignmentsModel.splice(placeindex+1,0,assignmentModel);
            			
            		
            		}
            		else if(!angular.equals(placeindex,'after')){
		    			scope.ngModel.assignmentsModel.splice(placeindex,0,assignmentModel);
		    		    

            		}
            	    delete scope.placeindex;//deleted to set the index back to default state
            	}

            	// scope.ngModel={mark:scope.ngModel.mark,deadLine:scope.ngModel.deadLine,penality:scope.ngModel.penality,assignmentsModel:scope.ngModel.assignmentsModel};


            	scope.assignmentModel={mark:{}};//questionmodel reset to default
            	
            	questionModal.hide();

            };

            scope.fnFormatObj=function (assignment) {
            	return JSON.stringify({value:assignment});
            };



		}
	};
}]);
