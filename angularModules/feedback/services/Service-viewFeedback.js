angular.module('baabtra').service('viewFeedback', ['$http', 'bbConfig', function ($http, bbConfig) {

	this.fnViewFeedbackRequests = function(rmId, companyId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'viewFeedbackRequests/',
	    	data:{rmId:rmId, companyId:companyId}
	 	});
		return promise;
	}

	this.fnLoadFeedbackRequestDetails = function(companyId, feedbackId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'LoadFeedbackRequestDetails/',
	    	data:{companyId:companyId, feedbackId:feedbackId}
	 	});
		return promise;
	}

}]);