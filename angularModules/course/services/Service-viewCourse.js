angular.module('baabtra').service('viewCourse',['$http','bbConfig',function viewCourse($http,bbConfig) {

this.loadCourseData=function($scope){
 var result;

 var promise=$http({
 	method:'POST',
 	url:bbConfig.BWS+'loadCourseData/',
 	data:JSON.stringify({"companyId":$scope.companyId}),
 }).success(function(data, status, headers, config)
 {
 		return data;
 }).error(function(data, status, headers, config){
 	    result='error';

 });

return promise;
};


}]);