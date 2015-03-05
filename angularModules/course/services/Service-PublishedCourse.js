angular.module('baabtra').service('PublishedCourse',['$http','bbConfig','$rootScope',function PublishedCourse($http,bbConfig,$rootScope) {

this.loadPublishedCourses=function($scope,searchKey,lastId,type,firstId){
	 $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'loadPublishedCourses/',
	    data:JSON.stringify({"companyId":$scope.companyId,"searchKey":searchKey,"lastId":lastId,"type":type,"firstId":firstId}),
	 }).success(function(data, status, headers, config)
	 {
	 	$scope.publishedCourses = angular.fromJson(JSON.parse(data));
	 	console.log($scope.publishedCourses);
	 	$scope.notfoundCourse=false;
	 }).error(function(data, status, headers, config)
	 {

	 });
	 
	
};

this.courseByKeywords = function(companyId, searchKey){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'courseByKeywords/',
	    data:{"companyId":companyId,"searchKey":searchKey}
	 });
	return promise;
}


	
}]);