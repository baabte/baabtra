angular.module('baabtra').service('questionBankService',['$http','bbConfig',function questionBankService($http,bbConfig){

	 this.fnFetchAllQuestionBundles=function(courseAllocate){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'AllocateUsersToCourse/',
          data:angular.toJson(courseAllocate),
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };

       this.fnAddQuestionBundles=function(courseAllocate){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'AllocateUsersToCourse/',
          data:angular.toJson(courseAllocate),
          contentType:'application/json; charset=UTF-8',
        })

        return promise;
      };

	
}]);