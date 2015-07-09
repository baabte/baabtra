angular.module('baabtra').service('parentModule',['$http','bbConfig',function($http,bbConfig) {

 this.getCandidateList = function (fkLoginId) {
    var promise=$http({
           url: bbConfig.BWS+'fnLoadMappedCandidatesForParent/',
           data: {fkLoginId:fkLoginId},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
        return promise;
  };


  // userCourseDetailsOF userId

   this.getCandidateDetails = function (fkLoginId) {
    var promise=$http({
           url: bbConfig.BWS+'userCourseDetailsOF/',
           data: {userId:fkLoginId},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }); 
        return promise;
  };

}]);