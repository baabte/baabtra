angular.module('baabtra').service('PublishedCourse',['$http','bbConfig','$rootScope',function PublishedCourse($http,bbConfig,$rootScope) {

this.loadPublishedCourses=function($scope,searchKey){
	 $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	    data:JSON.stringify({"companyId":$scope.companyId,"searchKey":searchKey}),
	 }).success(function(data, status, headers, config)
	 {
	 	$scope.publishedCourses = angular.fromJson(JSON.parse(data));
	 	//console.log($scope.publishedCourses);
	 	$scope.notfoundCourse=false;
	 }).error(function(data, status, headers, config)
	 {

	 });
	
};


	
}]);