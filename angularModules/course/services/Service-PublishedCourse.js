angular.module('baabtra').service('PublishedCourse',['$http','bbConfig','$rootScope',function PublishedCourse($http,bbConfig,$rootScope) {

this.loadPublishedCourses=function($scope,searchKey){
	 $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	    data:JSON.stringify({"companyId":$scope.companyId,"searchKey":searchKey}),
	 }).success(function(data, status, headers, config)
	 {
	 		$scope.loadPublishedCoursesCallback(data);
	 }).error(function(data, status, headers, config)
	 {

	 });
	
};


	
}]);