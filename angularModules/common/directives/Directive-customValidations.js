angular.module('baabtra')

//To add validation indicators to respective controls (Test)
.directive('indicateValTest', function() {
	return {
		restrict: 'A',

		link: function(scope, elem, attrs, fn) {		
					
					

			    // A variable to hold the current element
				scope.thisElem;
				scope.$watch('scope.thisElem', function(){

								
			
					// the array to hold the symbols
					scope.symbolCollection = {
						'required': 'ti-star text-danger',
						'email':'ti-email text-info',
						'Number':'ti-mobile text-info'
					};



					// Looping through all the controls in the form and attaching the specific symbol	
					for(var i = 0; i <= elem.context.length; i++){

						

						var add = false;
						scope.thisElem = elem.context[i];

						$(scope.thisElem).parent().attr('class', 'input-group m-b col-xs-12');
						scope.icon=$('<span class="input-group-addon"></span>');

						
						if($(scope.thisElem).attr('required') && angular.equals($(scope.thisElem).attr('type'),'text')){
							scope.icon.addClass(scope.symbolCollection['required']);
							add=true;
						}


						if ($(scope.thisElem).attr('ng-pattern')){

							var pattern = $(scope.thisElem).attr('ng-pattern');
							pattern = pattern.replace('Pattern','');
							
							scope.icon.removeClass(scope.symbolCollection['required']);
							scope.icon.addClass(scope.symbolCollection[pattern]);
							add=true;
						}


						
						if(add){
							$(scope.thisElem).parent().prepend(scope.icon);
						}
						

					}
			}); 
		} 
	  
	};

})

//Add scope.icon to individual controls
.directive('indicateVal', function() {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

										
			scope.$watch(function (){return elem.context.required;/* define what to watch*/
}, function() { 
			  			  
					// the array to hold the symbols
					scope.symbolCollection = {
						'required': 'ti-star text-danger',
						'email':'ti-email text-info',
						'phone':'ti-mobile text-info',
						'date' : 'ti-calendar  text-info',
						'facebook': 'ti-facebook text-info',
						'twitter':'ti-twitter-alt text-info',
						'google':'ti-google text-info',
						'linkedin' : 'ti-linkedin  text-info'

					};

						$(elem).parent().attr('class', 'input-group m-b col-xs-12');
						scope.icon=$('<span class="input-group-addon"></span>');

						scope.icon.addClass(scope.symbolCollection[attrs.indicateVal]);
						add=true;

									

						
						if(add && !$(elem).parent().find("span").length){
							$(elem).parent().prepend(scope.icon);
						}


						
					});

				//setting a watch function on the elem.context.required attribute
				scope.$watch(function (){return ctrls[1].$invalid;/* define what to watch*/
				}, function(){

					//if the required attribute is set to true the color will change to red
						if(ctrls[1].$invalid){
							$(elem).parent().find("span").addClass('text-danger');
						}
						else{ //otherwise the color of the existing scope.icon will change to blue
							$(elem).parent().find("span").removeClass('text-danger').addClass('text-success');				
						}

				});	
							
			
		} 
	  
	}

})

//to set atleast one required field in a group of fields
.directive('validateOneInMany', ['$parse', function($parse) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {
			
			//checking for the existence of the "validation-group" attribute and throwing the error
			if(!attrs.validationGroup){
				throw new Error('The "validate-one-in-many" directive needs a "validation-group" attribute to work properly');
				return;
			}

			//defining an object to hold the validation groups in a form context
			if(angular.equals(scope.validationGroups, undefined)) {
				scope.validationGroups={};
			}		

		    
			//pushing the elements with the same validation groups into an array in the object with the validation group as the key
			if(angular.equals(scope.validationGroups[attrs.validationGroup], undefined)) {			
			scope.validationGroups[attrs.validationGroup]=[];
			}
			scope.validationGroups[attrs.validationGroup].push(ctrls[1]);
			//.End	

			//defining a variable to dtermine whether to set all the controls in the validation group to be valid
			scope.setAllRequired = true;		
			
			

			//binding a change event to validate when the text changes
			scope.$watch(function (){return elem.context.value;/* define what to watch*/
}, function(){				
			

				//defining a variable to hold the valid state for the validation group
				scope.vgValid = false;
				

				//defining a variable to hold the validation group name
				scope.vgName = attrs.validationGroup;;
				//defining a variable to hold the source control which initiated the validation
				scope.srcControl = ctrls[1];				
				
				//if the current element is valid
				if(!ctrls[1].$error.required) {		

					scope.vgValid = true;													
					
                } //.End if(!ctrl.$invalid)



			});// .End scope.$watch(function (){return elem.context.value

			// Setting a watch function on the scope.vgName + vgValid to toggle the validity
			scope.$watch(function (){return (scope.vgName + scope.vgValid);/* define what to watch*/
}, function(){	

			
			//check if vgValid is true to run the function
			if(angular.equals(attrs.validationGroup, scope.vgName)){
				if(scope.vgValid) { // && !angular.equals(scope.srcControl.$name,ctrls[1].$name) ) {
					//setting the validity state of the controller
					ctrls[1].$setValidity("required", true);
				} 
				else{
					//setting the validity state of the controller
					ctrls[1].$setValidity("required", false);
				}
			}	
				
			});
			// .End Setting a watch function on the vgValid element		
		        
		} //.End link
	  
	}//. End return

}]); // .End directive('validateOneInMany'