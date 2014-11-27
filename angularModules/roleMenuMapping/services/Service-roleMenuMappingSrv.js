angular.module('baabtra').service('RoleMenuMappingSrv',['$http','$alert',function RoleMenuMappingSrv($http,$alert) {
  var role_id="";
	this.FnGetCompanyDetails=function($scope,range,cmp_name)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: 'http://127.0.0.1:8000/FnGetCompanyDetailsJi/',
          data:{"range":range,"cmp_name":cmp_name},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.result=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.companyDetails=$scope.result.comapny_detail;//setting the company details
          $scope.companyCount=$scope.result.comapny_count;//setting the company count for pagenation
          if($scope.companyCount===0)//If No matching data found, This will show an error message
          {
            $scope.ShowNoDataFound=true;//Enabling the error Message
            $scope.WarringMessage="No Matching Comapny Found";
          }
          else
          {
            $scope.ShowNoDataFound=false;//Disabling the error Message
          }
          //$scope.companyBox=true;//Enabling Comapny Box,To show the company Details
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      this.FnLoadTopLevelRoles=function($scope)//To Load The Existing Company Details
      {
        $http({
          method: 'post',
          url: 'http://127.0.0.1:8000/FnLoadTopLevelRoles/',
          //data:{"range":range,"cmp_name":cmp_name},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
          $scope.topLevelRoles=angular.fromJson(JSON.parse(data));//Converting the result to json object
          console.log($scope.topLevelRoles);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      this.FnGetRoles=function ($scope,cmp_id,range,roleVal)//To Load The Roles based on company
      {//$scope.indicator=true;
        $http({
          method: 'post',
          url: 'http://127.0.0.1:8000/GetAllRoles/',
          data: {"rm_id":$scope.roleId,"cmp_id":cmp_id,"range":range,"roleVal":roleVal},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          $scope.result=angular.fromJson(JSON.parse(data));//Converting the result to json object
          $scope.roles=$scope.result.roles;//setting the roles details
          $scope.roles_count=$scope.result.roles_count;//setting the roles count for pagenation
          if($scope.roles_count===0)//If No matching data found, This will show an error message
          {
            $scope.ShowNoDataFound=true;//Enabling the error Message
            $scope.WarringMessage="No Matching Roles Found";
          }
          else
          {
            $scope.ShowNoDataFound=false;//Disabling the error Message
          }
          $scope.ModelRoleBox=true;//Enabling rolesBox,To show the Roles Details
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }); 
      };
      this.FnGetRoleMenus=function ($scope,id,type)//To Load existing menus of selected role
      {
        role_id=id;//To Get existing selected role
        $http({
          method: 'post',
          url:  'http://127.0.0.1:8000/GetRoleMenus/',
          data: {'fkRoleId':id,'type':type},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          $scope.menus=angular.fromJson(JSON.parse(data));//Converting the result to json object
          console.log($scope.menus);
          if($scope.menus.length){//Checking, the selected role have existing menus
            $scope.tree1 =$scope.menus[0].menuStructure[0].regionMenuStructure;//Setting exsting menus of selected role to current menu list
            for (var i = 0; i < $scope.tree1.length; i++) {
              $scope.tree1[i].fkMenuId=$scope.tree1[i].fkMenuId.$oid;//Converting root menu ObjectId Id to String        
              if($scope.tree1[i].childMenuStructure.length>0){//Checking root menu having any submenu
                for (var j = 0; j < $scope.tree1[i].childMenuStructure.length; j++) {
                  $scope.tree1[i].childMenuStructure[j].fkMenuId=$scope.tree1[i].childMenuStructure[j].fkMenuId.$oid;//Converting sub menu ObjectId to String 
                }
              }
            }
          }
          else//If no existing role found
          {
            $scope.tree1=[];
          }
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }); 
      };
          this.FnGetAllMenus=function ($scope,type)//To Load All menus of loded user

      { 
        $http({
          method: 'post',
          url: 'http://127.0.0.1:8000/GetAllMenus/',
          data: {'rm_id':$scope.rm_id,'type':type},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          $scope.allMenus=angular.fromJson(JSON.parse(data));//Converting the result to json object

          if ($scope.allMenus.length>0){//Checking the result
            if (type=="all") {
                        for (var i = 0; i < $scope.allMenus.length; i++) {
            $scope.allMenus[i].fkMenuId=$scope.allMenus[i]._id.$oid;
            delete $scope.allMenus[i]._id;
            $scope.allMenus[i].childMenuStructure=[];
              };
          $scope.tree2=$scope.allMenus;
            }
            else{
            $scope.tree2=$scope.allMenus[0].menuStructure[0].regionMenuStructure;//Setting the menus to menulist
            for (var i = 0; i < $scope.tree2.length; i++) {
              $scope.tree2[i].fkMenuId=$scope.tree2[i].fkMenuId.$oid;//Converting root menu ObjectId to String
              if($scope.tree2[i].childMenuStructure.length>0){//Checking root menu having any sub
                for (var j = 0; j < $scope.tree2[i].childMenuStructure.length; j++) {
                  $scope.tree2[i].childMenuStructure[j].fkMenuId=$scope.tree2[i].childMenuStructure[j].fkMenuId.$oid;//Converting sub menu ObjectId to String
                }
              }
            }
          }
          }
          else
          {
            $scope.tree2=[];
          }
          $scope.menudetails=true;
          //$scope.menudetails=true;
        }).
        error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
        }); 
      };
      this.FnSaveNewRoleMenu=function ($scope,new_menu)//To Save current menu list
      {
        $http({
          method: 'post',
          url: 'http://127.0.0.1:8000/SaveNewRoleMenu/',
          data: {"menus":new_menu,"role_id":role_id,'rm_id':$scope.roleId},
          contentType   : 'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {
          if (data=="Insert")
          {
            $alert({title: 'Success!', type:'success', content: 'Menus Insert Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }
          else if (data=="Update")
          {
            $alert({title: 'Success!', type:'success' ,content: 'Menus Updated Successfuly..',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }
          else if (data=="Not Allowed")
          {
            $alert({title: 'Not Allowed!', type:'warning' ,content: 'More than 1 Submenu Not Allowed',animation:'am-fade',duration:'3', placement: 'top-right', template: 'views/ui/angular-strap/alert.tpl.html', show: true});
          }
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        }); 
      };
}]);