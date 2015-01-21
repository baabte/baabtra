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

			scope.$watch('previewData', function(){
				console.log(JSON.stringify(scope.previewData));
				$(element).find('#elementContent').html('');
				if(!angular.equals(scope.previewData,undefined)){
					angular.forEach(scope.previewData.elements, function(data){//looping through each type of course elements at this point in the object
						//angular.forEach(previewData.elements, function(data){//looping through each values in the element object
							if(data instanceof Object){
								console.log(data);
							 		var elementToBeCreated=$('<'+data.type+'>');
							 		elementToBeCreated.attr('data',data.value);
							 		$(element).find('#elementContent').append(elementToBeCreated);
							 		$compile(elementToBeCreated)(scope);
							}
						//});
					}); 
						
				}
			},true);
		}
	};
}]);
