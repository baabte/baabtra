angular.module('baabtra').controller('header',['$scope','$rootScope','$state','localStorageService','header','commonService', function($scope,$rootScope,$state,localStorageService,header,commonService) {
		
		if($rootScope.userinfo){
			$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
		}
		$scope.$watch(function() {
  					return $rootScope.userinfo;
		}, function() {
				if($rootScope.userinfo){
					$scope.loggedUserInfo=$rootScope.userinfo.ActiveUserData;
				}
		}, true);		

		//LOGOUT FUNTION
		$scope.logout=function(){//function fired when clicked on logout .
			$scope.userinfo=localStorageService.get('logDatas');
			header.logout($scope);
			};
		//call back functions of LOGOUT
		$scope.fnCallbackLogout=function(){
   				localStorageService.set('logDatas','{}');//resetting the userinfo before logout 
   				$rootScope.loggedIn=false;
   				$rootScope.userinfo=undefined;
				$state.go('login');//redirecting path into login

			}
				
   			

}]);