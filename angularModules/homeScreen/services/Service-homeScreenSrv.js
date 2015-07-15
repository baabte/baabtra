angular.module('baabtra').service('homeScreenSrv',['$http','bbConfig',function($http,bbConfig) {

	this.getHomeScreenMenu = function (code) {
		var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'loadHomeScreenMenu/',
          data:{"companyType":code},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;	
	};

	this.saveMenu = function (data) {
		var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'saveHomeScreenMenu/',
          data:data,
          contentType:'application/json; charset=UTF-8',
        });
        return promise;	
	};
	
}]);