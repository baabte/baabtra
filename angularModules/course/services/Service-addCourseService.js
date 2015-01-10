angular.module('baabtra').service('addCourseService',['$http','bbConfig',function addCourseService($http,bbConfig) {

	
	this.saveCourseObject=function (courseDetails){ // functon that call web service to add a comapny role
	 	$http({
	 		url: bbConfig.BWS+'saveCourseObject/',
	 		data: {"courseObj":courseDetails},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
	 		console.log(data);
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});  

	 }; 
}]);