angular.module('baabtra').service('viewBatches',['bbConfig','$http',function(bbConfig,$http) {

//function to load the batches
 this.viewBatchesForManage=function($scope){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadBatchesForView/',
	    data:{"companyId":$scope.companyId}
	 });
	return promise;
 };	

 this.viewMenteesForManage=function($scope){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesForView/',
	    data:{"companyId":$scope.companyId,"firstId":$scope.batchObj.mfirstId,"type":$scope.batchObj.mtype,"lastId":$scope.batchObj.mlastId}
	 });
	return promise;
 }	

}]);