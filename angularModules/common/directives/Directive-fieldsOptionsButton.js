angular.module('baabtra').directive('fieldsOptionsButton',['$compile', function($compile) {
	return {
		restrict: 'EA',
		//templateUrl: 'angularModules/common/directives/Directive-fieldsOptionsButton.html',
		link: function(scope, element, attrs, fn) {

			$(element).parent().append($compile('<paper-icon-button style="margin-top: -40px;margin-right: -10px;" class="pull-right"  icon="menu" bs-dropdown="form.genDropdown($index)" data-html="true" data-placement="left"></paper-icon-button>')(scope.$parent));

		}
	};
}]);
