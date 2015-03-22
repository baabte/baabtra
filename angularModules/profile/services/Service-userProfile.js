angular.module('baabtra').service('userProfile',['$http','bbConfig',function userProfile($http,bbConfig) {

this.loadProfileData=function(userloginId){
var profile=$http({
		url: bbConfig.BWS+'loadProfileData/',
		method: "POST",
		data:angular.toJson({'userloginId':userloginId}),
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

this.updateUserProfileData=function(userDetailsObjId,profile){
	// console.log({"userDetailsObjId":userDetailsObjId,"field":field,"newData":newData});
	var profileDataUpdation=$http({
		url: bbConfig.BWS+'updateUserProfileData/',
		method: "POST",
		data:angular.toJson({'userProfileDataForUpdate':{"userDetailsObjId":userDetailsObjId,"profile":profile}}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return profileDataUpdation;
};

this.changeUserPassword=function(userLoginId,currentPassword,newPassword){
	// console.log({"userLoginId":userLoginId,"currentPassword":currentPassword,"newPassword":newPassword});
	var changePassword=$http({
		url: bbConfig.BWS+'changeUserPassword/',
		method: "POST",
		data:angular.toJson({'changePwdObj':{"userLoginId":userLoginId,"currentPassword":currentPassword,"newPassword":newPassword}}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return changePassword;

};
	
}]);