angular.module('baabtra').service('manageCompanyRoleService',['$http',function manageCompanyRoleService($http) {

	 this.addUserRole=function ($scope){ // functon that call web service to add a comapny role
	 	var roles={"roleName":$scope.roleName,"RoleDesc":$scope.RoleDesc,"companyId":$scope.companyId,"crmId":$scope.crmId,"urmId":$scope.urmId};
	 	$http({
	 		url: "http://127.0.0.1:8000/"+'ManageCompanyRole/',
	 		data: JSON.stringify({"roles":roles}),
	 		method: "POST",
	 		withCredentials: false,
	 		contentType:"application/json",
	 		dataType:"json",
	 	}).
	 	success(function(data, status, headers, config) {
                   $scope.fnAddNewRollCallBack(data);
               }).
	 	error(function(data, status, headers, config) {
	 		
	 	});  

	 }; 
    this.RetrieveUserRole=function ($scope){ // sending a parameter only for test
         // alert($scope.companyId+2);
         $http({
         	url: "http://127.0.0.1:8000/"+'ViewManageCompanyRole/',
           data: JSON.stringify({"companyId":$scope.companyId}), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
       }).
         success(function(data, status, headers, config) {
         	$scope.fnRertrivecompanyRoleCallBack(data);   
                 // console.log(data);                         
             }).
         error(function(data, status, headers, config) {
         	
         }); 
     };
     this.DeleteCompanyRole=function($scope,RollData)
    {
         // alert("delete service called");
        $http({
           url: "http://127.0.0.1:8000/"+'DeleteCompanyRole/',
           data: JSON.stringify(RollData), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
             success(function(data, status, headers, config) {
                 $scope.fnDeleteRoleCallBack(data);   
                 // alert(data); 
             }).
              error(function(data, status, headers, config) {

             }); 

    }


 }]);
