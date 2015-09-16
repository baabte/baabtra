angular.module('baabtra').service('viewCourse',['$http','bbConfig',function viewCourse($http,bbConfig) {

this.loadCourseData=function($scope){
	var result;
	var promise = 
	$http({
		 	method:'POST',
		 	url:bbConfig.BWS+'loadCourseData/',
		 	data:JSON.stringify({"courseid":$scope.courseid,"userLoginId":$scope.userLoginId,"roleid":$scope.roleid}),
		}).success(function(data, status, headers, config){
			return data;
		}).error(function(data, status, headers, config){
			result='error';
		});
		return promise;
	};

	this.saveCourse = function(course){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'saveCourse/',
			data:course,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.loadClassRoomDetails = function(course){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'loadClassRoomDetails/',
			data:course,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.saveSubject = function(subject){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'saveSubject/',
			data:subject,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

	this.loadSubject = function(subjectCondition){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS + 'loadSubject/',
			data:subjectCondition,
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};


}]);