angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$filter','$rootScope','$state','commonService','userRegistrationService','companyRegistrationService','formCustomizerService','addCourseService','$alert','branchSrv','manageTreeStructureSrv',function($scope,$filter,$rootScope,$state,commonService,userRegistrationService,companyRegistrationService,formCustomizerService,addCourseService,$alert,branchSrv,manageTreeStructureSrv){


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

var companyId;
//getting user crmid and data
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;

 if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,1)){

  companyId='';

}
else{
  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//
 
}

 
branchSrv.fnLoadBranch($scope,companyId);
$scope.allSync={};
$scope.selection={};
$scope.status={};
$scope.status.selected=1;
// $scope.allFunction.newUser=false;
$scope.allSync.FormData={};


// formCustomizerService.FnFetchCustomForm($scope);

var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='userRegistration';//to fetch all the froms give specific name to fetch that form only


var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
// console.log(result);
 $scope.formlist=result.formlist;
        

});



var courseFetchData={};

var FetchCourseListCallBack= addCourseService.fnFetchCourseList(courseFetchData);

FetchCourseListCallBack.then(function(data){

 $scope.allSync.courselist=angular.fromJson(JSON.parse(data.data));
// console.log($scope.allFunction.courselist);


        

});


//code for branch select 
$scope.allSync.branchDetails =[];


$scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.allSync.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.allSync.branchDetails, null);
        // console.log($scope.allFunction.branchDetails);
        $scope.allSync.branchDetails=$scope.allSync.branchDetails[0].children;
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

  if(!angular.equals($scope.allSync.FormData._id,undefined)){
    $scope.userRegister._id=$scope.allSync.FormData._id.$oid;
  }
  $scope.userRegister=$scope.allSync.FormData;
  $scope.userRegister.loggedusercrmid=loggedusercrmid;
  $scope.userRegister.companyId=companyId;

  //service call for user registration
  // console.log($scope.userRegister);

  var fnRegisterUserCallBack=userRegistrationService.FnRegisterUser($scope.userRegister);


fnRegisterUserCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));

     $scope.notifications('Yaay..!','Registered Successfully','success');   

});

};








///////////////////////////////////////////////////////////////////////////////////  

///validations// 



 
 	  
   

// //funtion to check url pattern
// $scope.urlPattern = (function() {
//   $scope.regexpUrl =/(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
// 		return {
// 			test: function(value) {
// 			if( $scope.requireUrl === false ) {return true;}
// 			else {return $scope.regexpUrl.test(value);}
// 		}
//   };
// })();
    
// //function to check number pattern
// $scope.NumberPattern = (function() {
//   $scope.regexpNum =/^[0-9]+$/;
//     return {
//         test: function(value) {
//             if( $scope.requireNum === false ){ 
//               return true;}
//             else {
//               return $scope.regexpNum.test(value);}
//         }
//     };
// })();

// //function to check number pattern
// $scope.AlfaPattern = (function() {
//   $scope.regexpAlfa =/^[a-zA-Z]+$/;
//     return {
//         test: function(value) {
//             if( $scope.regexpAlfa === false ){ 
//               return true;}
//             else {
//               return $scope.regexpAlfa.test(value);}
//         }
//     };
// })();

// //funtion to check email pattern
// 	$scope.emailPattern = (function() {
//     $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//     return {
//         test: function(value) {
//             if( $scope.requireEmail === false ) {return true;}
//             else {return $scope.regexpEmail.test(value);}
//         }
//     };

// })();





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
    
     
  };


// $scope.fnRegisterUserCallBack = function(result){

//   if(result==='success'){
//         $scope.notifications('Yaay..!','Registered Successfully','success');
//         // $state.go('home.main.userRegistration.step5');
//       }
//    if(result==='error'){
//         $scope.notifications('opps!','Error in connecting to server','danger');
       
//       }

// };


// $scope.fnFetchUserDetailsCallBack=function(result){
    
//      if(result==='success'){   //if the email id already registered
//       // console.log($scope.userDetails);
//        $scope.formData=$scope.userDetails.profile;
//        $scope.formData._id=$scope.userDetails._id.$oid;

//        // console.log($scope.formData);
//        $scope.selection.country=$scope.userDetails.profile.contactInfo.country;
//        $scope.selection.state=$scope.userDetails.profile.contactInfo.state;
//        $scope.selection.district=$scope.userDetails.profile.contactInfo.district;
//        $scope.proExperienceCollection=$scope.userDetails.profile.professionalExperience;
//        $scope.formData.officeAdmin.branchDetails=$scope.userDetails.profile.officeAdmin.branchDetails;

//        // console.log($scope.formData);
//       }
//       if(result==='error'){ //if not matching existing registered email
//         $scope.notifications('opps!','Error in connecting to server','danger');
      
//      }
//   };

// $scope.fnFetchCustomFormCallBack = function(result){

//   if(result==='success'){

//     console.log($scope.formlist)
//     $scope.createSteps($scope.formlist.formSteps);
        
//       }
//    if(result==='error'){
//         $scope.notifications('opps!','Error in connecting to server','danger');
       
//       }
// };





$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };





}]);