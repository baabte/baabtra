angular.module('baabtra').directive('courseElementFullView',['$compile', function($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			previewData:"=",
			tlPosition:"@",
			courseId:'='
		},
		templateUrl: 'angularModules/courseElementPreview/directives/Directive-courseElementPreview.html',
		link: function(scope, element, attrs, fn) {
			scope.rand=Math.floor(Math.random()*100000); // for generating random id for elements
			//alternative elements
			var secondaryElements={
				"doc-viewer":'doc-viewer-frame'
			};
			scope.$watch('previewData', function(){
				$(element).find('#elementContent'+scope.rand).html('');
				if(!angular.equals(scope.previewData,undefined)){
					angular.forEach(scope.previewData.elements, function(data,key){//looping through each type of course elements at this point in the object
							if(data instanceof Object){
									var elemDirName=data.type;
									if(secondaryElements[elemDirName]){
										//checks for alternative viewer
										elemDirName=secondaryElements[elemDirName];
									}
							 		var elementToBeCreated=$('<'+elemDirName+'>');							 		
							 		elementToBeCreated.attr('data',JSON.stringify(data));
							 		elementToBeCreated.attr('course-element',JSON.stringify(scope.previewData));
							 		elementToBeCreated.attr('index',key);
							 		elementToBeCreated.attr('course-id','courseId');
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
