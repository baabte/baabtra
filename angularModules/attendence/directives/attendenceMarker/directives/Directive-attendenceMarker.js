angular.module('baabtra').directive('attendenceMarker',['attendenceService',function (attendenceService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userCourseId:'=',
		},
		templateUrl: 'angularModules/attendence/directives/attendenceMarker/directives/Directive-attendenceMarker.html',
		link: function(scope, element, attrs, fn) {
		// console.log(scope.userCourseId);
		var courseElementFetchPromise=attendenceService.courseElementsFetch(scope.userCourseId);
		

		}
	};
}]);
