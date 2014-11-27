angular.module('baabtra').controller('UsermenumappingCtrl',['$scope','userMenuMappingSrv','$alert',function ($scope,userMenuMappingSrv,$alert){

$scope.roleId=1;
$scope.companyId='';
$scope.range=1;
var CurNewValue="";
var dragStartStatus=false;
var tree1dragStartStatus=false;
var MeusStatus=false;
$scope.comapanyUser=false;
$scope.placeholderVal="Search Users";
$scope.SearchType="Company";
$scope.userRoleMappingId='545aff95437b389ba554d6b7';
if(angular.equals($scope.roleId,1))
{
	userMenuMappingSrv.FnGetCompanyDetails($scope,'','');
}
else if(angular.equals($scope.roleId,2))
{
	$scope.companyState='5457526122588a5db73e0b23';//company id
	$scope.comapanyUser=true;
	$scope.SearchType="User";
	userMenuMappingSrv.FnLoadUsers($scope,$scope.companyState,'','');
}

    $scope.getCompanyAdmin=function(){
      $scope.range=1;
      userMenuMappingSrv.FnGetCompanyDetails($scope,'','');
      $scope.placeholderVal="Search Users";
      $scope.SearchType="Company";
      $scope.modelSearch='';
      $scope.ModelUserBox=false;
      $scope.comapanyUser=false;
      $scope.menudetails=false;
      $scope.companyState=-1;
      $scope.UserState=-1;
    };
    $scope.getCompanyUser=function(){
      userMenuMappingSrv.FnGetCompanyDetails($scope,'','');
      $scope.range=1;
      $scope.placeholderVal="Search Companies";
      $scope.modelSearch='';
      $scope.comapanyUser=true;
      $scope.menudetails=false;
      $scope.companyState=-1;
    };

    $scope.$watch('modelSearch', function (newValue, oldValue) {//function which watces the change in text box and used  for searching companies and roles
      if(!angular.equals(newValue,undefined)){
        CurNewValue=newValue;
          if(angular.equals($scope.SearchType,"Company")){
            userMenuMappingSrv.FnGetCompanyDetails($scope,'',CurNewValue);
          }
          else{
            $scope.menudetails=false;
            $scope.UserState=-1;
            userMenuMappingSrv.FnLoadUsers($scope,$scope.companyState,'',newValue);
          }
        }
      });
	$scope.next_one = function() {
		if($scope.companyCount>6 && angular.equals($scope.SearchType,"Company")){
			$scope.range=$scope.range+6;
			userMenuMappingSrv.FnGetCompanyDetails($scope,$scope.range-1,CurNewValue);
		}
		else if( $scope.user_count>8 && angular.equals($scope.SearchType,"User")){
			$scope.range=$scope.range+8;
			userMenuMappingSrv.FnLoadUsers($scope,$scope.companyState,$scope.range-1,CurNewValue);
		}
	};
	$scope.prev_one = function() {//To get Previous page
		if($scope.range>6 && angular.equals($scope.SearchType,"Company")){
			$scope.range=$scope.range-6;
			userMenuMappingSrv.FnGetCompanyDetails($scope,$scope.range-1,CurNewValue);
		}
		else if($scope.range>8 && angular.equals($scope.SearchType,"User")){
			$scope.range=$scope.range-8;
			userMenuMappingSrv.FnLoadUsers($scope,$scope.companyState,$scope.range-1,CurNewValue);
		}
	};
	$scope.getMenus = function(cmp_id){
		$scope.companyState=cmp_id;
		userMenuMappingSrv.FnLoadExMenuItems4AUMMapping($scope,'',2,cmp_id);
	};
	$scope.FnAddUserMenu=function(){
	    userMenuMappingSrv.FnSaveUserMenu($scope);
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
     $scope.getUsers=function(cmp_id){
        $scope.placeholderVal="Search Users";
        $scope.SearchType="User";
        $scope.companyState=cmp_id;
        userMenuMappingSrv.FnLoadUsers($scope,cmp_id,'','');  //calling the service function FnLoadUsers() for loading the existing users
      };
     $scope.getUserMenu=function(id,fkRoleId){
        $scope.UserState=id;
        userMenuMappingSrv.FnLoadExMenuItems4AUMMapping($scope,id,fkRoleId,'');
      };
    }]);