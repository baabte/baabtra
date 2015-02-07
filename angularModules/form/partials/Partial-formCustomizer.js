angular.module('baabtra').controller('FormcustomizerCtrl',['$scope','$rootScope','$state','commonService','formCustomizerService','$modal','$alert',function($scope,$rootScope,$state,commonService,formCustomizerService,$modal,$alert){

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

//getting user crmid and data user id 
 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
 var userId=$rootScope.userinfo.ActiveUserData.userLoginId;//user id
 var companyId='';
console.log($rootScope.userinfo.ActiveUserData);
//objects for custom form 
$scope.customForm={};
 $scope.customForm.formSteps=0; //if super admin to create new form the form steps will be set as 0 primary 

if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,1)){
$scope.selectFormcheck=true; //all forms will be shown to super admin without selecting form 
$scope.formNameFieldActive=true;
$scope.customForm.formSchema={};//form schema for new form super admin 

}
else{
  $scope.selectFormcheck=false; //all forms will be shown to super admin without selecting form 
  $scope.formNameFieldActive=false;
 companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

}



$scope.status={};//status for the tick mark of all selections

//fetching all forms of the user 
var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='';//to fetch all the froms give specific name to fetch that form only

  //service call for form fetch
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));

$scope.formlist=result.formlist;
});




//functon trigred when a form is selected 
$scope.fnselectForm = function(selForm){
	
  // console.log("fnselectForm");
  
   $scope.customForm=selForm;
   $scope.customForm._id=selForm._id.$oid;
   $scope.selectFormcheck=true;
};



//funtion to create step
$scope.fnCreateStep = function(stepName){
  // console.log("fnCreateStep");
  
  $scope.customForm.formSteps+=1;
  var stepslen=$scope.customForm.formSteps;
  $scope.customForm.formSchema[stepslen]= {};
  $scope.customForm.formSchema[stepslen].stepFormSchema={};
  $scope.customForm.formSchema[stepslen].stepName=stepName;
  
  delete $scope.stepName;

// console.log($scope.customForm);

};

//function to delete step
$scope.fnDeleteStep = function(key){

// console.log("fnDeleteStep");
 $scope.customForm.formSchema[key]= {};
while(key<=$scope.customForm.formSteps){
 $scope.customForm.formSchema[key]= $scope.customForm.formSchema[key+1];
 key++;
}
delete $scope.customForm.formSchema[$scope.customForm.formSteps];

$scope.customForm.formSteps-=1;

$scope.status.selected={};

};

//funtion to call create step model 
$scope.createStepModel = function(){
$modal({ scope: $scope,
              template: 'angularModules/form/partials/createStepModel.html',
              placement:'center',
              show: true});
};


//function to save/update custom form
$scope.fnSaveCustomForm = function(){
$scope.customForm.loggedusercrmid=loggedusercrmid;
$scope.customForm.fkcompanyId=companyId;
$scope.customForm.fkuserId=userId;

var customForm= angular.copy($scope.customForm);



var fnSaveCustomFormCallBack=formCustomizerService.FnSaveCustomForm(customForm);

fnSaveCustomFormCallBack.then(function(data){

 var result=angular.fromJson(JSON.parse(data.data));
 console.log(result);
 $scope.notifications('Yaay..!','Form Customized Successfully','success');

 $state.go('home.main.formCustomizer.SelectStep');


});


};

/////validations

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




///////call back funtions 
// $scope.fnSaveCustomFormCallBack = function(result){

//   if(result==='success'){

//         $scope.notifications('Yaay..!','Form Customized Successfully','success');
        
//         // FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);
        
//         // $scope.customForm={};
//         // $scope.formCustomizer.$setPristine();
//         // $scope.stepCustomForm.$setPristine();


        
//       }
//    if(result==='error'){
//         $scope.notifications('opps!','Error in connecting to server','danger');
       
//       }
// };





// console.log($scope.customForm);



$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);