angular.module('baabtra').service('addCourseService',['$http',function addCourseService($http) {

	
	this.loadTechnologies=function ($scope){ // functon that call web service to add a comapny role
	 	alert("hlo");
	 	// $http({
	 	// 	url: bbConfig.BWS+'ManageCompanyRole/',
	 	// 	// data: JSON.stringify({"roles":roles}),
	 	// 	method: "POST",
	 	// 	withCredentials: false,
	 	// 	contentType:"application/json",
	 	// 	dataType:"json",
	 	// }).
	 	// success(function(data, status, headers, config) {
   //                 $scope.fnAddNewRollCallBack(data);
   //             }).
	 	// error(function(data, status, headers, config) {
	 		
	 	// });  

	 }; 
}]);