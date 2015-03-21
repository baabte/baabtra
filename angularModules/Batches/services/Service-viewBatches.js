angular.module('baabtra').service('viewBatches',['bbConfig','$http',function(bbConfig,$http) {

//function to load the batches
 this.viewBatchesForManage=function($scope,firstId,type,lastId,searchKey){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadBatchesForView/',
	    data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId,"searchKey":searchKey}
	 });
	return promise;
 };	

 this.viewMenteesForManage=function($scope,firstId,type,lastId,searchKey){
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnLoadMenteesForView/',
	    data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId,"searchKey":searchKey}
	 });
	return promise;
 }	

  this.loadBatchMentees=function($scope,batchId){
  	alert('in');
 	var promise = $http({
	 	method: 'POST',
	    url: bbConfig.BWS+'fnloadBatchDetails4assignment/',
	    data:{"companyId":$scope.companyId,"batchId":batchId}
	 });
	return promise;
 };	

}]);