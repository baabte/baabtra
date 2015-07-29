angular.module('baabtra').service('offlineSyncCourse', ['$http', 'bbConfig',function($http, bbConfig) {

	this.fnGetUserCourseDetails4Sync = function(userLoginIds){
		var promise = $http({
			method: 'POST',
			url: bbConfig.BWS+'getUserCourseDetails4Sync/',
			data:{userLoginIds : userLoginIds, bws:'http://services.baabtra.com/'}
		});
		return promise;
	};	

}]);