angular.module('baabtra').service('notification',['$http','bbConfig', function ($http, bbConfig) {

	this.fnLoadUserNotification = function(fkLoginId){
    var promise = $http({
      url: bbConfig.BWS+'loadUserNotification/',
      data: {fkLoginId:fkLoginId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

  this.fnLoadUserNotificationFull = function(filter,lastId){
    var promise = $http({
      url: bbConfig.BWS+'loadUserNotifications/',
      data: {filter:filter,lastId:lastId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

  this.markNotificationAsRead = function(fkLoginId,id){
    var promise = $http({
      url: bbConfig.BWS+'markNotificationAsRead/',
      data: {fkLoginId:fkLoginId,id:id},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

}]);