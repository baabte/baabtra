angular.module('baabtra').service('academicYear', ['$http', 'bbConfig', function($http, bbConfig) {

	this.saveAcademicYear = function(academicYearDetails){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'saveAcademicYear/',
			data:academicYearDetails,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.loadAcademicYear = function(academicYearDetails){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'loadAcademicYear/',
			data:academicYearDetails,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

}]);