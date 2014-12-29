//created by midhun sudhakar

angular.module('baabtra').controller('LoginViewCtrl',['$scope','LoginService','$location','localStorageService','$rootScope',function($scope,LoginService,$location,localStorageService,$rootScope){

$scope.login_frequency=0;
$scope.loginCredential={};
$scope.btnSignupText='Sign in'; 
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailRMsg='This is required field';    //error message for required field validator
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation  
$scope.existingEmail='';                       //setting the existsing email id to a scope variable 
$scope.Error_msg=false;   

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
		$scope.logData=angular.fromJson(JSON.parse(data));
		if($scope.logData.result==='true') {
	   	  var logdata=$scope.logData.ActiveUserDataId.$oid.concat($scope.logData.userLoginId);
	  	  localStorageService.add('logDatas',logdata);
	  	  $rootScope.userinfo=$scope.logData;//if login is ok put it in the login info variable.
	  	  $rootScope.loggedIn=true;//if login is ok ,changin the variable in rootscope.
		  $location.path('/home');//routing to home after success login by user
		  $scope.login_or_not='login Success'; 
		}
		else
	    {
	      $scope.progress=false; //setting button enable
	      $scope.btnSignupText='Sign in'; //re setting the value of nutton to signup
	      $scope.loginCredential={};
	      $scope.signinform.$setPristine();
	      $scope.Error_msg=true; 
	      $scope.login_error="password mis-match";   
	      $scope.login_frequency++;  
	    }
	}; 

// $scope.loginSuccessCallback=function(data){
// 		$scope.logData=angular.fromJson(JSON.parse(data));
// 		if($scope.logData.result==='true') {
// 	   	  // var logdata=$scope.logData.ActiveUserDataId.$oid.concat($scope.logData.userLoginId);
// 	  	  localStorageService.add('logDatas',$scope.logData.ActiveUserDataId.$oid);
// 	  	  console.log($scope.logData.LogUserData);
// 	  	  $rootScope.ActiveUserData=$scope.logData.LogUserData;//if login is ok ,changin the variable in rootscope.
// 		  $location.path('/home');//routing to home after success login by user
// 		  $scope.login_or_not='login Success'; 
// 		}
// 		else
// 	    {
// 	      $scope.progress=false; //setting button enable
// 	      $scope.btnSignupText='Sign in'; //re setting the value of nutton to signup
// 	      $scope.loginCredential={};
// 	      $scope.signinform.$setPristine();
// 	      $scope.Error_msg=true; 
// 	      $scope.login_error="password mis-match";   
// 	      $scope.login_frequency++;  
// 	    }
// 	}; 






$scope.Show_hide_val_msg=function(){
	if($scope.login_frequency>0){
		$scope.Error_msg=false; 
	}
};

	$scope.loginFailureCallback=function(data){
		//alert("loginFailureCallback");
		localStorageService.set('loginLsCheck',2);
      	$scope.login_or_not='The Username or Password is incorrect.';
	};
}]);
