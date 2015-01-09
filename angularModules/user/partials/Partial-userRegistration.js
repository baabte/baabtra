angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$filter','$rootScope','$state','commonService','userRegistrationService','companyRegistrationService','$alert','branchSrv','manageTreeStructureSrv',function($scope,$filter,$rootScope,$state,commonService,userRegistrationService,companyRegistrationService,$alert,branchSrv,manageTreeStructureSrv){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}
$scope.currentState=$state.current.name;
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
branchSrv.fnLoadBranch($scope,'548bd227f94452e79f1a3867');
$scope.tableData={};
$scope.formData={};
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


$scope.onBranchSelectionChanged = function(items) {
    
    if (items) {
      
      $scope.formData.branchDetails=items;
      // delete $scope.formData.branchDetails.children;
      // delete $scope.formData.branchDetails.childrenObj;
      // delete $scope.formData.branchDetails._hsmeta;

      console.log($scope.formData.branchDetails);
      console.log(items);

      return $scope.formData.branchDetails;

    }
  };

// $scope.professionalFilled=false;
$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
$scope.existingEmail='';

    companyRegistrationService.FnGetCountryStateDistrict($scope);

// $scope.animation="fadeInLeft";



// console.log($scope.formData);
$scope.fnUserRegister =function (argument) {

  console.log($scope.selection);
  delete $scope.selection.country.States;
  delete $scope.selection.state.Districts;

  console.log($scope.selection);
  // $scope.formData.contactInfo.country={};
  // $scope.formData.contactInfo.state={};
  // $scope.formData.contactInfo.district={};

  // $scope.formData.contactInfo.country.fkcountryId=selection.country._id.$oid;
  // $scope.formData.contactInfo.state.fkstateId=selection.state.sId.$oid;
  // $scope.formData.contactInfo.district.fkdistrictId=selection.district.dId.$oid;


	 console.log($scope.formData);
   console.log($scope.proExperienceCollection);

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
  
  // console.log($scope.proExperienceCollection);

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
     var userNameId=$scope.formData.personalInfo;
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
       $scope.existingEmail=$scope.formData.personalInfo.eMail; //setting the existing email id to scope variable for validation.
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