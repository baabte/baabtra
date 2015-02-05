angular.module('baabtra').service('PublishedCourse',['$http','bbConfig',function PublishedCourse($http,bbConfig) {

this.loadPublishedCourses=function($scope){
	 $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	 }).success(function(data, status, headers, config)
	 {
	 		$scope.loadPublishedCoursesCallback(data);
	 }).error(function(data, status, headers, config)
	 {

	 });
	
};
	
}]);