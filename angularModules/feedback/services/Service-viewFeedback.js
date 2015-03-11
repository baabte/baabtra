angular.module('baabtra').service('viewFeedback', ['$http', 'bbConfig', function ($http, bbConfig) {

	this.fnViewFeedbackRequests = function(rmId, companyId){
		var promise = $http({
	 		method: 'POST',
	    	url: bbConfig.BWS+'viewFeedbackRequests/',
	    	data:{rmId:rmId, companyId:companyId}
	 	});
		return promise;
	}
}]);