angular.module('baabtra').service('LoginService',['$http','bbConfig',function LoginService($http,bbConfig) {
	


	this.fnloginService=function($scope)
	 {
        
      var data_to_send={"socialData":$scope.socialData,"from_where":$scope.from_where,"loginCredential":$scope.loginCredential};
      // console.log(data_to_send);
      $http({//call to the webservice
      method: 'POST',
      url: bbConfig.BWS+'Login/',
      data:angular.toJson({"loginData":data_to_send}), //passing the login credentials          
      }).success(function(data, status, headers, config) 
      {
        // data=angular.fromJson(JSON.parse(data));
        // console.log(data);
        $scope.loginSuccessCallback(data);
      }).error(function(data, status, headers, config) {
          
         });
	 }; 

  	
}]);
