angular.module('baabtra').service('viewUsersForApprove',['$http','bbConfig',function ($http, bbConfig) {


this.fnLoadMenteesForApprove=function(companyId, statusType)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'fnLoadMenteesForApprove/',
          data:{companyId:companyId, statusType:statusType},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

this.fnApproveUserRequest = function(userId, orderFormId, courseKey, statusType, rmId, companyId)//To Load Mentees For Approve
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'ApproveUserRequest/',
          data:{userId:userId, orderFormId:orderFormId, courseKey:courseKey, statusType:statusType, rmId:rmId, companyId:companyId},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };


}]);