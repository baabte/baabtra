angular.module('baabtra').service('paymentRefund',['$http','bbConfig',function paymentRefund($http,bbConfig) {

this.fetchRefundRequest=function(userId){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'fetchRefundRequest/',
      data:{"userId":userId},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 };

 this.updateRefundRequest=function(userId){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'updateRefundRequest/',
      data:{"userId":userId},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 };

 this.processRefund=function(userId){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'processRefund/',
      data:{"userId":userId},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 };
	
}]);