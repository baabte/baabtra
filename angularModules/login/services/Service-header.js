angular.module('baabtra').service('header',['$http','bbConfig',function header($http,bbConfig) {

	
	 this.logout=function($scope)//function for logout
	 {
	 	// console.log(userisnfo);
	      $http({//call to the webservice
	      method: 'POST',
	      url: bbConfig.BWS+'logout/',
	      data: JSON.stringify({"UserLogoutObjId":$scope.userinfo}), //passing the login credentials          
	      }).success(function(data, status, headers, config) 
	      {
		       	$scope.fnCallbackLogout();	       	
	      }).error(function(data, status, headers, config) {
	          
	         });
	     
	 }; 


}]);