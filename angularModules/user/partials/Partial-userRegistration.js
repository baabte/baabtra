angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$filter','$rootScope','$state','commonService','userRegistrationService','companyRegistrationService','$alert',function($scope,$filter,$rootScope,$state,commonService,userRegistrationService,companyRegistrationService,$alert){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}
$scope.currentState=$state.current.name;
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
$scope.tableData={};
$scope.formData={};
console.log($scope.formData);



// $scope.professionalFilled=false;
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
$scope.existingEmail='';

    companyRegistrationService.FnGetCountryStateDistrict($scope);

// $scope.animation="fadeInLeft";


$scope.formData.DO=Date();
// console.log($scope.formData);

console.log($scope.formData.DOJ);

console.log($scope);

console.log($scope.formData);
$scope.fnUserRegister =function (argument) {
	console.log(argument);
	// body...
};

$scope.proExperienceCollection = [];

  $scope.addFormField = function(value) {

    Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
};

value.fromDate = $filter('date')(value.fromDate,'dd-MM-yyyy');
value.toDate = $filter('date')(value.toDate,'dd-MM-yyyy');

// console.log(day);
    $scope.proExperienceCollection.push(value);
   
   
   $scope.tableData={};
  
  console.log($scope.proExperienceCollection);

  };

  $scope.removeProExperience = function(row){

    var index = $scope.proExperienceCollection.indexOf( row );

  // $scope.userplan.plan.features.push( feature1 );
  if ( index >= 0 ) {
      $scope.proExperienceCollection.splice( index, 1 );
      }

  };

  


//function for user name validation
$scope.userVal = function (e){
     var userNameId=$scope.formData;
     // console.log(userNameId);
    companyRegistrationService.fnUserNameValid($scope,userNameId);
};

 	$scope.formData = {};
    $scope.selection={};
   

    //funtion to check url pattern
    $scope.urlPattern = (function() {
    $scope.regexpUrl =/(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
		return {
			test: function(value) {
			if( $scope.requireUrl === false ) {return true;}
			else {return $scope.regexpUrl.test(value);}
		}
    };
    })();
    
	//function to check number pattern
	$scope.NumberPattern = (function() {
    $scope.regexpNum =/^[0-9]+$/;
    return {
        test: function(value) {
            if( $scope.requireNum === false ){ 
              return true;}
            else {
              return $scope.regexpNum.test(value);}
        }
    };
	})();


	$scope.emailPattern = (function() {
    $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return {
        test: function(value) {
            if( $scope.requireEmail === false ) {return true;}
            else {return $scope.regexpEmail.test(value);}
        }
    };

})();
 // $state.go('home.main.userRegistration.step1');



// $scope.currentState=$state.current();

// console.log($rootScope.userinfo.ActiveUserData.roleMappingId.$oid);

$scope.fnGetCountryStateDistrictCallBack=function(result){
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

 $scope.fnUserCheckCallBack=function(result){
    
     if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.formData.eMail; //setting the existing email id to scope variable for validation.
       $scope.notifications('Error!','UserName already in Use!','danger');
      }
      if(result.userCheck===0){ //if not matching existing registered email
      
     }
  };

$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };





}]);