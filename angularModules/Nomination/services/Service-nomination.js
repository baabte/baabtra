angular.module('baabtra').service('nomination',['$http', 'bbConfig', function ($http, bbConfig) {

	this.fnAddUserNomination = function(orderObject ,rmId){
	    var promise = $http({
	      url: bbConfig.BWS+'addUserNomination/',
	      data: {orderObject:orderObject, rmId:rmId},
	      method: "POST",
	      withCredentials: false,
	      contentType:"application/json",
	      dataType:"json",
	    });
    return promise;
   };

   this.fnLoadOrderFormById = function(ofId){
	    var promise = $http({
	      url: bbConfig.BWS+'loadOrderFormById/',
	      data: {ofId:ofId},
	      method: "POST",
	      withCredentials: false,
	      contentType:"application/json",
	      dataType:"json",
	    });
    return promise;
   };

}]);