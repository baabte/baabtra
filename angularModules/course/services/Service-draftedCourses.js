angular.module('baabtra').service('draftedCourses',['$http','bbConfig',function draftedCourses($http, bbConfig) {

this.fnLoadDraftedCourses = function ($scope){ // this function load in-completed coursers
	$http({
		url: bbConfig.BWS+'loadDraftedCourses/',
		method: "POST",
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		$scope.draftedCourses=angular.fromJson(JSON.parse(data));
	}).
	error(function(data, status, headers, config) {

	});
};

}]);