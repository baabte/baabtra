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

			scope.childElementScopes = {};
				$(element).find('#elementContent'+scope.rand).html('');
				if(!angular.equals(scope.previewData,undefined)){
					
					angular.forEach(scope.previewData.elements, function(data,key){//looping through each type of course elements at this point in the object
							if(data instanceof Object){

								if(angular.equals(data.parentElementId, undefined)){

									if(angular.isDefined(data.uniqueId)){
										var subArray = returnSub(scope.previewData.elements, data.uniqueId);

										if(subArray.length){
											data.subElems = subArray;
										}
									}

									var elemDirName=data.type;
									if(secondaryElements[elemDirName]){
										//checks for alternative viewer
										elemDirName=secondaryElements[elemDirName];
									}
							 		var elementToBeCreated = $('<'+elemDirName+'>');							 		
							 		
							 		console.clear();
							 		console.log(data);
							 		//checking for custom attributes and adding them
							 		if(!angular.equals(data.customAttributes, undefined)) {
							 			
							 			for (var keyAttrib in data.customAttributes){
							 				elementToBeCreated.attr(keyAttrib,data.customAttributes[keyAttrib]);
							 			}
							 		}

							 		elementToBeCreated.attr('data',JSON.stringify(data));
							 		elementToBeCreated.attr('course-element',JSON.stringify(scope.previewData));
							 		elementToBeCreated.attr('index',key);
							 		elementToBeCreated.attr('this-scope','childElementScopes.'+key+'');
							 		elementToBeCreated.attr('course-id','courseId');
							 		elementToBeCreated.addClass('elementField');

							 		
							 		$('#elementContent'+scope.rand).append(elementToBeCreated);
								}
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

			//a function to return the sub elements of a parent element
			function returnSub(inputArray, parentId){
				// initialise an array to hold the sub elements
				var subArray = [];
				var currentElement = {};

				for (var i in inputArray){
					currentElement = inputArray[i];

					if(angular.isDefined(currentElement.parentElementId) && angular.equals(currentElement.parentElementId,parentId)){
						subArray.push(currentElement);
					}
				}

				return subArray;
			}
			// *************************************************************************************


		}
	};
}]);
