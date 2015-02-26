angular.module('baabtra').directive('fieldsOptionsButton',['$compile', function($compile) {
	return {
		restrict: 'EA',
		//templateUrl: 'angularModules/common/directives/Directive-fieldsOptionsButton.html',
		link: function(scope, element, attrs, fn) {
			$(element).parent().append($compile('<i class="pull-right mdi-av-playlist-add text-2x" bs-dropdown="form.genDropdown($index)" data-html="true" data-placement="left"></i>')(scope.$parent));

		}
	};
}]);
