(function() {

  'use strict';

/**
 * @ngdoc function
 * @name baabtra.controller:AddUserMenuCtrl
 * @description
 * # AddUserMenuCtrl
 * Controller of the baabtra
 */
 /**
 *Created by  : Akshath kumar M.
 *created on  : 30-09-14
 *Description : This controller is used for adding the menu items for specific user. 
 */
      var app=angular.module('baabtra');
        app.controller('AddUserMenuCtrl',['$scope','AddUserMenu', function ($scope,AddUserMenu) {  //here AddUserMenu is the service name
          $scope.alphabets=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'];
          $scope.activeLink=''; //for setting active link
          $scope.scOverflow={'max-height':'150px','overflow':'auto'};
          $scope.init = function() { //for initialise the value
          $scope.val = '';
      };

      $scope.init();
         
           $scope.getUsers=function(val){ //function to load the users
              //$event.preventDefault();
              $scope.activeLink=val;
              $scope.val=val;
              AddUserMenu.FnLoadUsers($scope);  //calling the service function FnLoadUsers() for loading the existing users
            };
            $scope.getUsers($scope.val);
            $scope.FnAddUserMenu=function(){

              AddUserMenu.FnSaveUserMenu($scope);

            };
            //alert(angular.equals(JSON.parse(window.localStorage['ExMenus'] || '{}'),JSON.parse(window.localStorage['AllMenus'] || '{}')));
            $scope.getExMenus=function(id,fkRoleId){     //function to call the service function to load the existing menu items
                AddUserMenu.FnLoadExMenuItems4AUMMapping($scope,id,fkRoleId);
                //AddUserMenu.FnLoadMenuItems4AUMMapping($scope,fkRoleId); 

            };
            
          $scope.$watch('txtSearchUser', function (tmpStr) //for live search
          {
            
            if (!tmpStr || tmpStr.length === 0) {
              return 0;
            }
              // if searchStr is still the same..
              // go ahead and retrieve the data
              if (tmpStr === $scope.txtSearchUser)
              {
               $scope.val=tmpStr;
               AddUserMenu.FnLoadUsers($scope);
              }
          });  


          $scope.remove = function(scope) {
            scope.remove();
          };

          $scope.toggle = function(scope) {
            scope.toggle();
          };

          $scope.newSubItem = function(scope) {
            var nodeData = scope.$modelValue;
            nodeData.nodes.push({
              id: nodeData.id * 10 + nodeData.nodes.length,
              title: nodeData.title + '.' + (nodeData.nodes.length + 1),
              nodes: []
            });
          };

           
        }]);
})();