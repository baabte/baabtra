(function(){   
 // using the function form of use-strict...

'use strict';

/**
 * @ngdoc function
 * @name baabtraApp.controller:RegisteredcompaniesCtrl
 * @description
 * # RegisteredcompaniesCtrl
 * Controller of the baabtraApp
 */
//created by:Arun R Menon
//created on:09-10-14
angular.module('baabtra')
  .controller('RegisteredcompaniesCtrl',['$scope','Registeredcompanies', function ($scope,Registeredcompanies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //alert("controller")
     //value with crmid of current user now hard coded
      var loggedusercrmid=100;
      //alert(loggedusercrmid);
      //to delete a company
    $scope.deleteCompany=function(company){
      //alert("delete function");
      //alert(company._id.$oid);
      company._id=company._id.$oid;
      company.loggedusercrmid=loggedusercrmid;
      //alert(loggedusercrmid);
       Registeredcompanies.FnCompanyDelete(company);
       Notify('Deleted Successfuly', 'top-right', '5000', 'success', 'fa-cross', true);

       Registeredcompanies.FnRegisteredCompanies($scope);
    };
    //to edit a company
     $scope.editCompany=function(company){
      //alert("edit function");
      //alert(company._id.$oid);
      company._id=company._id.$oid;
      company.loggedusercrmid=loggedusercrmid;
      $scope.result=Registeredcompanies.FnCompanyEdit(company);
      Notify('Edited Successfuly', 'top-right', '5000', 'success', 'fa-pencil', true);
      
      Registeredcompanies.FnRegisteredCompanies($scope);

    };
    
     

   // $scope.FnGetRegisteredCompanies=function(){
     
      //service call to view registered companies
        Registeredcompanies.FnRegisteredCompanies($scope);//[{companyName:"google",eMail:"test@baabte.com"},{companyName:"INTEL",eMail:"INTEL@baabte.com"}]
      //Registeredcompanies.FnRegisteredCompanies()
    //alert(companylist);  
    
//}
  }]);

})();
