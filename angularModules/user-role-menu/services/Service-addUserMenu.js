(function() {

  'use strict';

/**
 * @ngdoc service
 * @name baabtra.addUserMenu
 * @description
 * # addUserMenu
 * Service in the baabtra.
 */
 /**
 *Created by  : Akshath kumar M.
 *created on  : 05-10-14
 *Description : This service is used for adding the menu items for specific user. 
 */
     var app = angular.module('baabtra');
    //angular.module('baabtra')
      //Service for Inserting menu items for specific user
      app.service('AddUserMenu', function AddUserMenu($http) {
      var thisService=this;
        // AngularJS will instantiate a singleton by calling 'new' on this function
        this.FnSaveUserMenu=function ($scope,fkUserRoleMappingId){
        var result;
        $http({
               url: bb_config.BWS+'InsertUserMenu/',
               data: {'fkUrmId':'5436514bb7e61d822d28238d','fkUserRoleMappingId': $scope.CurrentFkUserRoleMappingId,'fkMenuRegionId':$scope.menuRegionId,'menus':$scope.tree1},
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                  success(function(data, status, headers, config) {
                 if(data === 'Insert'){
                        Notify('Everything is allright.Successfully saved', 'top-right', '5000', 'success', 'fa-check', true); return false;
                 }
                 else if(data === 'Update'){
                       Notify('Everything is allright.Successfully Updated', 'top-right', '5000', 'success', 'fa-check', true); return false;
                     
                 }
                 else{
                      Notify('Something went wrong!!', 'top-right', '5000', 'warning', 'fa-warning', true); return false;
                 }
                                 
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                 });  


         return result;
      
        };
        //function to load the current users
        this.FnLoadUsers=function ($scope){
       
        $http({
               url: bb_config.BWS+'LoadUsers/',
               data: JSON.stringify({'roleId':'5440be0db354932b600b25b9','companyId':0,'prefix': $scope.val}),
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                  success(function(data, status, headers, config) {
               
                     $scope.UserList = angular.fromJson(JSON.parse(data));

                    
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                 });


        };
        //function to load the current users menu items
        this.FnLoadExMenuItems4AUMMapping=function ($scope,fkUserRoleMappingId,fkRoleId){
     
        $http({
               url: bb_config.BWS+'LoadExMenuItems4AUMMapping/',
               data: JSON.stringify({"fkUserRoleMappingId":fkUserRoleMappingId}),
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                  success(function(data, status, headers, config) {
               
                    $scope.ExMenus = angular.fromJson(JSON.parse(data));
                
                    //window.localStorage['ExMenus'] = JSON.stringify($scope.ExMenus);
                   if($scope.ExMenus.length>0){ //checking for the empty object
                    
                    $scope.menuRegionId=$scope.ExMenus[0].menuStructure[0].fkmenuRegionId.$oid;
                    $scope.tree1 = $scope.ExMenus[0].menuStructure[0].regionMenuStructure; //Assigning the object value into a variable to load existing menus
                    $scope.CurrentFkUserRoleMappingId=$scope.ExMenus[0]['fkUserRoleMappingId'].$oid;
                       console.log($scope.tree1); 
                    }
                    else{
                      $scope.ExMenus=[];
                      $scope.tree1=[];
                    }
                    
                    thisService.FnLoadMenuItems4AUMMapping($scope,fkRoleId); //calling the function to load All menuItems
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                 });
     

        };
         //function to load the current users menu items
        this.FnLoadMenuItems4AUMMapping=function ($scope,fkRoleId){
     
        $http({
               url: bb_config.BWS+'LoadMenuItems4AUMMapping/',
               data: JSON.stringify({"fkRoleId": "543fd723e9b9b94500795426"}),
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                  success(function(data, status, headers, config) {
               
                       $scope.menuList = angular.fromJson(JSON.parse(data)); //response from server
                       if($scope.menuList.length>0){
                       $scope.tree2 = $scope.menuList[0].menuStructure[0].regionMenuStructure; //Assigning the object value into a variable to load All menus
                      }
                   
                      //window.localStorage['AllMenus'] = JSON.stringify($scope.menuList);
                     // if(!angular.isUndefined($scope.tree1)){ 
                             
                      if($scope.tree1.length !== 0){ //checking for empty object or not
                     /* var cur_menus=$scope.ExMenus[0].menuStructure[0].regionMenuStructure;
                      var allMenus=$scope.menuList[0].menuStructure[0].regionMenuStructure;
                      //filtering the current menus by comparing with all menus
                      for (var cur_count = 0; cur_count < cur_menus.length; cur_count++) {  

                       for (var allMenus_cout = 0; allMenus_cout < allMenus.length; allMenus_cout++) {
                       allMenus[allMenus_cout].fkMenuId=allMenus[allMenus_cout].fkMenuId.$oid;
                       cur_menus[cur_count].fkMenuId=cur_menus[cur_count].fkMenuId.$oid;
                         if(angular.equals(allMenus[allMenus_cout].fkMenuId.$oid, cur_menus[cur_count].fkMenuId.$oid))
                         {
                          
                          $scope.menuList[0].menuStructure[0].regionMenuStructure.splice(allMenus_cout, 1);
                          break;
                        }
                      }
                    }*/

                    var allMenus_cout;

                    for (var cur_count = 0; cur_count < $scope.tree1.length; cur_count++) {
                      var cur_menu=$scope.tree1[cur_count];
                      $scope.tree1[cur_count].fkMenuId=cur_menu.fkMenuId.$oid;
                      //console.log($scope.tree1[cur_count].fkMenuId);
                      if(cur_menu.childMenuStructure.length>0){
                       for (var subMenu_count = 0; subMenu_count < cur_menu.childMenuStructure.length; subMenu_count++) {
                         var cur_sub_menu=cur_menu.childMenuStructure[subMenu_count];
                         console.log(cur_sub_menu.fkMenuId);
                          if(!angular.isUndefined($scope.tree1[cur_count].childMenuStructure[subMenu_count].fkMenuId)){ 
                        
                         $scope.tree1[cur_count].childMenuStructure[subMenu_count].fkMenuId=$scope.tree1[cur_count].childMenuStructure[subMenu_count].fkMenuId.$oid;
                         }
                         for (allMenus_cout = 0; allMenus_cout < $scope.tree2.length; allMenus_cout++) {
                         
                          if(angular.equals(cur_sub_menu.fkMenuId,$scope.tree2[allMenus_cout].fkMenuId)){
                            $scope.tree2.splice(allMenus_cout, 1);
                            break;
                          }
                        }
                      }
                    }
                    for (allMenus_cout = 0; allMenus_cout < $scope.tree2.length; allMenus_cout++) {
                      $scope.tree2[allMenus_cout].fkMenuId=$scope.tree2[allMenus_cout].fkMenuId.$oid;
                      if(angular.equals(cur_menu.fkMenuId,$scope.tree2[allMenus_cout].fkMenuId)){
                        $scope.tree2.splice(allMenus_cout, 1);
                        break;
                      }
                      for (var allChildMenusCC = 0; allChildMenusCC < $scope.tree2[allMenus_cout].childMenuStructure.length; allChildMenusCC++) {
                      $scope.tree2[allMenus_cout].childMenuStructure[allChildMenusCC].fkMenuId=$scope.tree2[allMenus_cout].childMenuStructure[allChildMenusCC].fkMenuId.$oid;
                      }
                    }
                  }
                   }
                 
                 // }
                  //$scope.tree2 = $scope.menuList[0].menuStructure[0].regionMenuStructure; //Assigning the object value into a variable to load All menus
                      if($scope.tree2.length === 0) {
                        
                        $scope.tree2=[];
                      }
                    
                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                 });
              };
      });

})();

   
