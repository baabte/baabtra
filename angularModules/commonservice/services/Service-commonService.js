angular.module('baabtra').service('commonService',['$http','bbConfig',"$rootScope",'localStorageService','$location',function commonService($http,bbConfig,$rootScope,localStorageService,$location) {
//this service is for maintain the userstate 
	if(!$rootScope.userinfo){ //whenever the user refresh the page it will check the credential variable 
		if(localStorageService.get('logDatas')){ // then it will chack the local storage for neccessary datas
		   	  $http({//call to the webservice to load current user's data
		      method: 'POST',
		      url: bbConfig.BWS+'loadlogUserdata/',
		      data: JSON.stringify({"UserDataObjId":localStorageService.get('logDatas')}), //passing the login credentials          
		      }).success(function(data, status, headers, config) 
		      {
       			        if(angular.fromJson(JSON.parse(data))=="error"||angular.fromJson(JSON.parse(data))=="failed"){ //if the user data not present it active user log it will push to logout
       			       		localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
							$rootScope.loggedIn=false;
							$location.path('/login');//redirecting path into login

			       }
			       else{  //if the user is active in the active log then reload the user state
			       		 $rootScope.userinfo=angular.fromJson(JSON.parse(data));
			       		 $rootScope.loggedIn=true;
			       }		              	
		      }).error(function(data, status, headers, config) {	
		          
		         });
		}
		else{
			localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
			$location.path('/login');//redirecting path into login
		}
	}
	
}]);

