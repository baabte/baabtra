angular.module('baabtra').service('communications',['$http','bbConfig',function($http,bbConfig) {
	this.newMessage = function (data) {
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'sendMessage/',
	      data:data,
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};

	this.loadInbox = function (data) {
		var promise = $http({
	      method: 'post',
	      url: bbConfig.BWS+'loadInbox/',
	      data:data,
	      contentType:'application/json; charset=UTF-8',
	      });
	    return promise;
	};
}]);