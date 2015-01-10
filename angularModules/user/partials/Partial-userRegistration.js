angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$filter','$rootScope','$state','commonService','userRegistrationService','companyRegistrationService','$alert','branchSrv','manageTreeStructureSrv',function($scope,$filter,$rootScope,$state,commonService,userRegistrationService,companyRegistrationService,$alert,branchSrv,manageTreeStructureSrv){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}
$scope.currentState=$state.current.name;
// console.log($rootScope.userinfo);
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 var companyId="548bd227f94452e79f1a3867";
 // $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
branchSrv.fnLoadBranch($scope,'548bd227f94452e79f1a3867');
$scope.tableData={};
$scope.formData={};
$scope.newUser=false;
// $scope.formData.branchDetails={};
// console.log($scope.formData);

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

    companyRegistrationService.FnGetCountryStateDistrict($scope);

// $scope.animation="fadeInLeft";



// console.log($scope.formData);
$scope.fnUserRegister =function (argument) {

  // console.log($scope.selection);
  delete $scope.selection.country.States;
  delete $scope.selection.state.Districts;

  // console.log($scope.selection);
  

  $scope.formData.contactInfo.country={};
  $scope.formData.contactInfo.state={};
  $scope.formData.contactInfo.district={};
  $scope.formData.contactInfo.country=$scope.selection.country;
  $scope.formData.contactInfo.state=$scope.selection.state;
  $scope.formData.contactInfo.district=$scope.selection.district;


  $scope.formData.contactInfo.country.fkcountryId=$scope.formData.contactInfo.country._id.$oid;
  delete $scope.formData.contactInfo.country._id;
  $scope.formData.contactInfo.state.fkstateId=$scope.formData.contactInfo.state.sId.$oid;
  delete $scope.formData.contactInfo.state.sId;
  $scope.formData.contactInfo.district.fkdistrictId=$scope.formData.contactInfo.district.dId.$oid;
  delete $scope.formData.contactInfo.district.dId;

  delete $scope.formData.officeAdmin.branchDetails.children;
  delete $scope.formData.officeAdmin.branchDetails.childrenObj;
  // delete $scope.formData.officeAdmin.branchDetails._hsmeta;


  $scope.formData.professionalExperience={};
  $scope.formData.professionalExperience=$scope.proExperienceCollection;

  if (angular.equals($scope.formData.professionalExperience.length,0)) {
      $scope.formData.professionalExperience="Fresher"

  };  

	 // console.log($scope.formData);
  

  $scope.userRegister={};
  $scope.userRegister.userRegisterData=$scope.formData;
  $scope.userRegister.loggedusercrmid=loggedusercrmid;
  $scope.userRegister.companyId=companyId;

console.log($scope.userRegister);
  

  userRegistrationService.FnRegisterUser($scope);

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
  
  // console.log($scope.proExperienceCollection);

  };

  $scope.removeProExperience = function(row){

    var index = $scope.proExperienceCollection.indexOf( row );

  if ( index >= 0 ) {
      $scope.proExperienceCollection.splice( index, 1 );
      }

  };

  


//function for user name validation
$scope.userVal = function (e){
     var userNameId=$scope.formData.userInfo;
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

$scope.fnGetCountryStateDistrictCallBack=function(result){
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

 $scope.fnUserCheckCallBack=function(result){
    
     if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.formData.userInfo.eMail; //setting the existing email id to scope 
       $scope.newUser=false;
       userRegistrationService.FnFetchUserDetails($scope);
       
       $scope.notifications('!','Already a user!','info');
      }
      if(result.userCheck===0){ //if not matching existing registered email
        $scope.newUser=true;
      
     }
  };


$scope.fnRegisterUserCallBack = function(result){

  if(result==='success'){
        $scope.notifications('Done!','Created Course Element Successfully ','info');

      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};


$scope.fnFetchUserDetailsCallBack=function(result){
    
     if(result==='success'){   //if the email id already registered
      console.log($scope.userDetails)
       $scope.formData=$scope.userDetails;
       console.log($scope.formData);
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