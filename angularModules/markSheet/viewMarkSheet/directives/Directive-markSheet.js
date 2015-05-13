angular.module('baabtra').directive('markSheet', ['$compile', function ($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			markSheetObj: '='
		},
		templateUrl: 'angularModules/markSheet/viewMarkSheet/directives/Directive-markSheet.html',
		link: function(scope, element, attrs, fn) {

		var template = '<div class="col-xs-12 font-bold  p-xs bg-white " ng-repeat="node in markSheetObj">'
					  +'<div class="col-xs-11 ">{{node.name}}</div>'
					  +'<div class="col-xs-1" ng-if="node.mark.markScored"">{{node.mark.markScored}}/{{node.mark.maxMark}}</div>'
					  +'<mark-sheet ng-if="node.children.length" mark-sheet-obj="node.children">'
					  +'</mark-sheet>'
					  +'</div>';

			element.html('').append( $compile( template )( scope ) );
		}
	};
}]);
