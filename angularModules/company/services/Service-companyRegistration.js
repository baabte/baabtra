(function() {

  'use strict';

/**
 * @ngdoc service
 * @name baabtraApp.companyRegistration
 * @description
 * # companyRegistration
 * Service in the baabtraApp.
 */
 //
 //created by:Arun R Menon
//created on:08-10-14
angular.module('baabtra')
  .service('Companyregistration', function Companyregistration($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.FnGetSectors=function($scope){
    
      $http({
           url: bb_config.BWS+'CompanySector/',
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
              success(function(data, status, headers, config) {
             
             //result='success';
                //alert(JSON.parse(data)); 
                $scope.sectorlist=angular.fromJson(JSON.parse(data));
                // alert(result);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });  


   };

this.FnGetCountryStateDistrict=function($scope){
      //alert("service function");
    // var result;
      $http({
           url: bb_config.BWS+'CountryStateDistrict/',
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
              success(function(data, status, headers, config) {
             
             //result='success';
                //alert(JSON.parse(data)); 
                $scope.CSDlist=angular.fromJson(JSON.parse(data));
                // alert(result);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             });  
    
   };  

    this.FnCompanyRegister=function(companyRegData){
      //alert("flag2")
     
      var result;
      $http({
           url: bb_config.BWS+'CompanyRegistration/',
           data: JSON.stringify(companyRegData),
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
      
           }).
              success(function( data, status, headers, config) {
             
                 result='success';
                //alert($scope.data); 
                
             
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
               // or server returns response with an error status.
             }); 


     return result;
 


   };
  });

})();
