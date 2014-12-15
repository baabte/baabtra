
angular.module('baabtra').
	controller('RoleMenuMappingCtrl',['$scope','RoleMenuMappingSrv','$alert','localStorageService',function ($scope,RoleMenuMappingSrv,$alert,localStorageService) {

  //$scope.companyName="baabtra.com";
  var loginInfo=localStorageService.get('loginInfo');
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
  $scope.SearchType="Company";
  $scope.placeholderVal="Search Companies";
  //$scope.roleId=1;
  //$scope.rm_id='545aff95437b389ba554d6b7';
  $scope.activeLink=1;
  $scope.CompanySate="";
  var CurNewValue="";
  var dragStartStatus=false;
  var MeusStatus=false;
  var tree1dragStartStatus=false;
  if(angular.equals($scope.roleId,1))
{
  var current_menu_type='role';
  var menu_list_type='all';
  RoleMenuMappingSrv.FnLoadTopLevelRoles($scope);
  RoleMenuMappingSrv.FnGetCompanyDetails($scope,"","");
}
else if(angular.equals($scope.roleId,2))
{
  var current_menu_type='role';
  var menu_list_type='user';
  //$scope.companyId='5457526122588a5db73e0b23';//company id
  RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"","");
  $scope.SearchType="Roles";
      $scope.modelSearch="";
      $scope.placeholderVal="Search Roles";
}
	    
    $scope.ChangeCompanyState=function(cmp_id,cmp_name){//To changing the active company in company list
      $scope.SearchType="Roles";
      $scope.modelSearch="";
      $scope.placeholderVal="Search Roles";
      $scope.companyId=cmp_id;
      RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"","");
      $scope.CompanySate=-1;
      //$scope.CurrentCompany=cmp_name;
    };
    $scope.toLevelRoles=function()
    {
      $scope.comapany=false;
      $scope.ModelRoleBox=false;
      $scope.ShowNoDataFound=false;
      $scope.menudetails=false;
      $scope.RoleState=-1;
    };
    $scope.backToCompanies=function(){
      $scope.menudetails=false;
      $scope.modelSearch="";
      $scope.placeholderVal="Search Companies";
      $scope.SearchType="Company";
      $scope.ModelRoleBox=false;
      $scope.comapany=true;
      $scope.ShowNoDataFound=false;
      $scope.RoleState=-1;
      RoleMenuMappingSrv.FnGetCompanyDetails($scope,"","");
    };
    $scope.getRole=function(id){//To load current menus by active role
        $scope.RoleState=id;
        //$scope.AllCompanies=true;
        RoleMenuMappingSrv.FnGetRoleMenus($scope,id,current_menu_type);//function to call the service function to load the existing menu items
        RoleMenuMappingSrv.FnGetAllMenus($scope,menu_list_type);
    };
    $scope.$watch('modelSearch', function (newValue, oldValue) {//function which watces the change in text box and used  for searching companies and roles
      if(!angular.equals(newValue,undefined)){
        //$scope.activeLink=1;
        CurNewValue=newValue;
        if($scope.SearchType==="Company"){//Search by Company
          $scope.CompanySate=-1;
          //$scope.rolesBox=false;
          RoleMenuMappingSrv.FnGetCompanyDetails($scope,"",newValue);
        }
        else if ($scope.SearchType==="Roles"){//Search by Roles
          $scope.menudetails=false;
          $scope.RoleState=-1;
          RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,"",newValue);
        }
      }
    });
        /*---Starting Pagenation for loading companies and roles---*/
    $scope.next_one = function() {//To get Next page
      if($scope.roles_count>12 && $scope.SearchType==="Roles"){//Checking Search type is Roles
        $scope.menudetails=false;
        $scope.RoleState=-1;
        $scope.activeLink=$scope.activeLink+12;
        RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,$scope.activeLink-1,CurNewValue);
      }
      else if($scope.companyCount>6 && $scope.SearchType==="Company"){//Checking Search type is Company
        $scope.activeLink=$scope.activeLink+6;
        RoleMenuMappingSrv.FnGetCompanyDetails($scope,$scope.activeLink-1,CurNewValue);
      }
    };
    $scope.prev_one = function() {//To get Previous page
      if($scope.activeLink>1 && $scope.SearchType==="Roles"){//Checking Search type is Roles
        $scope.menudetails=false;
        $scope.RoleState=-1;
        $scope.activeLink=$scope.activeLink-12;
        RoleMenuMappingSrv.FnGetRoles($scope,$scope.companyId,$scope.activeLink-1,CurNewValue);
      }
      else if($scope.activeLink>1 && $scope.SearchType==="Company"){//Checking Search type is Company
        $scope.activeLink=$scope.activeLink-6;
        RoleMenuMappingSrv.FnGetCompanyDetails($scope,$scope.activeLink-1,CurNewValue);
      }
    };
    /*---Ending Pagenation for loading companies and roles---*/
    $scope.remove = function(scope) {
      scope.remove();
    };
    $scope.toggle = function(scope) {
      scope.toggle();
    };
    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.childMenuStructure.push({
        fkMenuId: nodeData.fkMenuId * 10 + nodeData.childMenuStructure.length,
        MenuName: nodeData.MenuName + '.' + (nodeData.childMenuStructure.length + 1),
        childMenuStructure: []
      });
    };

        $scope.tree1NodesOptions = { 
      dragStart:function(sourceNodeScope, destNodesScope, destIndex) {
        MeusStatus=true;
        tree1dragStartStatus=true;
      },
      accept: function(sourceNodeScope, destNodesScope, destIndex) {
        if (dragStartStatus) {
          if(!angular.equals(sourceNodeScope.$parentNodeScope,destNodesScope.$parentNodeScope) && !tree1dragStartStatus){
            $scope.checkNewMenu(sourceNodeScope.$modelValue.fkMenuId);
            if (sourceNodeScope.$modelValue.childMenuStructure.length>0)
            {

                var newSubMenu=sourceNodeScope.$modelValue.childMenuStructure;
                for (var i = 0; i < newSubMenu.length; i++) {
                   $scope.checkNewMenu(newSubMenu[i].fkMenuId);
                }
            }
            if (!MeusStatus) {
              $alert({title: 'Not Allowed!', type:'warning' ,content: 'This Menu Already Exists',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
            }
            dragStartStatus=false;
          }
        }
        return MeusStatus; 
      },
    };
     $scope.tree2NodesOptions = {
      dragStart:function(sourceNodeScope, destNodesScope, destIndex) {
        MeusStatus=true;
        dragStartStatus=true;
        tree1dragStartStatus=false;
      }
     };
     $scope.checkNewMenu=function(new_menu_id)
     {
            for (var menu_count = 0; menu_count < $scope.tree1.length; menu_count++) {
              if(angular.equals($scope.tree1[menu_count].fkMenuId,new_menu_id))//checking, new menu exists in current root menu
                {
                  MeusStatus=false;
                }
              if ($scope.tree1[menu_count].childMenuStructure.length) {
                var subMenu=$scope.tree1[menu_count].childMenuStructure;
                for (var submenu_count = 0; submenu_count < subMenu.length; submenu_count++) {
                  if(angular.equals(subMenu[submenu_count].fkMenuId,new_menu_id))//checking, new menu exists in current sub menu
                    {
                      MeusStatus=false;
                    }
                }
              }
            }
     };
    $scope.SaveChange=function(id){//To save new menus
      if ($scope.tree1.length) {
        RoleMenuMappingSrv.FnSaveNewRoleMenu($scope,$scope.tree1);
      }
    };
}]);