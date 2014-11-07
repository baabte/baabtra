(function() {

  'use strict';

/**

 *Created by  : midhun
 *created on  : 9-10-14
 *Description : This controller is using for managing the role by comapny. 
 
 * @ngdoc function
 * @name baabtraApp.controller:ManageUserRoleCtrl
 * @description
 * # ManageUserRoleCtrl
 * Controller of the baabtra
 */
  // alert("controller outside");
      angular.module('baabtra')
        .controller('ManageUserRoleCtrl',['$scope','ManageUserRole',function ($scope,ManageUserRole) {
         
            
           

             ManageUserRole.RetrieveUserRole($scope); //it wil call the existing roles from database
          
            $scope.AddCompanyRole=function() //function to add a roll
            {
            // alert("function 1 called");
            if ($scope.addroleform.$valid) { //if the form is valid 
               ManageUserRole.addUserRole($scope,$scope.roleform.newRole,$scope.roleform.RoleDesc); //call service function to add user role
              $scope.addroleform.$setPristine(); //set form validation values to default
              $scope.roleform.newRole="";$scope.roleform.RoleDesc="";  // set fields to empty
              Notify('Inserted successfuly', 'top-right', '5000', 'success', 'fa-check', true); // calling notification message function
                                                                                                                  

            }
            
            
          };
          
          $scope.editRole=function(RollData) //it wil edit roles from database
          {
               RollData._id=RollData._id.$oid;
              // alert(RollData._id);
              // alert(RollData.roleDescription);
              // alert(RollData.roleName);
              ManageUserRole.UpdateUserRole(RollData); //call service function
              ManageUserRole.RetrieveUserRole($scope);
              Notify('successfully Edited', 'top-right', '5000', 'success', 'fa-check', true); // calling notification message function
         };
          $scope.deleteRole=function(RollData) //it wil edit roles from database
          {
             
               RollData._id=RollData._id.$oid;
               // alert(RollData._id);
               ManageUserRole.DeleteCompanyRole(RollData); // calling service function
               ManageUserRole.RetrieveUserRole($scope);
               Notify('successfully Deleted', 'top-right', '5000', 'success', 'fa-check', true); // calling notification message function
          };

        }]);
})();