angular.module('baabtra').service('collegeServices',['$http','$upload','bbConfig',function collegeServices($http,$upload,bbConfig) {

	
this.FnRegisterCollege=function(college){
  var promise = $http({
    method: 'POST',
      url: bbConfig.BWS+'RegisterCollege/',
      data:{"college":college},
      method: 'POST',
      withCredentials: false,
      contentType:'application/json',
      dataType:'json'
   });
  return promise;
 }


}]);