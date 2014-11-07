(function(){   
 // using the function form of use-strict...

'use strict';

/**
 * @ngdoc function
 * @name baabtra.controller:CompanyRegisterCtrl
 * @description
 * # CompanyRegisterCtrl
 * Controller of the baabtra
 */
//created by:Arun R Menon
    angular.module('baabtra')
      //.controller('CompanyRegisterCtrl', function ($scope) {
      .controller('CompanyRegisterCtrl',['$scope','Companyregistration', function ($scope,Companyregistration) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
        //alert("controller");
        //$scope.items = ['settings','home','other'];
         //value with crmid of current user now hard coded
           var loggedusercrmid=100;
       Companyregistration.FnGetSectors($scope);
       Companyregistration.FnGetCountryStateDistrict($scope);
      //function to check number pattern
    $scope.NumberPattern = (function() {
        var regexpNum =/^[0-9]+$/;
        return {
            test: function(value) {
                if( $scope.requireNum === false ) { return true; }
                else { return regexpNum.test(value); }
            }
        };
    })();
    //funtion to check url pattern
    $scope.urlPattern = (function() {
        var regexpUrl =/(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
        return {
            test: function(value) {
                if( $scope.requireUrl === false ) { return true; }
                else { return regexpUrl.test(value); }
            }
        };

    })();
    //funtion to cjeck password checking
    $scope.checkPassword = function () {
        $scope.companyregistrationform.cpassword.$error.dontMatch = $scope.company.password !== $scope.company.cpassword;
        $scope.companyregistrationform.password.$error.dontMatch = $scope.company.password !== $scope.company.cpassword;
    };
    // $scope.UserVal= function (){
    //     //alert("keyup working")
    //   //$scope.result=Companyregistration.FnUserNameValid($scope.company.userName);
    // }
      $scope.FnGetCompanyRegisterDetails=function(company,selection){ //function to call the service
       
          if ($scope.companyregistrationform.$valid) {
         
            $scope.companyRegData=company;
            $scope.companyRegData.fksectorId=selection.sectors._id.$oid;
            $scope.companyRegData.fkcountryId=selection.country._id.$oid;
            $scope.companyRegData.fkstateId=selection.state.sId.$oid;
            $scope.companyRegData.fkdistrictId=selection.district.dId.$oid;
            $scope.companyRegData.loggedusercrmid=loggedusercrmid;
            $scope.result = Companyregistration.FnCompanyRegister($scope.companyRegData);

            Notify('Registered Successfuly', 'top-right', '5000', 'success', 'fa-check', true);


            $scope.companyregistrationform.reset();
          
          }
      };

    }]);
})();