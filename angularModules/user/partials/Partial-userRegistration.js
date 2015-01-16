angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$filter','$rootScope','$state','commonService','userRegistrationService','companyRegistrationService','$alert','branchSrv','manageTreeStructureSrv',function($scope,$filter,$rootScope,$state,commonService,userRegistrationService,companyRegistrationService,$alert,branchSrv,manageTreeStructureSrv){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
  if($rootScope.userinfo)
   {
    $scope.currentState=toState.name;
  }
});

//getting user crmid and data
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//"5457526122588a5db73e0b23";
 // $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
branchSrv.fnLoadBranch($scope, $rootScope, companyId);
$scope.tableData={};
$scope.formData={};
$scope.selection={};
$scope.newUser=false;



//code for branch select 
$scope.branchDetails =[];

$scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.branchDetails, null);
        // console.log($scope.branchDetails);
        $scope.branchDetails=$scope.branchDetails[0].children;
    }
});

var convertObjectName=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){
                return 0;
              }
                
              if(!angular.equals(menu[sub].childrenObj,undefined)){
                menu[sub].name=menu[sub]._id;
                menu[sub].id=menu[sub]._id;
                menu[sub].$$hashKey=menu[sub]._id+sub;
                delete menu[sub]._id;
                delete menu[sub].createdDate;
                delete menu[sub].parent;
                delete menu[sub].crmId;
                delete menu[sub].updatedDate;
                delete menu[sub].urmId;
                delete menu[sub].activeFlag;
                if(!angular.equals(menu[sub].children,null)){
                menu[sub].children=menu[sub].childrenObj;
                }
                else{
                  menu[sub].children=[];
                }
              }
              if(menu[sub].childrenObj.length){
               convertObjectName(menu[sub].childrenObj,null);
              }
              convertObjectName(menu,++sub);
            };



// $scope.professionalFilled=false;
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
$scope.existingEmail='';


//service to fetch all state district from database 
companyRegistrationService.FnGetCountryStateDistrict($scope);





//function for user registration 
$scope.fnUserRegister =function (argument) {
  //starting to build object to save data in database 

  delete $scope.selection.country.States;//removing state list from country object
  delete $scope.selection.state.Districts;//removing district list from state object

  $scope.formData.contactInfo.country={}; //obj for country details
  $scope.formData.contactInfo.state={}; //obj for state details
  $scope.formData.contactInfo.district={};// obj for district details
  $scope.formData.contactInfo.country=$scope.selection.country;
  $scope.formData.contactInfo.state=$scope.selection.state;
  $scope.formData.contactInfo.district=$scope.selection.district;
  $scope.formData.contactInfo.country.fkcountryId=$scope.formData.contactInfo.country._id.$oid;
  delete $scope.formData.contactInfo.country._id;
  $scope.formData.contactInfo.state.fkstateId=$scope.formData.contactInfo.state.sId.$oid;
  delete $scope.formData.contactInfo.state.sId;
  $scope.formData.contactInfo.district.fkdistrictId=$scope.formData.contactInfo.district.dId.$oid;
  delete $scope.formData.contactInfo.district.dId;



  //removing children node details from selected branch if any
  delete $scope.formData.officeAdmin.branchDetails.children;
  delete $scope.formData.officeAdmin.branchDetails.childrenObj;
  // delete $scope.formData.officeAdmin.branchDetails._hsmeta;

  //object to save professional experience 
  $scope.formData.professionalExperience={};
  $scope.formData.professionalExperience=$scope.proExperienceCollection;
  //if no experience data entered considered as a fresher 
  if (angular.equals($scope.formData.professionalExperience.length,0)) {
      $scope.formData.professionalExperience="Fresher";

  }

	 // console.log($scope.formData);
  
  //building object to pass to service 
  $scope.userRegister={};
  $scope.userRegister.userRegisterData=$scope.formData;
  $scope.userRegister.loggedusercrmid=loggedusercrmid;
  $scope.userRegister.companyId=companyId;

console.log($scope.userRegister);
  
  //service call for user registration
  userRegistrationService.FnRegisterUser($scope);


};

//array to save professional experiece details of user 
$scope.proExperienceCollection = [];


//funtion to add field of user professional experiece details to proExperienceCollection array
$scope.addFormField = function(value){

    //fetch date from details to normal fromat 
    Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
    };

    //date to normal format 
    value.fromDate = $filter('date')(value.fromDate,'dd-MM-yyyy');
    value.toDate = $filter('date')(value.toDate,'dd-MM-yyyy');

    //pushing data to table 
    $scope.proExperienceCollection.push(value);
   
    //clearing data from the field to accept new data
   $scope.tableData={};
};

//function to remove experience from the 
$scope.removeProExperience = function(row){

    var index = $scope.proExperienceCollection.indexOf( row );

  if ( index >= 0 ) {
      $scope.proExperienceCollection.splice( index, 1 );
      }

};




// //watch funtion to analyse change in courseDuration object
//     $scope.$watch('formData', function(){
        
//         if(angular.equals($scope.formData.userInfo,undefined)){
//           console.log($scope.formData.userInfo);

//         $scope.formData.personalInfo={};
//         $scope.formData.guardianDetails={};
//         $scope.formData.contactInfo={};
//         $scope.formData.academicDetails={};
//         $scope.formData.socialProfiles={};
//         $scope.formData.officeAdmin={};
//         $scope.proExperienceCollection={};
     
                    
//                     }
//     }, true);



///////////////////////////////////////////////////////////////////////////////////  

///validations// 

//function for user name validation
$scope.userVal = function (e){
     var userNameId=$scope.formData.userInfo;
     console.log(userNameId.eMail);
     if(angular.equals(userNameId.eMail,undefined)){
      console.log(userNameId);
        $scope.formData.personalInfo={};
        $scope.formData.guardianDetails={};
        $scope.formData.contactInfo={};
        $scope.formData.academicDetails={};
        $scope.formData.socialProfiles={};
        $scope.formData.officeAdmin={};
        $scope.proExperienceCollection={};

     }
    else{
    companyRegistrationService.fnUserNameValid($scope,userNameId);
  }
};

 	  
   

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

//function to check number pattern
$scope.AlfaPattern = (function() {
  $scope.regexpAlfa =/^[a-zA-Z]+$/;
    return {
        test: function(value) {
            if( $scope.regexpAlfa === false ){ 
              return true;}
            else {
              return $scope.regexpAlfa.test(value);}
        }
    };
})();

//funtion to check email pattern
	$scope.emailPattern = (function() {
    $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return {
        test: function(value) {
            if( $scope.requireEmail === false ) {return true;}
            else {return $scope.regexpEmail.test(value);}
        }
    };

})();



/////////////////////////////////////////////////////////////////////////////////

///call back funtions 

//callback fnc for country stata district fetch
$scope.fnGetCountryStateDistrictCallBack=function(result){
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

//call back for user check validation
$scope.fnUserCheckCallBack=function(result){
    
     if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.formData.userInfo.eMail; //setting the existing email id to scope 
       $scope.newUser=false;
       userRegistrationService.FnFetchUserDetails($scope);//if exsisting user fetching all data related from database call
       $scope.notifications('!','Already a user!','info');//notification for 
      }
      if(result.userCheck===0){ //if not matching existing registered email
        $scope.newUser=true;
        $scope.formData.personalInfo={};
        $scope.formData.guardianDetails={};
        $scope.formData.contactInfo={};
        $scope.formData.academicDetails={};
        $scope.formData.socialProfiles={};
        $scope.formData.officeAdmin={};
        $scope.proExperienceCollection={};

     }
  };


$scope.fnRegisterUserCallBack = function(result){

  if(result==='success'){
        $scope.notifications('Yaay..!','Registered Successfully','success');
        $state.go('home.main.userRegistration.step5');
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};


$scope.fnFetchUserDetailsCallBack=function(result){
    
     if(result==='success'){   //if the email id already registered
      // console.log($scope.userDetails);
       $scope.formData=$scope.userDetails;
       // console.log($scope.formData);
       $scope.selection.country=$scope.userDetails.contactInfo.country;
       $scope.selection.state=$scope.userDetails.contactInfo.state;
       $scope.selection.district=$scope.userDetails.contactInfo.district;
       $scope.proExperienceCollection=$scope.userDetails.professionalExperience;
       $scope.formData.officeAdmin.branchDetails=$scope.userDetails.officeAdmin.branchDetails;
      }
      if(result==='error'){ //if not matching existing registered email
        $scope.notifications('opps!','Error in connecting to server','danger');
      
     }
  };






$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };





}]);