angular.module('baabtra').service('commonService',['$http','bbConfig',"$state",'localStorageService','$rootScope',function commonService($http,bbConfig,$state,localStorageService,$rootScope) {
//this service is for maintain the userstate 


	

this.GetUserCredentials=function($scope)//function for logout
	 {
	// alert("common");
	 
		if(!$rootScope.userinfo){ //whenever the user refresh the page it will check the credential variable 
			if(localStorageService.get('logDatas')){ // then it will chack the local storage for neccessary datas
				   	 var request = new XMLHttpRequest();
					 request.open('POST', bbConfig.BWS+'loadlogUserdata/', false);  // `false` makes the request synchronous
					 request.send(JSON.stringify({"UserDataObjId":localStorageService.get('logDatas')}));

					 if (request.status === 200) {
		  					if(angular.fromJson(JSON.parse(request.responseText))=="error"||angular.fromJson(JSON.parse(request.responseText))=="failed"){ //if the user data not present it active user log it will push to logout
	       			       		localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
								$rootScope.loggedIn=false;
								$state.go('login');//redirecting path into login
								$rootScope.hide_when_root_empty=false;
							}
			       			else{  //if the user is active in the active log then reload the user state
					       		 $rootScope.userinfo=angular.fromJson(JSON.parse(request.responseText));
		  						 $rootScope.hide_when_root_empty=false;
		  						 $rootScope.loggedIn=true;
			       			}		  
						}
			}
			else{
				localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
				$rootScope.hide_when_root_empty=false;
				$rootScope.loggedIn=true;
				$state.go('login');//redirecting path into login
			}
	}
	return $rootScope.userinfo;
};

 
	
}]);

