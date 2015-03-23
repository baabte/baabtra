angular.module('baabtra').directive('setParentHeight', function() {
	return {
		restrict: 'A',
		required:"ngModel",
		scope:{
			clName:"="
		},
		
		link: function(scope, element, attrs, fn) {
			var height;
			if(!angular.equals(scope.clName,undefined)){
				
				height=$(element).parents().find('.'+scope.clName).height();
			}
			else{
				height=$(element).parents().find('.set-full-height').height();
			}
			alert(height);
			$(element).height(height);
		}
	};
});