/*
created By:Lijin
date : 6-3-2015
purpose: for getting current course element for full view
*/

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

this.getCourseSyllabus4CandidateView=function(userLoginId,courseMappingId) {
		 var promise = $http({
			          method: 'post',
			          url: bbConfig.BWS+'getCourseSyllabus4CandidateView/',
			          data:{"userLoginId":userLoginId,"courseMappingId":courseMappingId},
			          contentType:'application/json; charset=UTF-8',
			        });
        return promise;
	};	


this.getElement4CandidateView=function(userLoginId,courseMappingId,syllabusObj) {
		 var promise = $http({
			          method: 'post',
			          url: bbConfig.BWS+'getElement4CandidateView/',
			          data:{"userLoginId":userLoginId,"courseMappingId":courseMappingId,syllabusObj:syllabusObj},
			          contentType:'application/json; charset=UTF-8',
			        });
        return promise;
	};		

}]);