angular.module('baabtra').service('themeConfigurationSrv',['bbConfig','$http',function themeConfigurationSrv(bbConfig,$http) {


this.setMenuType=function(data){
var setMenuType=$http({
		url: bbConfig.BWS+'setMenuType/',
		method: "POST",
		data:angular.toJson({'data':data}),
		withCredentials: false,
		contentType:"application/json",
		dataType:"json",
	}).
	success(function(data, status, headers, config) {
		return data;
		
	}).
	error(function(data, status, headers, config) {

	});
	return setMenuType;
};

}]);