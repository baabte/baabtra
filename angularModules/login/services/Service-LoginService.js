angular.module('baabtra').service('LoginService',['$http','bbConfig',function LoginService($http,bbConfig) {
	


	this.fnloginService=function($scope)
	 {
        
      
      $http({//call to the webservice
      method: 'POST',
      url: bbConfig.BWS+'Login/',
      data:$scope.loginCredential, //passing the login credentials          
      }).success(function(data, status, headers, config) 
      {
        $scope.loginSuccessCallback(data);
      }).error(function(data, status, headers, config) {
          $scope.loginFailureCallback(data);
         });
	 }; 

	
}]);
