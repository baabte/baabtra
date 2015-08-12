angular.module('baabtra').controller('BranchesCtrl',['$scope','$rootScope','commonService','$state','$alert','$timeout','localStorageService','$aside','branchSrv','manageTreeStructureSrv',function ($scope,$rootScope,commonService,$state,$alert,$timeout,localStorageService,$aside,branchSrv,manageTreeStructureSrv){

  /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }

  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

  $scope.branchObj = {};

  var branchLoadResponse = branchSrv.fnLoadBranch(companyId);
  branchLoadResponse.then(function(response){
    var result = angular.fromJson(JSON.parse(response.data));
    $scope.branchObj.branches = result.branches;
    console.log(result);
  });

  $scope.newBranch = function() {
    var myOtherAside = $aside({scope: $scope,placement:'left',animation:'am-fade-and-slide-bottom', template: 'angularModules/Branches/aside/aside-newBranch.html'});
  };


}]);
