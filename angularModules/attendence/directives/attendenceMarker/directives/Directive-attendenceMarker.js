angular.module('baabtra').directive('attendenceMarker',['attendenceService',function (attendenceService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			userCourseId:'=',
		},
		templateUrl: 'angularModules/attendence/directives/attendenceMarker/directives/Directive-attendenceMarker.html',
		link: function(scope, element, attrs, fn) {
		var courseElementFetchPromise=attendenceService.courseElementsFetch(scope.userCourseId);
		courseElementFetchPromise.then(function(data){
			var result=angular.fromJson(JSON.parse(data.data));
			console.log(result);
		});

		}
	};
}]);
