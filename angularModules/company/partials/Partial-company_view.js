angular.module('baabtra').controller('CompanyViewCtrl',['$scope','companyViewService','localStorageService','$location','$alert','$state',function ($scope,companyViewService,localStorageService,$location,$alert,$state){
// if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
//   $location.path('/');
// }  
 
 
if(!angular.equals($state.params.companyId,undefined)){
  $scope.companyId=$state.params.companyId;
  // console.log($scope.companyId);
  $scope.companySelected={};
  $scope.companySelected._id=$scope.companyId;
  // console.log($scope.companySelected);
  companyViewService.fnSelectedCompany($scope);
}
$scope.placeholderVal="Search Companies";
$scope.ShowNoDataFound=false;

//console.log($state);
//$state.current.name=$state.current.name+'.'+$state.params.companyId;
	//id of logged users role mapping id 
     //var loginInfo=localStorageService.get('loginInfo');
      // var loggedusercrmid="546f0a8f3b572dc8a53c2627";

     var loginInfo=localStorageService.get('loginInfo');
      var loggedusercrmid=loginInfo.roleMappingId.$oid;
      // "546f0a8f3b572dc8a53c2627";1
      // console.log(loggedusercrmid);
      //loginInfo.roleMappingId.$oid;
      // to keep count of companies
      $scope.showTime=0;
     
      //to load registerd companies
     companyViewService.fnRegisteredCompanies($scope);

      //to edit a company
      $scope.editCompany=function(Field,Value){
      $scope.companyEdited={};
      $scope.companyEdited.Field=Field;
      $scope.companyEdited.Value=Value;
      $scope.companyEdited._id=$scope.companySelected._id;
      $scope.companyEdited.loggedusercrmid=loggedusercrmid;
      companyViewService.fnCompanyEdit($scope);

    };
    //search company
    $scope.searchCompany=function(key) {
      $scope.searchWord={};
      $scope.searchWord.key=key;
      companyViewService.fnSearchCompany($scope);
        
    };

      //to delete a company
    $scope.deleteCompany=function(company){
      company.loggedusercrmid=loggedusercrmid;
       companyViewService.fnCompanyDelete($scope,company);
    };
    
    //to load more companies
    $scope.showMore=function(){ 
      $scope.showTime=$scope.showTime+6;
      companyViewService.fnShowMore($scope,$scope.showTime); 
    };
    $scope.manageCompany=function(id){
        $scope.companySelected={};
        $scope.companyId=id;
        $scope.companySelected._id=id;
         // console.log($scope.companySelected);
        companyViewService.fnSelectedCompany($scope);
    };
    

  

//callbacks
$scope.fnRegisteredCompaniesCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Loading Companies','warning');
  }
};
$scope.fnSelectedCompanyCallBack=function(result){
   if(result==='success'){
    // $scope.companyId=$scope.companySelected._id.$oid;
    $scope.companySelected._id=$scope.companySelected._id.$oid;

    // console.log($scope.companySelected);
  }
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Loading Selected Company','warning');
  }
};

$scope.editCompanyCallBack=function(result){
  if(result==='success'){
    $scope.notifications('Done',' Successfully Edited ','success');
    companyViewService.fnRegisteredCompanies($scope);
  }
  if(result==='error'){
    $scope.notifications('Error!',' Error!! in Edit Operation','warning');
  }
};

$scope.deleteCompanyCallBack=function(result){
  if(result==='success'){
    $scope.notifications('Done',' Successfully Deleted ','success');
    companyViewService.fnRegisteredCompanies($scope);
     $location.path('/home/company');
  }
  if(result==='error'){
    $scope.notifications('Error!',' Error!! in Deletion','warning');
  }
};

$scope.showMoreCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Show More','warning');
  }
};

 $scope.fnSearchCompanyCallBack=function(result){
  if(result==='error'){
    $scope.notifications('Error!','Error!! in Searching','warning');
  }
 };


//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);


// angular.module('baabtraApp')
//   .controller('RegisteredcompaniesCtrl',['$scope','localStorageService','companyViewService','$location', function ($scope,localStorageService,companyViewService,$location) {

//     if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
//   $location.path('/');
// }      
// }]);
