angular.module('baabtra').service('assignCourseMaterial',['$http','bbConfig',function($http,bbConfig) {

//function to load the batches
 this.loadCourses4AssigningCourseMaterial=function(companyId,urmId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadCourses4AssigningCourseMaterial/',
	    data:{"companyId":companyId,"urmId":urmId}
	 });
	return promise;
 };	

this.assignCourseMaterial2timeline=function(courseId, rmId, selectedCourseList){

 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnAssignCourseMaterial2timeline/',
	    data:{"courseId":courseId,"rmId":rmId,"courseObj":selectedCourseList}
	 });
	return promise;
 };	

 this.loadCourses4AssigningCourseMaterialStudent=function(courseId, userrmId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadCourses4AssigningCourseMaterialStudent/',
	    data:{"courseId":courseId, "userrmId":userrmId}
	 });
	return promise;
 };	
}]);