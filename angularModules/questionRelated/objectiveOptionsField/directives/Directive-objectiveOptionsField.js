angular.module('baabtra').directive('objectiveOptionsField', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			answers:'='
		},
		templateUrl: 'angularModules/questionRelated/objectiveOptionsField/directives/Directive-objectiveOptionsField.html',
		link: function(scope, element, attrs, fn) {




			
			// for generating a customizable keys for the options
		    scope.optionsArray={};
		    scope.optionsArray['alphabet']=['a','b','c','d','e','f','g','h','i','j','k'];
		    scope.optionsArray['number']=[1,2,3,4,5,6,7,8,9,10];
		    scope.optionsArray['roman']=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
		    scope.optionsArray['romanSmall']=['i','ii','iii','iv','v','vi','vii','viii','ix','x'];

		    scope.answers={'a':''};

		    var deletedKey=''; // variable to store last deleted key
		    var keyCount=0; // used to store total count of the below loop
		    scope.ansChanged=function (ans,index) {
		    	var timer=setTimeout(function () {
		    		clearTimeout(timer);
		    		if(ans.length>0){
		    			if(angular.equals(scope.question.answers[scope.optionsArray[index+1]],undefined)){
			    			scope.question.answers[scope.optionsArray[index+1]]='';
			    			scope.$digest();
			    		}
			    	}
			    	// else{
			    	// 	   angular.forEach(scope.question.answers,function (val,key) {
			    	// 	   		keyCount++;
			    	// 	   		if(val==''&&key!='a'){
			    	// 	   			delete scope.question.answers[key];
			    	// 	   			deletedKey=key;
			    	// 	   		}
			    	// 	   		else if(deletedKey!=''){
			    	// 	   			scope.question.answers[deletedKey]=scope.question.answers[key];
			    	// 	   			deletedKey=key;
			    	// 	   		}
			    	// 	   });

			    	// 	   if(deletedKey!=''){
			    	// 	   	console.log(scope.optionsArray[keyCount-1]);
			    	// 	   	 delete scope.question.answers[scope.optionsArray[keyCount-1]];
			    	// 	   	 keyCount=0;
			    	// 	   	 deletedKey='';
			    	// 	   }

			    	// 	   scope.$digest();
			    	// }
		    	},100);
		    };

		}
	};
});
