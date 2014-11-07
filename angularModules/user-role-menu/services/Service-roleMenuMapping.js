(function() {

  'use strict';

/**
 * @ngdoc service
 * @name baabtraApp.RoleMenuMapping
 * @description
 * # RoleMenuMapping
 * Service in the baabtraApp.
 */
      angular.module('baabtra')
        .service('Rolemenumapping', function Rolemenumapping($http) {
          // AngularJS will instantiate a singleton by calling "new" on this function
      var role_id;
            this.FnGetRoles=function ($scope){
            $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
                  method: 'post',
                  url: bb_config.BWS+'UserRoleMenuMapping/',
                  //data: "{'fkUserRoleMappingId':103,'menuStructure': [{'fkmenuRegionId': 1,'regionMenuStructure': [{'fkMenuId': 1,'MenuName': 'sample','MenuIcon': 'fa_users','childMenuStructure': [{ }] }] }],'createdDate': datetime.now(),'updatedDate': datetime.now(),'crmId': 111,'urmId': 111,'activeFlag': 1}",
                  contentType   : 'application/json; charset=UTF-8',
                 }).
                    success(function(data, status, headers, config) {
                       //result='success';
                      $scope.roles=angular.fromJson(JSON.parse(data));

                       //getting thresult here
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                     // or server returns response with an error status.
                   }); 
          };
          this.FnGetRoleMenus=function ($scope,id){
            role_id=id;
          $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
                  method: 'post',
                  url: bb_config.BWS+'GetRoleMenus/',
                  data: {'fkRoleId':id},
                  contentType   : 'application/json; charset=UTF-8',
                 }).
                    success(function(data, status, headers, config) {
                       //result='success';
                       $scope.menus=angular.fromJson(JSON.parse(data));
                       if($scope.menus.length)
                       {
                        $scope.tree1 =$scope.menus[0].menuStructure[0].regionMenuStructure;
                        $scope.original=$scope.tree1;
                        }
                       else {
                          $scope.tree1=[];
                        }
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                     // or server returns response with an error status.
                   }); 
          };
          this.FnGetAllMenus=function ($scope){
          $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
                  method: 'post',
                  url: bb_config.BWS+'GetAllMenus/',
                  //data: {'fkRoleId':JSON.stringify(id)},
                  contentType   : 'application/json; charset=UTF-8',
                 }).
                    success(function(data, status, headers, config) {

                      var i,j;

                      $scope.allMenus=angular.fromJson(JSON.parse(data));
                      if($scope.allMenus.length) {
                        $scope.tree2=$scope.allMenus[0].menuStructure[0].regionMenuStructure;
                      }
                      else {
                        $scope.tree2=[];
                      }
                      if ($scope.tree2.length>0) {
                       for (i = 0; i < $scope.tree2.length; i++) {
                         $scope.tree2[i].fkMenuId=$scope.tree2[i].fkMenuId.$oid;
                          if($scope.tree2[i].childMenuStructure.length>0){
                              for (j = 0; j < $scope.tree2[i].childMenuStructure.length; j++) {
                              $scope.tree2[i].childMenuStructure[j].fkMenuId=$scope.tree2[i].childMenuStructure[j].fkMenuId.$oid;}
                          }
                       }
                      }
                       
                      if ($scope.tree1.length>0) {
                       for (i = 0; i < $scope.tree1.length; i++) {
                          $scope.tree1[i].fkMenuId=$scope.tree1[i].fkMenuId.$oid;
                          
                          if($scope.tree1[i].childMenuStructure.length>0){
                            for (j = 0; j < $scope.tree1[i].childMenuStructure.length; j++) {
                              $scope.tree1[i].childMenuStructure[j].fkMenuId=$scope.tree1[i].childMenuStructure[j].fkMenuId.$oid;
                            }
                          }
                       }
                      }

                      if($scope.menus.length>0){

                        var allMenus_cout;

                        for (var cur_count = 0; cur_count < $scope.tree1.length; cur_count++) {
                          var cur_menu=$scope.tree1[cur_count];
                          if(cur_menu.childMenuStructure.length>0){
                            for (var subMenu_count = 0; subMenu_count < cur_menu.childMenuStructure.length; subMenu_count++) {
                              var cur_sub_menu=cur_menu.childMenuStructure[subMenu_count];
                              for (allMenus_cout = 0; allMenus_cout < $scope.tree2.length; allMenus_cout++) {
                                if(angular.equals(cur_sub_menu.fkMenuId,$scope.tree2[allMenus_cout].fkMenuId)){
                                  $scope.tree2.splice(allMenus_cout, 1);
                                    break;
                                }
                              }
                            }
                          }
                          for (allMenus_cout = 0; allMenus_cout < $scope.tree2.length; allMenus_cout++) {
                            if(angular.equals(cur_menu.fkMenuId,$scope.tree2[allMenus_cout].fkMenuId)){
                              $scope.tree2.splice(allMenus_cout, 1);
                              break;
                            }
                          }
                        }

                        if($scope.tree2.length === 0) {
                          $scope.tree2=[];
                        }
                      }
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                     // or server returns response with an error status.
                    }); 
          };
          this.FnSaveNewRoleMenu=function ($scope,new_menu){
          $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
                  method: 'post',
                  url: bb_config.BWS+'SaveNewRoleMenu/',
                  data: {"menus":new_menu,"role_id":role_id,'rm_id':"542d498fcf19c1514235f69d"},
                  contentType   : 'application/json; charset=UTF-8',
                 }).
                    success(function(data, status, headers, config) {

                      if (data === "Insert") {
                        Notify('Inserted successfuly', 'top-right', '5000', 'success', 'fa-check', true);
                      }
                      else if (data === "Update") {
                        Notify('Updated successfuly', 'top-right', '5000', 'success', 'fa-check', true);
                      }
                      else if (data === "Not Allowed") {
                        Notify('Not Allowed', 'top-right', '5000', 'warning', 'fa-warning', true);
                      }
                      
                         
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                     // or server returns response with an error status.
                   }); 
          };
        });

})();