(function() {
'use strict';
//created by:Suhail pallimalil
/**
 * @ngdoc function
 * @name baabtra.controller:CtloginCtrl
 * @description
 * # CtloginCtrl
 * Controller of the baabtra

 */
angular.module('baabtra')
  .controller('CtloginCtrl',['$scope','Selogin', function ($scope,Selogin) {
   
$scope.loginClick=function(){//login click is the functoin which is to be fired when user clickg the login button .
	//login contains username and password provided by the user.

	
  if ($scope.loginform.$valid) {
		Selogin.Fnlogin($scope.login,$scope);//Fnlogn  is a function in service class of login ,calling function from angular service.
		$scope.loginform.$setPristine();
      }

};

  }]);
})();