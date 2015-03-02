angular.module('baabtra').directive('questionGroup', function() {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
		},
		templateUrl: 'angularModules/questionRelated/questionGroup/directives/Directive-questionGroup.html',
		link: function(scope, element, attrs, fn) {

		// scope.questionGroup.push(scope.questionModel)
		    var asd={};
			scope.questionGroupModel=[asd];

		 scope.dropDown=function (index) {
		    	var list=[];
		    //if(!angular.equals(scope.answers[index].value,undefined)){
		    	
		    	list.push({text:"Remove",click:function() {
		    		if(scope.questionGroupModel.length>1){
			    		scope.questionGroupModel.splice(index,1); //removes that object if there have more than one element in the list
			    		// if(scope.answers.length==1){
			    		// 	// this will add an element if there have only one element left after deleting this element
			    		// 	scope.answers.push({});
			    		// }
			    		 //this function rebuilds the key values(numberings) in correct order
		    		}
		    		}});


		    list.push({text:"Insert after",click:function() {
		    		scope.questionGroupModel.splice(index+1,0,{});
		    		}});

		    list.push({text:"Insert before",click:function() {
		    		scope.questionGroupModel.splice(index,0,{});
		    		}});

		    	return list;
		    };

			// question model:{"mark":{"markCriteria":[{}],"totalMark":12},"answer":[{"Name":"b","value":"ans"}],"title":"asd","question":"<div class=\"line\" id=\"line-1\">test</div>","type":"objective","answerType":"singleAnswer","options":[{"Name":"a","value":"asd"},{"Name":"b","value":"ans"},{"Name":"c","value":"qwe"},{"Name":"d","value":""},{"Name":"e"}]}

		}
	};
});
