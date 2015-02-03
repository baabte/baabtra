//created by midhun sudhakar

angular.module('baabtra').controller('LoginViewCtrl',['$scope','$state','LoginService','localStorageService','$rootScope','commonService','$facebook','$modal', 'GooglePlus','$linkedIn',function($scope,$state,LoginService,localStorageService,$rootScope,commonService,$facebook,$modal,GooglePlus,$linkedIn){


if(localStorageService.get('logDatas')){
	if(localStorageService.get('logDatas').length){
	$state.go('home.main');
}
}

$scope.login_frequency=0;
$scope.loginCredential={};
$scope.btnSignupText='Sign in'; 
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailRMsg='This is required field';    //error message for required field validator
$scope.existingEmail='';                       //setting the existsing email id to a scope variable 
$scope.Error_msg=false;  
$scope.isLoggedIn = true;

///////////////////

$scope.facebook_login=function(){
	$facebook.login().then(function() {
      refresh();
    });
}

function refresh() {
    $facebook.api("/me").then( 
      function(response) {
         $scope.loginCredential={};
         $scope.signinform.$setPristine();
         $scope.loginCredential.id=response.id;
         $scope.socialData=response;
         $scope.socialData.mediaName="facebook";
         $scope.from_where="facebook";
         LoginService.fnloginService($scope);
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
        console.log("err");

      });
  }

// $scope.googleplus_login=function(){
// 	 GooglePlus.login().then(function (authResult) {
//             // console.log(authResult);
//              GooglePlus.getUser().then(function (user) {
//               console.log(user);
//         }, function (err) {
//             console.log(err);
//         });
        
//          });

//     };
 $scope.linkedIn_login= function() {
 	;
      $linkedIn.authorize().then(function(arg){
      	$linkedIn.isAuthorized().then(function(status){
      		if(status==true){
      			$scope.getLinkedInData();
      		}
      	});
      });
     
  };
$scope.getLinkedInData= function(){
	$linkedIn.profile("~",["id","firstName","lastName","pictureUrl","publicProfileUrl","email-address","location","headline","phoneNumbers"],{scope:"r_fullprofile+r_emailaddress"}).then( 
      function(response) {
      	response=response.values[0];
      	$scope.loginCredential={};
      	$scope.signinform.$setPristine();
      	$scope.loginCredential.id=response.id;
      	$scope.socialData=response;
      	$scope.socialData.mediaName="linkedIn";
      	$scope.from_where="linkedIn";
      	LoginService.fnloginService($scope);
      });
};



$scope.fnCheckLogin=function(){//FnCheckLogin() is the functoin which is to be fired when user clickg the login button .
  $scope.progress=true;
  $scope.isLoggedIn = false;
  $scope.btnSignupText='Inprogress...'; //While login to show the inprogress status as value of button. 
  $scope.from_where="direct";
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

 

$scope.loginSuccessCallback=function(data){
		$scope.logData=angular.fromJson(JSON.parse(data));
		if($scope.logData.add_fb){
			if($scope.logData.add_fb=="facebook"){
				$scope.socialSiteName="facebook";
			$modal({ scope: $scope,
              template: 'angularModules/login/partials/Partial-addSocialInfo.html',
              placement:'center',
              show: true});	
			}

		}else{


				if($scope.logData.result==='true') {
			   	  var logdata=$scope.logData.ActiveUserDataId.$oid.concat($scope.logData.userLoginId);
			  	  localStorageService.add('logDatas',logdata);
			  	  $rootScope.userinfo=$scope.logData;//if login is ok put it in the login info variable.
			  	  $rootScope.loggedIn=true;//if login is ok ,changin the variable in rootscope.
				  $state.go('home.main');//routing to home after success login by user
				  $scope.login_or_not='login Success'; 
				}
				else
			    {
			      $scope.progress=false; //setting button enable
			      $scope.btnSignupText='Sign in'; //re setting the value of nutton to signup
			      $scope.loginCredential={};
			      $scope.signinform.$setPristine();
			      $scope.Error_msg=true; 
			      $scope.login_error="wrong email or password. Try again!";   
			      $scope.login_frequency++;  
            $scope.isLoggedIn = true;
			    }
	    }
	}; 

$scope.Show_hide_val_msg=function(){

	if($scope.login_frequency>0){
		$scope.error_class='login-form';
		$scope.Error_msg=false; 
	}
};

}]);


