//created by midhun sudhakar

angular.module('baabtra').controller('LoginViewCtrl',['$scope','LoginService','$location','localStorageService','$rootScope',function($scope,LoginService,$location,localStorageService,$rootScope){

/*if (localStorageService.get('loginLsCheck')===1)
    {  
     $location.path('/page/blank');
   }*/
$scope.btnSignupText='Sign in'; 
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailRMsg='This is required field';    //error message for required field validator
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation  
$scope.existingEmail='';                       //setting the existsing email id to a scope variable      
//callback function for fnCheckEmailExists
$scope.fnCheckLogin=function(){//FnCheckLogin() is the functoin which is to be fired when user clickg the login button .
  $scope.progress=true;
  $scope.btnSignupText='Inprogress...'; //While login to show the inprogress status as value of button.
  
  LoginService.fnloginService($scope);

}; 

$scope.emailPattern = (function() {
     $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
     return {
       test: function(value) {
         if( $scope.requireEmail === false ) {return true;}
         else {return $scope.regexpEmail.test(value);}
       }};
  })();

 $scope.fnCheckEmailExists = function (email){
	// var userEmail={};
	// userEmail.eMail=email; //Email of specific company.
	// if(email!==undefined){   //checking for email field is empty or not
 //        // signin.fnCheckEmailExists($scope,userEmail); //call the service function present inside signup service.
 //      }
     
	}; 

	$scope.loginSuccessCallback=function(data){
	  localStorageService.add('loginInfo',JSON.parse(data));//setting the localstorage value with response from the webservice called.
	  $scope.logged=angular.fromJson(JSON.parse(data));
	  if($scope.logged.result==='true') {
		  $rootScope.loginCheck=1;//if login is ok ,changin the variable in rootscope.
		  localStorageService.set('loginLsCheck',1);//if login is ok ,changin the variable in localstorage.
		  $location.path('/home');//routing to home after success login by user
		  $scope.login_or_not='login Success'; 
		}
		else
	    {
	      $scope.progress=false; //setting button enable
	      $scope.btnSignupText='Signup'; //re setting the value of nutton to signup
	      localStorageService.set('loginLsCheck',2);//If the user not authenticated keep the value of variable in localstorage to 2
	      $location.path('/');
	      $scope.login_or_not='The Username or Password is incorrect.';
	      
	    }
	}; 

	$scope.loginFailureCallback=function(data){
		//alert("loginFailureCallback");
		localStorageService.set('loginLsCheck',2);
      	$scope.login_or_not='The Username or Password is incorrect.';
	};
}]);
