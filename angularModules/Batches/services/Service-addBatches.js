angular.module('baabtra').service('addBatches',['$http','bbConfig','$rootScope',function($http,bbConfig,$rootScope) {

 this.addNewBatches=function($scope){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'saveNewBatches/',
	    data:{"batchObj":$scope}
	 });
	return promise;
 }	
 this.loadBatches=function(cmpId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadBatches/',
	    data:{"cmpId":cmpId}
	 });
	return promise;
 }
 this.loadExistingCoursesUnderBatch=function(id){
    var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadExistingCoursesUnderBatch/',
	    data:{"id":id}
	 });
	return promise;

 }

 this.addCoursesToBatch =function(batch){
 	   var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'addCoursesToBatch/',
	    data:{"batch":batch[0]}
	 });
	return promise;
 }
 this.loadCourseRelatedBatches=function(cmpId,coursId){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadCourseRelatedBatches/',
	    data:{"cmpId":cmpId,"courseId":coursId}
	 });
	return promise;
 }
}]);