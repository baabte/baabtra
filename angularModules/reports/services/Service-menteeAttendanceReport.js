angular.module('baabtra').service('menteeAttendanceReport',['$http','bbConfig',function($http,bbConfig) {

	this.fnLoadMenteesAttReport=function($scope,userId){
	 	var promise = $http({
		 	method: 'POST',
		    url: bbConfig.BWS+'fnLoadMenteesAttReport/',
		    data:{"courseId":$scope.selectedCourse,"userId":userId}
		 });
		return promise;
	 }	
}]);