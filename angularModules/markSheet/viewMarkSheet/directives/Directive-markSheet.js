angular.module('baabtra').directive('markSheet', ['$compile', function ($compile) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			markSheetObj: '='
		},
		templateUrl: 'angularModules/markSheet/viewMarkSheet/directives/Directive-markSheet.html',
		link: function(scope, element, attrs, fn) {

		scope.settPadding = function(node){
			if(node.children.length){
				return 'margin-bottom: 10px;';
			}
		}	
		var template = '<div><div class="col-xs-12 bg-white" style="{{settPadding(node)}};padding-right: 0px;" ng-if="node.mark.markScored"  ng-repeat="node in markSheetObj">'
					  +'<div class="col-xs-8 no-padding font-normal" style="{{settPadding(node)}}">{{node.name}}</div>'
					  +'<div class="col-xs-2 no-padding text-center" >{{node.mark.markScored}}</div>'
					  +'<div class="col-xs-2 no-padding text-center" >{{node.mark.maxMark}}</div>'
					  +'<mark-sheet ng-if="node.children.length" mark-sheet-obj="node.children">'
					  +'</mark-sheet>'
					  +'</div></div>';

			element.html('').append( $compile( template )( scope ) );
		}
	};
}]);
