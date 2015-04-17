angular.module('baabtra').directive('assignmentCreator',['$modal',function($modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/courseElementFields/assignmentCreator/directives/Directive-assignmentCreator.html',
		link: function(scope, element, attrs, fn) {


			//an array to hold the unit of the penalty
			scope.penaltyUnits = [{label:"% of this assignment's mark", value:"% of this assignment's mark"}
			, {label:"times of this assignment's mark", value:"times of this assignment's mark"},
			{label:'Marks', value:'Marks'}];

			//an array to hold the submission modes
			scope.penaltySubmissionModes = [
			{label:"submission is late",value:"submission is late"},
			{label:"re-submitted",value:"re-submitted"},
			{label:"re-submission is late",value:"re-submission is late"}];

			scope.selectedIcon = "Globe";
			scope.icons = [{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}];

			//array to hold the penalty time units
			scope.penaltyTimeUnits = [
			{label:"days", value:"days"},
			{label:"hours", value:"hours"},
			{label:"months", value:"months"}];

			//an array to hold the configuration for - whether the marks to be reduced once or on each consedutive day
			scope.penaltyFrequencies = [
			{label:"one time", value:"one time"},
			{label:"each day delayed", value:"each day delayed"}];

			//array to hold the information of -from which mars the resuction should be done
			scope.reduceFromMarks = [
			{label:"this assignment's mark", value:"this assignment's mark"},
			{label:"total course marks", value:"total course marks"}];

			//creating an array for penalty configuration
			scope.penaltyArray = [];

			//creating a penalty object
			scope.penaltyObj = {
				reductionUnits:'',
				penaltyCalculationUnit:"% of this assignment's mark",
				reduceFrom:"total course marks",
				penaltyFrequency:'one time',
				submissionMode:'submission is late',
				lateTime:'',
				lateTimeUnits:'days'
			};

			// a function to add the rule
			scope.addPenaltyRule = function(){
				scope.penaltyArray.push(angular.copy(scope.penaltyObj));
				scope.penaltyObj = {
					reductionUnits:'',
					penaltyCalculationUnit:"% of this assignment's mark",
					reduceFrom:"total course marks",
					penaltyFrequency:'one time',
					submissionMode:'submission is late',
					lateTime:'',
					lateTimeUnits:'days'
				}
			}

			//function to remove rule
			scope.removeRule = function(index) {
				scope.penaltyArray.splice(index,1);
			}
			
			//function to edit rule
			scope.editRule = function(rule) {
				scope.penaltyObj = rule;
				scope.ruleEditMode = true;
			}

			//function to show or hide the from parameter based on selected values
			scope.showReduceFrom = function(reduceFrom) {

				if (angular.equals(reduceFrom, "this assignment's mark")) {
					return "";
				}
				else{
					return "from " + reduceFrom;
				}
			}




			// if(angular.equals(scope.ngModel,undefined)){
			// scope.ngModel={};
			// scope.ngModel.assignmentsModel=[];//array to keep the 	
			// scope.assignmentModel={mark:{}};
			// scope.courseElement={index:1,tlPointInMinute:1000,Name:'Assignment'};
			// scope.ngModel.mark={totalMark:0};
			// scope.ngModel.penality={}
			// scope.ngModel.penality.unattended={};
			// scope.ngModel.penality.unattended.unit='percentage';


			// }
			// else{
			// scope.assignmentModel={mark:{}};
			// // scope.assignmentsModel=scope.ngModel.assignmentsModel;
			// scope.courseElement={index:1,tlPointInMinute:1000,Name:'Assignment'};
			// // scope.penality=scope.ngModel.penality;			

			// }


			// //watch function to keep track of the the totalmark  
		 //    scope.$watch(function(){return scope.ngModel.assignmentsModel;},function(){
		    	
		 //    	var addedQuestionTotal=0;
		 //    	for(var index in scope.ngModel.assignmentsModel){

			//     	if(!angular.equals(scope.ngModel.assignmentsModel[index].mark.totalMark,undefined)){

			//     		addedQuestionTotal+=scope.ngModel.assignmentsModel[index].mark.totalMark;
			//     	}
			//     }
			//     scope.ngModel.mark.totalMark=addedQuestionTotal;

		 //    },true);



			// //options button to edit delete insert before after the question	
			// scope.dropDown=function (index) {
		 //    	var list=[];

		 //    list.push({text:"Edit",click:function() {
		 //    			scope.placeindex=index;
		 //    			scope.assignmentModel=angular.copy(scope.ngModel.assignmentsModel[index]);
		 //    			scope.position='edit';
			//     	 	scope.questionShowActivate();

		    		
		 //    		}});
		 //    list.push({text:"Insert before",click:function() {
		 //    		scope.placeindex=index;
		 //    		scope.position='before';
		 //    		// scope.questionShow=true;
		 //    	 	scope.questionShowActivate();

		 //    		// scope.questionGroupModel.splice(index,0,{});
		 //    		}});
		 //    list.push({text:"Insert after",click:function() {
		 //    		scope.placeindex=index;
		 //    		scope.position='after';
		 //    		// scope.questionShow=true;
		 //    	 	scope.questionShowActivate();

		 //    		// scope.QuestionModalOpen();
		 //    		// scope.questionGroupModel.splice(index+1,0,{});
		 //    		}});
		 //    list.push({text:"Remove",click:function() {
		 //    		scope.placeindex=index;
		 //    		if(scope.ngModel.assignmentsModel.length>=1){
			//     		scope.ngModel.assignmentsModel.splice(index,1); //removes that object if 
		 //    			if(angular.equals(index,0)){
		 //    				// scope.questionShow=true;
			//     	 	scope.questionShowActivate();

		 //    			}
		 //    		}
		 //    		}});

		 //    	return list;
		 //    };
			// scope.percentageNum=[];
			// num=0;		   
		 //    while(num<=100){
		 //    	scope.percentageNum[num]=num;
		 //    	num++;
		 //    }

			//  // Pre-fetch an external template populated with a custom scope
   //          var questionModal = $modal({scope: scope, template: 'angularModules/courseElementFields/assignmentCreator/directives/Modal-assignment.html', show: false,placement:'top'});
   //          // Show when some event occurs (use $promise property to ensure the template has been loaded)
          
   //            scope.questionShowActivate =function(){
		 //    	 questionModal.$promise.then(questionModal.show);
		    	
		 //    };

		 //     scope.questionShowDeactivate =function(){
   //          	 scope.assignmentModel={mark:{}};//questionmodel reset to default
		 //    	 questionModal.hide();
		    	
		 //    };


		 //    scope.addQuestion =function(assignmentModel,placeindex){

   //        	// console.log(placeindex);
   //        	var tempArray=[];
   //        	for(var key in assignmentModel.answer){
   //        		var tempObj={};
   //        		tempObj=assignmentModel.answer[key];
   //        		tempArray.push(tempObj);
   //        	}
   //        	assignmentModel.answer=tempArray;
   //          	if(angular.equals(placeindex,undefined)){
   //          	scope.ngModel.assignmentsModel.push(assignmentModel);//must pass assignmentModel instead of scope.questionmodel
   //          	// console.log(scope.questionGroupModel);
            		
   //          	}//to add a question to a specific position 
   //          	else{

   //          		if(angular.equals(scope.position,'edit')){
   //          			// console.log(scope.position);
   //          			scope.ngModel.assignmentsModel[placeindex]=assignmentModel;
            			
            		
   //          		}
   //          		else if(!angular.equals(scope.position,'before')){
   //          			scope.ngModel.assignmentsModel.splice(placeindex+1,0,assignmentModel);
            			
            		
   //          		}
   //          		else if(!angular.equals(placeindex,'after')){
		 //    			scope.ngModel.assignmentsModel.splice(placeindex,0,assignmentModel);
		    		    

   //          		}
   //          	    delete scope.placeindex;//deleted to set the index back to default state
   //          	}

   //          	// scope.ngModel={mark:scope.ngModel.mark,deadLine:scope.ngModel.deadLine,penality:scope.ngModel.penality,assignmentsModel:scope.ngModel.assignmentsModel};


   //          	scope.assignmentModel={mark:{}};//questionmodel reset to default
            	
   //          	questionModal.hide();

   //          };

   //          scope.fnFormatObj=function (assignment) {
   //          	return JSON.stringify({value:assignment});
   //          };



		}
	};
}]);
