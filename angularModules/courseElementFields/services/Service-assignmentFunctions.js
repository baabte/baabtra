angular.module('baabtra').service('assignmentFunctions',['$http', 'bbConfig',function ($http, bbConfig) {

	this.fnSubmitAssignment = function (objToBeSaved){
		var promise = $http({
			url: bbConfig.BWS+'fnSubmitAssignment/',
			data: {"objToBeSaved":objToBeSaved},
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	});
	 	return promise;
	 };

}]);