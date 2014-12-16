angular.module('baabtra').controller('HomeCtrl',['$rootScope','$state','$scope','$localStorage','localStorageService','home','$location','$dropdown',function ($rootScope,$state,$scope,$localStorage,localStorageService,home,$location,$dropdown){
  var loginInfo=localStorageService.get('loginInfo');
  console.log($state.current.url.split("/")[1]);

  $scope.linkPath=[];
  if(loginInfo===null||loginInfo.length===0){
       $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
    if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.rm_id=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(loginInfo.roleMappingObj[0].fkCompanyId==""){
        $scope.companyId='';
      }
      else{
        $scope.companyId=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if($scope.roleId!=1 && $scope.roleId!=2){ //checking for login role id
          $location.path('home/main');
      }
    }
    home.FnGetCompanyDetails($scope);               
    $rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){
              // if(fromState!=toState){
               $scope.breadCrumb($scope.userMenusOrigin,toState);
              // }
              // if(fromState.name=="home.main"&&toState.name!="home.main"){
              //    $scope.breadCrumb($scope.userMenusOrigin);
              // } 
              console.log(fromState.name+":"+toState.name);
        });
      $scope.$watch('menuExist',function(b4,aftr){
        console.log("triggered -1");
        if(!$scope.menuExist){
          console.log("triggered");
        $state.go("home.main");
      }
      });
      $scope.menuExist=false;

    $scope.breadCrumb=function (arg,toState) {
      console.log(arg);
      if(toState==null){
        toState=$state.current;
      }
      getMenuByLink(arg,null,null,toState.url.split("/")[1]);
      

          
    };
    function getMenuByLink(menu,sub,obj,link){console.log("bread:"+link);
              if(sub==null){
                sub=0;
              }
              if(menu[sub]!=undefined){
                getMenuByLink(menu,sub+1,obj,link);
                console.log("hai"+sub);
                  if(menu[sub].childMenuStructure.length)
                  {
                    if(obj==null)
                      obj=[];
                    obj.push({pathName:menu[sub].MenuName,menu_id:menu[sub].fkMenuId.$oid})
                    getMenuByLink(menu[sub].childMenuStructure,null,obj,link);
                  }
                  else{
                    if(menu[sub].MenuLink==link)
                    {
                      obj.push({pathName:menu[sub].MenuName,menu_id:menu[sub].fkMenuId.$oid});
                      $scope.linkPath=obj;
                      $scope.navBar=true;
                      $scope.menuExist=true;

                    }
                  }
              }
                
            };
    $scope.loadDetails = function(menu){
      if(menu.childMenuStructure.length>0)
      {
        $scope.linkPath.push({pathName:menu.MenuName,menu_id:menu.fkMenuId.$oid});
        $localStorage.linkPath=$scope.linkPath;
        $scope.navBar=true;
        $scope.userMenus=menu.childMenuStructure;
        $localStorage.userMenus=$scope.userMenus;
      }
      else{
        $scope.linkPath.push({pathName:menu.MenuName,menu_id:menu.fkMenuId.$oid});
        $state.go('home.main.'+menu.MenuLink);
      }
    };
    //$scope.loadDetails($localStorage.userMenus);
    $scope.goHome = function(){
      $scope.linkPath=[];
      $scope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      $state.go('home.main');
    };
    $scope.goMenu = function(path,index){
      if(!angular.equals($scope.linkPath.length,index+1)){
        var trim_val=$scope.linkPath.length-index;
        for (var j = 1; j < trim_val; j++) {
          $scope.linkPath.pop();
        };
        $state.go('home.main');
      }
        var flag=0;
        var count=0;
        getMenu($scope.userMenusOrigin,null);
            function getMenu(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(menu[sub]==undefined)
                return 0;
              if(angular.equals(menu[sub].fkMenuId.$oid,path.menu_id))
              {
                $scope.userMenus=menu[sub].childMenuStructure;
                flag=1;
              }
              if (!flag) {
              if(menu[sub].childMenuStructure.length)
               getMenu(menu[sub].childMenuStructure,null);
              getMenu(menu,++sub);
              }
            }
    };
}]);