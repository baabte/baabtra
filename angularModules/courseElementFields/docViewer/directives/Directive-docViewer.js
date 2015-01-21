angular.module('baabtra').directive('docViewer',[ '$sce',function($sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data:"@data"
		},
		templateUrl: 'angularModules/courseElementFields/docViewer/directives/Directive-docViewer.html',
		link: function(scope, element, attrs, fn) {

			scope.trustSrc = function(src) {
    				return $sce.trustAsResourceUrl(src);
  			};
		}
	};
}]);
