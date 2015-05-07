angular.module('baabtra').directive('subElement', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {

			var parent = $(element).parents('.fieldContainer');
			parent.addClass("col-xs-push-1 col-xs-5");
			parent.find("i").remove();	



			//for controlling the size in the preview
			$(element).addClass("col-xs-push-1 col-xs-5");
			



		}
	};
});