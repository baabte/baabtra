angular.module('baabtra').service('attendenceService',['$http','bbConfig',function attendenceService($http,bbConfig) {

this.courseElementsFetch = function(userCourseMappindId){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'courseElementsByAttendence/',
	    data:{userCourseMappindId:userCourseMappindId}
	 });
	return promise;
};
	
}]);