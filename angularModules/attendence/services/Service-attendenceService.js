angular.module('baabtra').service('attendenceService',['$http','bbConfig',function attendenceService($http,bbConfig) {

this.courseElementsFetch = function(userCourseMappingId){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'courseElementsByAttendence/',
	    data:{userCourseMappingId:userCourseMappingId}
	 });
	return promise;
};

this.markAttendence = function(userCourseMappingId){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'MarkAttendence/',
	    data:{userCourseMappingId:userCourseMappingId}
	 });
	return promise;
};
	
}]);