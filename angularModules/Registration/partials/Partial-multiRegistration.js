angular.module('baabtra').controller('MultiregistrationCtrl',['$scope','commonService','$rootScope','$state','companyRegistrationService','$modal','bbConfig','$alert',function($scope,commonService,$rootScope,$state, companyRegistrationService,$modal,bbConfig,$alert){


/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var parentCompanyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login details ends*/

	console.log($state.params.key);

	var FuntionalityArray=[{title:'Company',code:'CM',steps:[{name:'User Info'},{name:'Contact'},{name:'Social'}]},{title:'Talent Supplier',steps:[{name:'User Info'},{name:'Contact'},{name:'Social'}]},{title:'Distributer',steps:[{name:'User Info'},{name:'Contact'},{name:'Social'}],code:'DS'}];

	$scope.currentDetails=FuntionalityArray[$state.params.key];
	console.log($scope.currentDetails);

	$scope.status={};
	$scope.formData={};
	$scope.status.selected=1;

	$scope.emailMsg='Not a valid email';          //error message for invalid email validation
	$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
	$scope.existingEmail='';   

	$scope.domainMsg='Not a valid Domain Name';          //error message for invalid domain validation
	$scope.domainEMsg='This Domain Name Already taken'; //error message for domain already exists validation 
	$scope.existingDomain='';   



	// function for next button
	$scope.next = function(){
		$scope.status.selected++;
	};

	// funtion for prevoius button
	$scope.previous = function(){
		$scope.status.selected--;
	};

	// function for registration
	$scope.fnRegister =function(){
		if((angular.equals($scope.currentDetails.title,'Company'))||(angular.equals($scope.currentDetails.title,'Distributer'))){
			$scope.formData.companyType=$scope.currentDetails.code;
		};
		$scope.formData.parentCompanyId=parentCompanyId;
		$scope.formData.rm_id=rm_id;

		console.log($scope.formData);
	};

	//funtion for email validation 
	$scope.emailPattern = (function() {
	    $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	    return {
	        test: function(value) {
	            if( $scope.requireEmail === false ) {return true;}
	            else {return $scope.regexpEmail.test(value);}
	        }
	    };

	})();

	//funtion for email validation 
	$scope.domainPattern = (function() {
	    $scope.regexpDomain =/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/;
	    return {
	        test: function(value) {
	            if( $scope.requireDomain === false ) {return true;}
	            else {return $scope.regexpDomain.test(value);}
	        }
	    };

	})();


	//function for user name validation
	$scope.userVal = function (){
		if(searchTimeOut) {
		    clearTimeout(searchTimeOut);
		  }
	    searchTimeOut=setTimeout(function(){
		    try{		
					var userValObj={"eMail":$scope.formData.eMail,"companyId":parentCompanyId};//object to fetch the user details
					userValObj.fetch='';//to fetch related details of the user pass '' to just user check
					var fnUserNameValidCallBack= companyRegistrationService.fnUserNameValid(userValObj);
					fnUserNameValidCallBack.then(function(data){
					 var result=angular.fromJson(JSON.parse(data.data));
					  if(result.userCheck===1){   //if the email id already registered
					       $scope.existingEmail=$scope.formData.eMail; //setting the existing email id to scope variable for validation.
					       $scope.notifications('Error!','UserName already in Use!','danger');
					      }
					      if(result.userCheck===0){ //if not matching existing registered email
					      
					     }

					})
				}
		    catch(e){
		        $scope.notifications('Invalid','Invalid Enail','warning');
		      }
	    },500);
	};



// funtion for domain check
	var searchTimeOut;
  $scope.checkDomainExits = function(){
    if(searchTimeOut) {
    clearTimeout(searchTimeOut);
    }
    searchTimeOut=setTimeout(function(){
      try{
         if($scope.formData.domainName.length){
           var checkDomainExitsResponse = companyRegistrationService.fnCheckDomainExits($scope.formData.domainName);
           checkDomainExitsResponse.then(function(response){
              var result = angular.fromJson(JSON.parse(response.data));
              if(angular.equals(result.result,'Exits')){
                $scope.notifications('Already in use','This Domain name is already in use','warning');
                $scope.existingDomain=$scope.formData.domainName; //setting the existing email id to scope variable for validation.

              }
             })
        }
      }
      catch(e){
        $scope.notifications('Invalid','Invalid Domain name','warning');
      }
    },500);
  };
 

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:2, type: type});// calling notification message function
    };

}]);