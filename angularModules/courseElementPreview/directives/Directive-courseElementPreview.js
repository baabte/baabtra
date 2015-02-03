angular.module('baabtra').directive('courseElementPreview',['$compile', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			previewData:"=",
			tlPosition:"@"
		},
		templateUrl: 'angularModules/courseElementPreview/directives/Directive-courseElementPreview.html',
		link: function(scope, element, attrs, fn) {
			scope.rand=Math.floor(Math.random()*100000); // for generating random id for elements
			scope.$watch('previewData', function(){
				$(element).find('#elementContent'+scope.rand).html('');
				if(!angular.equals(scope.previewData,undefined)){
					angular.forEach(scope.previewData.elements, function(data){//looping through each type of course elements at this point in the object
							if(data instanceof Object){
							 		var elementToBeCreated=$('<'+data.type+'>');							 		
							 		elementToBeCreated.attr('data',JSON.stringify(data));
							 		elementToBeCreated.attr('course-element',JSON.stringify(scope.previewData));
							 		$('#elementContent'+scope.rand).append(elementToBeCreated);
							}
					});
					if(!angular.equals(scope.previewData.nestedElements,undefined)){
						// if it is having any nested elements we have to append like this
						// then only it can append same directive inside this directive
						var elem='<nested-element data="previewData.nestedElements"></nested-element>';
						$('#elementContent'+scope.rand).append(elem);

					} 
						
				}
				// now we have to compile the view to render all the directives that we have added manually using js
				$compile(element)(scope);
			},true);
		}
	};
}]);
