angular.module('baabtra').service('evaluationService',['$http','bbConfig',function evaluationService($http,bbConfig) {

	this.evaluationFetch = function(userCourseMappingId,tlPoint,elementType,outerIndex){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluationFetch/',
	    data:{userCourseMappingId:userCourseMappingId,tlPoint:tlPoint,elementType:elementType,outerIndex:outerIndex}
	 });
	return promise;
};

this.evaluateAnswer = function(userCourseMappingId,tlPoint,elementType,outerIndex,evaluationobj){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluateAnswer/',
	    data:{userCourseMappingId:userCourseMappingId,tlPoint:tlPoint,elementType:elementType,outerIndex:outerIndex,evaluationobj:evaluationobj}
	 });
	return promise;
};

	
}]);