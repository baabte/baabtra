angular.module('baabtra').directive('fieldsOptionsButton',['$compile', function($compile) {
	return {
		restrict: 'EA',
		//templateUrl: 'angularModules/common/directives/Directive-fieldsOptionsButton.html',
		link: function(scope, element, attrs, fn) {
			
			alert("hi");
			
			var optionsBtn = '<i class="pull-right mdi-av-playlist-add text-2x" style="margin-top:-30px;" bs-dropdown="form.genDropdown($index)" data-html="true" data-placement="left"></i>';

			// remove the attribute to prevent further compiling
			$(element).removeAttr('fields-options-button');

			$(element).after($compile(optionsBtn)(scope.$parent));

		}
	};
}]);
