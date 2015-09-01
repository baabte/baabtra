angular.module('baabtra').service('multiRegistrationSrvc',['$http','$upload','bbConfig',function multiRegistrationSrvc($http,$upload,bbConfig) {

	this.FnMultiRegister=function(formData){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'MultiRegister/',
      data:{"formData":formData},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }

 this.FetchCompanies=function(companyId,companyType){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'FetchCompanies/',
      data:{"companyId":companyId,"companyType":companyType},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }

	
}]);