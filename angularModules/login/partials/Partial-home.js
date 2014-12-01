angular.module('baabtra').controller('HomeCtrl',['$scope','localStorageService','home','$location','$dropdown',function ($scope,localStorageService,home,$location,$dropdown){
  var loginInfo=localStorageService.get('loginInfo');
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
          $location.path('/home');
      }
    }
    home.FnGetCompanyDetails($scope);
    $scope.loadDetails = function(menu)
    {
      if(menu.childMenuStructure.length>0)
      {
        $scope.linkPath.push({pathName:menu.MenuName,menu_id:menu.fkMenuId.$oid})
        $scope.navBar=true;
        $scope.userMenus=menu.childMenuStructure;
      }
      else
      {
        alert("link");
      }
    };
    $scope.goHome = function()
    {
      $scope.linkPath=[];
       $scope.navBar=false;
      $scope.userMenus=$scope.userMenusOrigin;
      //$location.path('/home/');
    };
    $scope.goMenu = function(path,index){
      if(!angular.equals($scope.linkPath.length,index+1))
      {
        var trim_val=$scope.linkPath.length-index;
        for (var j = 1; j < trim_val; j++) {
          $scope.linkPath.pop();
        };
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