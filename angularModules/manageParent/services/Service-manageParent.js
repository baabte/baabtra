angular.module('baabtra').service('manageParent',['$http','bbConfig',function($http,bbConfig) {

	this.getParent = function (searchKey,companyId) {
		var promise=$http({
           url: bbConfig.BWS+'fnLoadParents/',
           data: {companyId:companyId,searchKey:searchKey},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
      	return promise;
	};
}]);