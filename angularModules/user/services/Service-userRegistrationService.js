



angular.module('baabtra').service('userRegistrationService',['$http','$upload','bbConfig',function userRegistrationService($http,$upload,bbConfig) {

this.FnRegisterUser=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'RegisterUser/',
           data: angular.toJson($scope.userRegister),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.result=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnRegisterUserCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnRegisterUserCallBack(result);
             });  
      return result;
   };

   this.FnFetchUserDetails=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'FetchUserDetails/',
           data: angular.toJson($scope.formData.userInfo),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.userDetails=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnFetchUserDetailsCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnFetchUserDetailsCallBack(result);
             });  
      return result;
   };


	
}]);