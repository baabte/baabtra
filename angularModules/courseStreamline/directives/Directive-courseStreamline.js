angular.module('baabtra').directive('courseStreamline', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			previewData:'='
		},
		templateUrl: 'angularModules/courseStreamline/directives/Directive-courseStreamline.html',
		link: function(scope, element, attrs, fn) {
			console.log(scope);
			scope.$watch("previewData", function(){
				scope.previewDatas = scope.previewData;
			},true);
		}
	};
});
