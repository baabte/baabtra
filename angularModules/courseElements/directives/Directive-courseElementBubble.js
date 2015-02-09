angular.module('baabtra').directive('courseElementBubble', function() {
	return {
		restrict: 'E',
		templateUrl: 'angularModules/courseElements/directives/Directive-courseElementBubble.html',
		link: function(scope, element, attrs, fn) {
			// console.log(scope.timeLineView[attrs['tlPoint']]);
			if(!angular.equals(attrs['tlPoint'],undefined)){
				scope.thisPoint=attrs['tlPoint'];
			}			
			scope.status = true;
			scope.showBubble = 2;
			scope.viewAllBubble = function(length,elementName){
				//console.log(elementName);
				scope.status = false;
				if(!angular.equals(elementName,"")){
					scope.status = true;
				}
			}
		}
	};
});
