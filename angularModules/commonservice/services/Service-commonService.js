angular.module('baabtra').service('commonService',['$http','bbConfig','$state','localStorageService','$rootScope','$q',function commonService($http,bbConfig,$state,localStorageService,$rootScope,$q) {
//this service is for maintain the userstate 


// loadCredantials=function($scope)//function for logout
// 	 {
// 	 	var deferred = $q.defer();
// 	 	// console.log(deferred);
// 		if(!$rootScope.userinfo){ //whenever the user refresh the page it will check the credential variable 
// 			if(localStorageService.get('logDatas')){ // then it will chack the local storage for neccessary datas
				 
// 				 $http({//call to the webservice
// 				      method: 'POST',
// 				      url: bbConfig.BWS+'loadlogUserdata/',
// 				      data:angular.toJson({"UserDataObjId":localStorageService.get('logDatas')}), //passing the login credentials          
// 				      }).success(function(data, status, headers, config) 
// 				      {
// 				        deferred.resolve(data);
				       
// 				      }).error(function(data, status, headers, config) {
// 				        deferred.reject(data);  
// 				 });


// 			}
// 			else{
// 				localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
// 				$rootScope.hide_when_root_empty=false;
// 				$rootScope.loggedIn=true;
// 				$state.go('login');//redirecting path into login
// 			}
// 		}
// 	 return deferred.promise;
// };

 

// this.GetUserCredentials=function ($scope){ // functon that call web service to load a feature
// 	var myPromise = loadCredantials();
// 	var flag=false;
//     // wait until the promise return resolve or eject
//     //"then" has 2 functions (resolveFunction, rejectFunction)
//     console.log(myPromise.then);
// 		    myPromise.then(function(resolve){
// 		    	// alert(resolve);
// 		        if(angular.fromJson(JSON.parse(resolve))=="error"||angular.fromJson(JSON.parse(resolve))=="failed"){ //if the user data not present it active user log it will push to logout
// 			       			       		localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
// 										$rootScope.loggedIn=false;
// 										$state.go('login');//redirecting path into login
// 										$rootScope.hide_when_root_empty=false;
// 									}
// 					       			else{  //if the user is active in the active log then reload the user state
// 							       		 $rootScope.userinfo=angular.fromJson(JSON.parse(resolve));
// 				  						 $rootScope.hide_when_root_empty=false;
// 				  						 $rootScope.loggedIn=true;
// 				  						 flag=true;
// 					       			}	
// 		        }, function(reject){
// 		        console.log(reject)      
// 		    });
// 		var loopCount = 0;
// 		while(loopCount<50){
// 			if(flag){
// 				loopCount=50;
// 			}
// 			else{
// 				setTimeout(function (argument) {
// 					loopCount++;
// 				},200);
// 			}


// 		}
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

this.GetUserCredentials=function($scope)
	 {
		if(!$rootScope.userinfo){ //whenever the user refresh the page it will check the credential variable 
			if(localStorageService.get('logDatas')){ // then it will chack the local storage for neccessary datas
				   	 var request = new XMLHttpRequest();
					 request.open('POST', bbConfig.BWS+'loadlogUserdata/', true);  // `false` makes the request synchronous
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
	// console.log($rootScope.userinfo);
	return $rootScope.userinfo;
};




	
}]);

