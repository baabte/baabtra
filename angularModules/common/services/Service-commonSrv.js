angular.module('baabtra').service('commonSrv',['$http','bbConfig',function commonSrv($http,bbConfig) {
this.FnLoadGlobalValues=function($scope,key)
      {
        $http({
          method: 'post',
          url: bbConfig.BWS+'LoadGlobalValues/',
          data:{"key":key},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
            $scope.globalValues=angular.fromJson(JSON.parse(data));//Converting the result to json object
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status. 
          });
      };
}]);