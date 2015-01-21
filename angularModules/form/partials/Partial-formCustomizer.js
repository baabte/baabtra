angular.module('baabtra').controller('FormcustomizerCtrl',['$scope','$rootScope','$state','commonService','$alert',function($scope,$rootScope,$state,commonService,$alert){

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
 var companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//




//  // fnDeleteCourseElementCallBack

// $scope.fnDeleteCourseElementCallBack = function(result){

// 	if(result==='success'){
//         $scope.notifications('Done!',' Course Element Deleted ','info');
// 		addCourseElementService.FnGetCourseElements($scope,"");
 
//       }
//    if(result==='error'){
//         $scope.notifications('opps!','Error in connecting to server','danger');
       
//       }


// };


}]);