angular.module('baabtra').service('addBatches',['$http','bbConfig','$rootScope',function($http,bbConfig,$rootScope) {

 this.addNewBatches=function($scope){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'saveNewBatches/',
	    data:{"batchObj":$scope}
	 });
	return promise;
 }	
}]);