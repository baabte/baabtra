angular.module('baabtra').controller('UserregistrationCtrl',['$scope','$rootScope','$state','commonService','userRegistrationService','formCustomizerService','$alert',function($scope,$rootScope,$state,commonService,userRegistrationService,formCustomizerService,$alert){


	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

// $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
//   if($rootScope.userinfo)
//    {
//     $scope.currentState=toState.name;
//   }
// });

var companyId;
//getting user crmid and data companyid
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 $scope.status={};
 if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,1)){
  companyId='';
  $scope.status.selected=1;
}
else{
  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//
 $scope.status.selected=1;
}

 //loading branches of company 
// branchSrv.fnLoadBranch($scope,companyId);
$scope.allSync={}; //the variable to pass data in controller to syncdata
// $scope.status.selected=0;
$scope.allSync.newUser=false;
$scope.allSync.FormData={}; // formdata to keep all form inserted data
var mandatoryFields=[]; //array to keep the mandatory form data fields       
// formCustomizerService.FnFetchCustomForm($scope);

var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='userRegistration';//to fetch all the froms give specific name to fetch that form only
// formFetchData.formName='signUp';//to fetch all the froms give specific name to fetch that form only

//sevice call to fetch form 
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
// console.log(result);
 $scope.formlist=result.formlist;
      
      // console.log($scope.formlist);  
$scope.stepCount=$scope.formlist.formSteps;
//to get the mandtory from field name in an array 
for(var i in $scope.formlist.formSchema){
    for(var x in $scope.formlist.formSchema[i].stepFormSchema.fields){
       if(angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'role')||angular.equals($scope.formlist.formSchema[i].stepFormSchema.fields[x].name,'Branch'))
       {}
      
       else{
      mandatoryFields.push($scope.formlist.formSchema[i].stepFormSchema.fields[x].name);
     }
    } 
    } 
    // console.log(mandatoryFields)   
});





// var fnGetCountryStateDistrictCallBack=companyRegistrationService.FnGetCountryStateDistrict();   
// fnGetCountryStateDistrictCallBack.then(function(data){

//   $scope.CSDlist=angular.fromJson(JSON.parse(data.data));


// });


$scope.$watch('allSync.FormData.role', function(){
if(!angular.equals($scope.formlist,undefined)){

        $scope.stepCount= $scope.formlist.formSteps;
        while(!angular.equals($scope.formlist.formSchema[++$scope.stepCount],undefined)){
          // console.log($scope.stepCount);
          delete $scope.formlist.formSchema[$scope.stepCount];
        }

        $scope.stepCount= $scope.formlist.formSteps;
        if($scope.allSync.FormData.role.formSchema){    
              for(var i in $scope.allSync.FormData.role.formSchema){

                  $scope.formlist.formSchema[++$scope.stepCount]=$scope.allSync.FormData.role.formSchema[i];
                             
              }
              // console.log($scope.formlist.formSteps);
            }
    }
                
    }, true);



//function for user registration 
$scope.fnUserRegister =function (argument) {

  
var mandatoryData={};            
  for(var key in $scope.allSync.FormData){
    for(var n in mandatoryFields) {

      if(angular.equals(key,mandatoryFields[n])){
       
        mandatoryData[key]=$scope.allSync.FormData[key];
        delete $scope.allSync.FormData[key];

      }
    }
  }
 if (typeof $scope.allSync.batch != "undefined") { 
 delete $scope.allSync.batch[0].course;
 $scope.allSync.FormData.batchId=$scope.allSync.batch[0]._id 
 delete $scope.allSync.batch[0]._id;
 delete $scope.allSync.batch[0].companyId;
 delete $scope.allSync.batch[0].updatedDate;
 delete $scope.allSync.batch[0].createddDate;
 delete $scope.allSync.batch[0].crmId;
 delete $scope.allSync.batch[0].urmId;
 $scope.allSync.batch[0].startDate=new Date($scope.allSync.batch[0].startDate).toISOString();
 $scope.allSync.batch[0].endDate=new Date($scope.allSync.batch[0].endDate.$date).toISOString();
 $scope.allSync.batch[0].enrollmentAfter=new Date($scope.allSync.batch[0].enrollmentAfter.$date).toISOString();
 $scope.allSync.batch[0].enrollmentBefore=new Date($scope.allSync.batch[0].enrollmentBefore.$date).toISOString();
 $scope.allSync.FormData.batch=$scope.allSync.batch[0];
 delete $scope.allSync.batch;
         var time=(new Date()).valueOf();
         hashids = new Hashids("this is a batch id");
         $scope.allSync.FormData.batch.batchCode = hashids.encode(time); 

} 
   
         
  $scope.userRegister=$scope.allSync.FormData;
  $scope.userRegister.mandatoryData=mandatoryData;
  $scope.userRegister.loggedusercrmid=loggedusercrmid;
  $scope.userRegister.companyId=companyId;

  //service call for user registration
  //console.log($scope.userRegister);
  delete  $scope.userRegister.role.formSchema;
  delete  $scope.userRegister.role.formSteps;
 //console.log($scope.userRegister);
  var fnRegisterUserCallBack=userRegistrationService.FnRegisterUser($scope.userRegister);


fnRegisterUserCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));

     $scope.notifications('Yaay..!','Registered Successfully','success');   
     $state.go('home.main');
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
// $scope.fnGetCountryStateDistrictCallBack=function(result){
//    if(result==='error'){
//         $scope.notifications('opps!','Error in connecting to server','danger');
//       }

// };

// //call back for user check validation
// $scope.fnUserCheckCallBack=function(result){
    
     
//   };


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