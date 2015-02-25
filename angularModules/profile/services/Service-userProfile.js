angular.module('baabtra').service('userProfile',['$http','bbConfig',function userProfile($http,bbConfig) {

this.loadProfileData=function(profileId){
var profile=$http({
		url: bbConfig.BWS+'loadProfileData/',
		method: "POST",
		data:angular.toJson({'profileId':profileId}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return profile;
};
	
}]);