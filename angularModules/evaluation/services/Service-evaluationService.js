angular.module('baabtra').service('evaluationService',['$http','bbConfig',function evaluationService($http,bbConfig) {

	this.evaluationFetch = function(){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluationFetch/',
	    data:{}
	 });
	return promise;
};

this.evaluateAnswer = function(){
	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'EvaluateAnswer/',
	    data:{}
	 });
	return promise;
};

	
}]);