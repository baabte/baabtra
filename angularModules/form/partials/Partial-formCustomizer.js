angular.module('baabtra').controller('FormcustomizerCtrl',['$scope','$rootScope','$state','commonService','formCustomizerService','$alert',function($scope,$rootScope,$state,commonService,formCustomizerService,$alert){

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
 var userId=$rootScope.userinfo.ActiveUserData.userLoginId;//

// console.log($rootScope.userinfo);
$scope.customForm={};
// $scope.customForm.formSteps=1;

// console.log($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId);

if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,1)){
$scope.selectFormcheck=true;
}
else{
  $scope.selectFormcheck=false;
 var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

}


// $scope.selectFormcheck=false;
$scope.status={};
$scope.steps=[];//the steps are loaded using this array
// $scope.formStep={};
var formFetchData={};
formFetchData.fkcompanyId=companyId;//to fetch forms from clnCustomForms
formFetchData.formName='';//to fetch all the froms give specific name to fetch that form only






// $scope.formlist=[{formName:"userRegistration",formSteps:4,formSchema:{1:{stepFormSchema:{}},2:{stepFormSchema:{}},3:{stepFormSchema:{}},4:{stepFormSchema:{}}}},{formName:"Form1",formSteps:3,formSchema:{1:{stepFormSchema:{}},2:{stepFormSchema:{}},3:{stepFormSchema:{}}}},{formName:"Form2",formSteps:5,formSchema:{1:{stepFormSchema:{}},2:{stepFormSchema:{}},3:{stepFormSchema:{}},4:{stepFormSchema:{}},5:{stepFormSchema:{}}}}];

$scope.getFormList = function(){

  //service call for form fetch
var FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);

FnFetchCustomFormCallBack.then(function(data){

 $scope.formlist=angular.fromJson(JSON.parse(data.data));

})

};


$scope.fnselectForm = function(selForm){
	
  // console.log(selForm);
  
  $scope.customForm=selForm;
   $scope.customForm._id=selForm._id.$oid;
  // $scope.steps = new Array($scope.customForm.formSteps*1);

   // console.log( $scope.customForm);
$scope.selectFormcheck=true;

	// console.log($scope.customForm);

};




$scope.fnCreateStep = function(stepName){
  // console.log(formCustomizer);
  // var stepslen=$scope.steps.length;
  $scope.customForm.formSteps+=1;
  var stepslen=$scope.customForm.formSteps;
  $scope.customForm.formSchema[stepslen]= {};
  $scope.customForm.formSchema[stepslen].stepFormSchema={};
  $scope.customForm.formSchema[stepslen].stepName=stepName;
  
  delete $scope.stepName;

// console.log($scope.customForm);

};


$scope.fnDeleteStep = function(key){

// console.log(key);
 $scope.customForm.formSchema[key]= {};
while(key<=$scope.customForm.formSteps){
 $scope.customForm.formSchema[key]= $scope.customForm.formSchema[key+1];
 key++;
}
delete $scope.customForm.formSchema[$scope.customForm.formSteps];
// delete $scope.steps[$scope.customForm.formSteps];
// $scope.steps.splice($scope.customForm.formSteps,1);
$scope.customForm.formSteps-=1;
  // $scope.steps = new Array($scope.customForm.formSteps*1);
$scope.status={};

// console.log($scope.customForm);


// $scope.customForm.formSchema[key]


};



$scope.fnSaveCustomForm = function(){

// $scope.customForm.formSchema=$scope.formStep;
$scope.customForm.loggedusercrmid=loggedusercrmid;
$scope.customForm.fkcompanyId=companyId;
$scope.customForm.fkuserId=userId;

// console.log($scope.customForm);

formCustomizerService.FnSaveCustomForm($scope);


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
$scope.fnSaveCustomFormCallBack = function(result){

  if(result==='success'){

        $scope.notifications('Yaay..!','Form Customized Successfully','success');
        
        // FnFetchCustomFormCallBack= formCustomizerService.FnFetchCustomForm(formFetchData);
        
        $scope.customForm={};
        $scope.formCustomizer.$setPristine();
        $scope.stepCustomForm.$setPristine();


        
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }
};








$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);