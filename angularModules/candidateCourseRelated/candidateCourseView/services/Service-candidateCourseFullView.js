angular.module('baabtra').service('candidateCourseFullView',['$http','bbConfig',
function candidateCourseFullView($http,bbConfig) {

this.getCurrentElement=function(userLoginId,courseMappingId,direction) {
		 var promise = $http({
			          method: 'post',
			          url: bbConfig.BWS+'getCurrentElement/',
			          data:{"userLoginId":userLoginId,"courseMappingId":courseMappingId,"direction":direction},
			          contentType:'application/json; charset=UTF-8',
			        });
        return promise;
	};

}]);