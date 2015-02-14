angular.module('baabtra').directive('radioModel', function() {
	return {
		restrict: 'A',
		scope:{radioModel:"="},
		link: function(scope, element, attrs, fn) {
			
			element.on('click', function(){
				
				
				scope.$apply(function() {
					scope.radioModel=attrs.value;
				});
			});

		}
	};
});