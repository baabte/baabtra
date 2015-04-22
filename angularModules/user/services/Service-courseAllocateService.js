angular.module('baabtra').service('courseAllocateService',['$http','bbConfig',function($http,bbConfig) {


	 this.fnfetchUsersToCourseAllocate=function($scope,firstId,type,lastId){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'FetchUsersToCourseAllocate/',
          data:{"companyId":$scope.companyId,"firstId":firstId,"type":type,"lastId":lastId},
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };

}]);