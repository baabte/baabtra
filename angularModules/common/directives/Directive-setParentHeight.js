angular.module('baabtra').directive('setParentHeight', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {

			var height=$(element).parents().find('.set-full-height').height();
			$(element).height(height);
		}
	};
});