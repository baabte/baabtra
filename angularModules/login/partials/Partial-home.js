angular.module('baabtra').controller('HomeCtrl',['$browser','$rootScope','$state','$scope','$localStorage','localStorageService','home','$location','$dropdown',function ($browser,$rootScope,$state,$scope,$localStorage,localStorageService,home,$location,$dropdown){
  var loginInfo=localStorageService.get('loginInfo');
  if(loginInfo===null||loginInfo.length===0){
    $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
  if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.rm_id=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(angular.equals(loginInfo.roleMappingObj[0].fkCompanyId,"")){
        $scope.companyId='';
      }
      else{
        $scope.companyId=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if($scope.roleId!=1 && $scope.roleId!=2){ //checking for login role id
          $state.go('home.main');
      }
    }
    
home.FnLoadMenus($scope);//Load Menus for logged user

$scope.$watch('userMenusOrigin',function(){
  if (!angular.equals($scope.userMenusOrigin,undefined)) {
    $rootScope.menuExist=false;
    getMenuByLink($scope.userMenusOrigin,null,null,$state.current.name);
     if(!$rootScope.menuExist){
      $state.go('home.main');
     }
  }
});
$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
    $rootScope.menuExist=false;
    getMenuByLink($scope.userMenusOrigin,null,null,toState.name);
    if (!$rootScope.menuExist && !angular.equals(toState.name,'home.main')) {
      event.preventDefault();
    }
});

    $scope.loadDetails =function(menu){
      $scope.navBar=true;
      if ($localStorage.linkPath == undefined) {
        $localStorage.linkPath=[];
      }
      $localStorage.linkPath.push(menu);
      $scope.linkPath=$localStorage.linkPath;
      if (menu.childMenuStructure.length) {
        $scope.userMenus=menu.childMenuStructure;
      }
      else if(menu.actions){
        $state.go(menu.actions[0].stateName);
      }
    };

    $scope.goHome = function(){//when click home button this function triggers
      $localStorage.linkPath=[];//link path set to null
      $scope.linkPath=$localStorage.linkPath;
      $scope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      $state.go('home.main');
    };

    $scope.goMenu = function(menu,index){//for go to a particular menu when click the menu path
      console.log(menu);
      var trim_val=$localStorage.linkPath.length-index-1;
      for (var link_index = 0; link_index < trim_val; link_index++) {
        $localStorage.linkPath.pop();
      }
      if (angular.equals(menu.actions,undefined)) {
        $state.go(menu.actions[0].stateName);//go to the curresponding state when click a link
      }
      else {
        $scope.userMenus=menu.childMenuStructure;
        $state.go('home.main');
      }
    };

    // function getMenuByLink(menu,sub,path_obj,state){
    //   if (sub==null) {
    //     sub=0;
    //   }
    //   if (angular.equals(menu[sub],undefined)) {
    //     return 0;
    //   }
    //   console.log(menu[sub]);
    //   if(angular.equals(path_obj,null)){
    //       path_obj=[];
    //     }
    //   if (menu[sub].childMenuStructure.length) {
    //     path_obj.push(menu[sub]);
    //     getMenuByLink(menu[sub].childMenuStructure,null,path_obj,state);
    //   }
    //   else{
    //     if (angular.equals(menu[sub].actions[0].stateName,state)) {
    //       path_obj.push(menu[sub]);
    //       $scope.navBar=true;
    //       $localStorage.linkPath=path_obj;
    //       $scope.linkPath=$localStorage.linkPath;
    //       $rootScope.menuExist=true;
    //     }
    //   }
    //   getMenuByLink(menu,++sub,path_obj,state);
    // }


  function getMenuByLink(menu,sub,path_obj,state){
    //$rootScope.menuExist=false;

    if (sub==null) {
      sub=0;
    }
    if(!angular.equals(menu[sub],undefined)){
     
      getMenuByLink(menu,sub+1,path_obj,state);
      if(menu[sub].childMenuStructure.length){
        if(path_obj==null){
          path_obj=[];
        }
          if(!angular.equals(menu[sub].fkMenuId,undefined)){
            path_obj.push(menu[sub]);
          }
          else{
            path_obj.push(menu[sub]);
          }
          getMenuByLink(menu[sub].childMenuStructure,null,path_obj,state);
        }
        else{
          if(path_obj==null){
            path_obj=[];
          }
          angular.forEach(menu[sub].actions,function(action){
            if (angular.equals(action.stateName,state)) {
              $rootScope.menuExist=true;
              path_obj.push(menu[sub]);
              $scope.navBar=true;
              $localStorage.linkPath=path_obj;
              $scope.linkPath=$localStorage.linkPath;
            }
          });
        }
      }
    }
}]);