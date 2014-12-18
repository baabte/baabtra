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
    home.FnLoadMenus($scope);
    $scope.$watch('userMenusOrigin',function()
   {
      $scope.navBar=true;
      if (!angular.equals($rootScope.userMenusOrigin,undefined)) {
        getMenuByLink($rootScope.userMenusOrigin,null,null,$state.current.url.split("/")[1]);
        if (!$rootScope.menuExist && $state.current.url.split("/")[1]!="main" ) {
                if (!Object.keys($state.params).length) {
                  $localStorage.linkPath=[];
                  $scope.linkPath=$localStorage.linkPath;
                  $state.go('home.main');
              }
            }
            else if($state.current.url.split("/")[1]=="main")
            {
              $scope.navBar=false;
              $localStorage.linkPath=[];
                  $scope.linkPath=$localStorage.linkPath;
            }
    }
  });
    if (!angular.equals($localStorage.linkPath,undefined)) {
      $scope.linkPath=$localStorage.linkPath;
      $scope.navBar=false;
    }
    
    $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){
          console.log(toState);
              getMenuByLink($rootScope.userMenusOrigin,null,null,toState.url.split("/")[1]);
              if (!$rootScope.menuExist && toState.url.split("/")[1]!="main" ) {
                if (!Object.keys(toParams).length) {
                event.preventDefault();
                }
            }
             else if(toState.url.split("/")[1]=="main")
                {
                  if (!$scope.goMenuVal) {
                      $scope.linkPath.pop();
                  }
                  $localStorage.linkPath=$scope.linkPath;
                  // alert();
                  // $scope.navBar=false;
                  // $scope.userMenus=$rootScope.userMenusOrigin;
                  // $localStorage.linkPath=[];
                  // $scope.linkPath=[];
                  //$scope.linkPath=$localStorage.linkPath;
                }
      });
    
    function getMenuByLink(menu,sub,obj,link){
      $rootScope.menuExist=false;
              if(sub==null){
                sub=0;
              }
              if(!angular.equals(menu[sub],undefined)){
                  getMenuByLink(menu,sub+1,obj,link);
                  if(menu[sub].childMenuStructure.length)
                  {
                    if(obj==null)
                        {obj=[];}
                    if(!angular.equals(menu[sub].fkMenuId,undefined))
                      {obj.push({pathName:menu[sub].MenuName,menu_id:menu[sub].fkMenuId.$oid});}
                    else
                      {obj.push({pathName:menu[sub].MenuName});}
                    getMenuByLink(menu[sub].childMenuStructure,null,obj,link);
                  }
                  else{
                    
                    for (var i = 0; i < menu[sub].actions.length; i++) {
                      //console.log("test");
                      //console.log(menu[sub].actions[i]);
                    }
                    if(menu[sub].MenuLink==link)
                    {
                      if(obj==null)
                        {obj=[];}
                      obj.push({pathName:menu[sub].MenuName,menu_link:menu[sub].MenuLink});
                      $localStorage.linkPath=obj;
                      $scope.linkPath=$localStorage.linkPath;
                      $scope.navBar=true;
                      $rootScope.menuExist=true;
                    }

                  }
              }
            }

    $scope.loadDetails = function(menu){
      if(angular.equals($localStorage.linkPath, undefined))
      {
        $localStorage.linkPath=[];
        $scope.linkPath=$localStorage.linkPath;
      }
      if(menu.childMenuStructure.length>0)
      {
        if(!angular.equals(menu.fkMenuId,undefined))
                       {$localStorage.linkPath.push({pathName:menu.MenuName,menu_link:menu.MenuLink});}
                    else
                       {$localStorage.linkPath.push({pathName:menu.MenuName});}
        $scope.navBar=true;
        $scope.userMenus=menu.childMenuStructure;
        $scope.linkPath=$localStorage.linkPath;
      }
      else{
        //$location.path("home/main/"+menu.M)
        $scope.navBar=true;
        if(!angular.equals(menu.fkMenuId,undefined))
           {$localStorage.linkPath.push({pathName:menu.MenuName,menu_link:menu.MenuLink});}
        else
           {$localStorage.linkPath.push({pathName:menu.MenuName});}
         $scope.linkPath=$localStorage.linkPath;
        $state.go('home.main.'+menu.MenuLink);
      }
        console.log($scope.linkPath);
    };
    $scope.goHome = function(){
      $localStorage.linkPath=[];
      $scope.linkPath=$localStorage.linkPath;
      $scope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      $state.go('home.main');
    };
    $scope.goMenu = function(path,index){
      console.log(path);
      if (!angular.equals(path.menu_link,undefined)) {
        $state.go('home.main.'+path.menu_link);
      }
      else
      {
      $scope.goMenuVal=1;
      if(!angular.equals($localStorage.linkPath.length,index+1)){
        var trim_val=$localStorage.linkPath.length-index;
        for (var j = 1; j < trim_val; j++) {
          $scope.linkPath.pop();
          $localStorage.linkPath=$scope.linkPath;
        }
        $state.go('home.main');
      }
        var flag=0;
        var count=0;
        getMenu($scope.userMenusOrigin,null);
            var getMenu=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined))
                {return 0;}
              if(angular.equals(menu[sub].MenuName,path.pathName))
              {
                $scope.userMenus=menu[sub].childMenuStructure;
                flag=1;
              }
              if (!flag) {
              if(menu[sub].childMenuStructure.length)
               {getMenu(menu[sub].childMenuStructure,null);}
              getMenu(menu,++sub);
              }
            };
          }
    };
}]);