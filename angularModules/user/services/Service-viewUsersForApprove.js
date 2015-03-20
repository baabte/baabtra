angular.module('baabtra').service('viewUsersForApprove',['$http','bbConfig',function ($http, bbConfig) {


this.fnLoadMenteesForApprove=function(companyId)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadMenteesForApprove/',
          data:{companyId:companyId},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

}]);