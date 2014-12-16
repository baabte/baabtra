angular.module('baabtra').service('billingPlans',function($http,bbConfig) {

	this.loadFeatures=function ($scope){ // functon that call web service to load a feature
	 	$http({
	 		url: bbConfig.BWS+'loadFeatures/',
	 		data: JSON.stringify({"name":"nothing"}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnloadFeaturesBack(data);
               }).
	 	error(function(data, status, headers, config) {
	 		console.log(data);
	 	});  
	 };
});