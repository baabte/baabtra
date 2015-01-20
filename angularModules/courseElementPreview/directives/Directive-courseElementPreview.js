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
				console.log(scope.previewData);
				$(element).find('#elementContent').html('');
				if(!angular.equals(scope.previewData,undefined)){
					for (var key in scope.previewData) {//looping through each values in the object
						if(scope.previewData[key] instanceof Object){
						 		var elementToBeCreated=$('<'+scope.previewData[key].type+'>');
						 		elementToBeCreated.attr('data',scope.previewData[key].value);
						 		$(element).find('#elementContent').append(elementToBeCreated);
						 		$compile(elementToBeCreated)(scope);
						}
					}
				}
			},true);
		}
	};
}]);
