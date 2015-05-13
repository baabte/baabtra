angular.module('baabtra').service('markSheetService',['$http','bbConfig',function($http,bbConfig) {

	this.getCourseSyllabus = function (courseId) {
		 var promise = $http({ 
            method: 'post',
            url: bbConfig.BWS+'getCourseSyllabus/',
            data:{'courseId':courseId},
            contentType:'application/json; charset=UTF-8',
           });
      return promise;
	}
}]);