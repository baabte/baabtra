angular.module('baabtra').service('commonSrv',['$http','bbConfig',function commonSrv($http,bbConfig) {
this.FnLoadGlobalValues=function(key)
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'LoadGlobalValues/',
          data:{"key":key},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

  this.fnUploadProfilePic = function (path, urmId){
    var promise = $http({
      url: bbConfig.BWS+'UploadProfilePic/',
      data: {"path":path, "urmId":urmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

      // this.FnLoadExistingResellerUserData=function($scope, userEmail)
      // {
      //   $http({
      //     method: 'post',
      //     url: bbConfig.BWS+'LoadExistingUserData/',
      //     data:{"userEmail":userEmail},
      //     contentType:'application/json; charset=UTF-8',
      //   }).
      //   success(function(data, status, headers, config) {//success respond from server
      //       //$scope.globalValues=angular.fromJson(JSON.parse(data));//Converting the result to json object
      //     }).
      //     error(function(data, status, headers, config) {
      //       // called asynchronously if an error occurs
      //       // or server returns response with an error status. 
      //     });
      // };
}]);