angular.module('baabtra').service('addCourseService',['$http','bbConfig','$upload',function addCourseService($http,bbConfig,$upload) {

	
	this.saveCourseObject=function ($scope, courseDetails, keyObj, courseId){ // functon that call web service to add a comapny role
	 	$http({
	 		url: bbConfig.BWS+'saveCourseObject/',
	 		data: {"courseObj":courseDetails, "keyObj":keyObj, "courseId":courseId},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
	 			var result=angular.fromJson(JSON.parse(data));
	 			console.log(result);
	 			$scope.courseId = result.str;
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});  

	 };

	 this.saveCourseTimelineElement = function ($scope, courseId, courseElement){ // functon that call web service to add a comapny role
	 	$http({
	 		url: bbConfig.BWS+'saveCourseTimelineEelement/',
	 		data: {"courseId":courseId, "courseElement":courseElement},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
	 			var result=angular.fromJson(JSON.parse(data));
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});  

	 };

	 this.fnCourseFileUpload = function (fileToBeUpload, pathToBeSave){ // functon that call web service to add a comapny role
	 	var promise=$upload.upload({
           url: bbConfig.BWS+'CourseFileUpload/',
           file: fileToBeUpload,
           data: {'pathToBeSave':pathToBeSave},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
	 	success(function(data, status, headers, config) {
	 			return data;
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});
	 	return promise;
	 };

	 this.fnLoadCourseDetails = function ($scope, courseId){ // this function load in-completed coursers
	 	var promise = $http({
		url: bbConfig.BWS+'loadCourseDetails/',
		method: "POST",
		data:{'courseId':courseId},
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		var result=angular.fromJson(JSON.parse(data));
		return $scope.course = result[0];
	}).
	error(function(data, status, headers, config) {

	});
	return promise;
};

}]);