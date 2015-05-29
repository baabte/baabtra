angular.module('baabtra').service('formLoader', ['$http','$upload','bbConfig',function ($http, $upload, bbConfig) {

	this.LoadCustomFormforRegistration=function(companyId, formId){
		var promise = $http({
			method: 'post',
			url: bbConfig.BWS+'LoadCustomFormforRegistration/',
			data:{companyId:companyId, formId:formId},
			contentType:'application/json; charset=UTF-8',
		});
		return promise;
	};

}]);