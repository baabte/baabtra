(function() {

  'use strict';

/**
 * @ngdoc service
 * @name baabtraApp.manageUserRole
 * @description
 * # manageUserRole
 * Service in the baabtraApp.
 */
 /*
craeted by midhun
created date:10/10/2014
description: service for add roles of a company
 */
  
      var app=angular.module('baabtra');
      app.service('ManageUserRole', function ManageUserRole($http) {

        // AngularJS will instantiate a singleton by calling "new" on this function
        this.addUserRole=function ($scope,roleName,RoleDesc){ 
            $http({
               url: bb_config.BWS+'ManageCompanyRole/',
               data: JSON.stringify({"roleName":roleName,"roleDescription":RoleDesc,"companyId":1010,"createdDate":Date.now(),"updatedDate":Date.now(),"crmId":100,"urmId":100,"activeFlag":1}),
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                 success(function(data, status, headers, config) {
                 
                     //
                 }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                     //alert("failed");
                 });  

        };
        //created date:12/10/2014
        //function to retrive roles of particular company

         this.RetrieveUserRole=function ($scope																																																																																																									,roleName){ // sending a parameter only for test

            $http({
               url: bb_config.BWS+'ViewManageCompanyRole/',
               data: JSON.stringify({"company_id":"value"}), //it will filter roles under a comapany
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                 success(function(data, status, headers, config) {
                     
                     $scope.roles=angular.fromJson(JSON.parse(data)); //converts data response from webservice to json
                    // alert($scope.roles[1]._id);
                    // console.log($scope.roles[1]._id.$oid); 

                 }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                    // alert("failed");
                 }); 
           
        };
        //function to update roles of particular company
        this.UpdateUserRole=function(RollData)
        {
             // alert("service");
            // alert(RollData._id.$oid);
            // alert(RollData.roleDescription);
            // alert(RollData.roleName);
            $http({
               url: bb_config.BWS+'UpdateCompanyRole/',
               data: JSON.stringify(RollData), //it will filter roles under a comapany
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                 success(function(data, status, headers, config) {
                   
                 }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                 
                 }); 

        };
        //function to delete roles of particular company
        this.DeleteCompanyRole=function(RollData)
        {
             // alert("delete service called");
            $http({
               url: bb_config.BWS+'DeleteCompanyRole/',
               data: JSON.stringify(RollData), //it will filter roles under a comapany
               method: "POST",
               withCredentials: false,
               contentType:"application/json",
               dataType:"json",
               }).
                 success(function(data, status, headers, config) {
                  
                 }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                   // or server returns response with an error status.
                    // alert("failed");
                 }); 

        };
       
      });
})();