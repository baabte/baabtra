angular.module('baabtra').service('formLoader', ['$http','$upload','bbConfig',function ($http, $upload, bbConfig) {

	this.LoadCustomFormforRegistration=function(formId){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'LoadCustomFormforRegistration/',
			data:{formId:formId},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

}]);