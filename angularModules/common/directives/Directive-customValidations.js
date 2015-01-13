angular.module('baabtra')

//To add validation indicators to respective controls (Test)
.directive('indicateValTest', function() {
	return {
		restrict: 'A',

		link: function(scope, elem, attrs, fn) {		
					
					console.log(scope);		

			    // A variable to hold the current element
				scope.thisElem;
				scope.$watch('scope.thisElem', function(){

						console.log(scope.currentState);			
			
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
						var icon=$('<span class="input-group-addon"></span>');

						
						if($(scope.thisElem).attr('required') && angular.equals($(scope.thisElem).attr('type'),'text')){
							icon.addClass(scope.symbolCollection['required']);
							add=true;
						}


						if ($(scope.thisElem).attr('ng-pattern')){

							var pattern = $(scope.thisElem).attr('ng-pattern');
							pattern = pattern.replace('Pattern','');
							console.log(pattern);
							icon.removeClass(scope.symbolCollection['required']);
							icon.addClass(scope.symbolCollection[pattern]);
							add=true;
						}


						
						if(add){
							$(scope.thisElem).parent().prepend(icon);
						}
						

					}
			}); 
		} 
	  
	};

})

//Add icon to individual controls
.directive('indicateVal', function() {
	return {
		restrict: 'A',

		link: function(scope, elem, attrs, fn) {	
										

			  
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
						var icon=$('<span class="input-group-addon"></span>');

						icon.addClass(scope.symbolCollection[attrs.indicateVal]);
						add=true;
						

						
						if(add){
							$(elem).parent().prepend(icon);
						}
						

			
			
		} 
	  
	}

});