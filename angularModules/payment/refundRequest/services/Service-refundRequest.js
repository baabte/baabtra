angular.module('baabtra').service('refundRequest',['$http','bbConfig',function refundRequest($http,bbConfig) {

	
	this.userCourseDetailsOF=function(userId){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'userCourseDetailsOF/',
      data:{"userId":userId},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }

 this.requestRefund=function(userId){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'requestRefund/',
      data:{"userId":userId},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }


}]);