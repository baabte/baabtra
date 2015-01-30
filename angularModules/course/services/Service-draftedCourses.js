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

this.fnDeleteCourse = function (courseId){ // this function delete drafted courses
	$http({
		url: bbConfig.BWS+'loadDraftedCourses/',
		method: "POST",
		data:{'courseId':courseId},
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		//$scope.draftedCourses=angular.fromJson(JSON.parse(data));
	}).
	error(function(data, status, headers, config) {

	});
};

}]);