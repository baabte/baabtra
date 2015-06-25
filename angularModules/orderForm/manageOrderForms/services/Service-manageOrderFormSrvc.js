angular.module('baabtra').service('manageOrderFormSrvc',['$http','bbConfig',function manageOrderFormSrvc($http,bbConfig) {



 this.fnfetchOrderForms=function(companyId,firstId,type,lastId,searchKey){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'FetchOrderForms/',
          data:{"companyId":companyId,"firstId":firstId,"type":type,"lastId":lastId,searchKey:searchKey},
          contentType:'application/json; charset=UTF-8',
        });

        return promise;
      };

      this.fnOFDetails=function(OFId){
    var promise = $http({
          method: 'POST',
          url: bbConfig.BWS+'OFDetails/',
          data:{OFId:OFId},
          contentType:'application/json; charset=UTF-8',
        });

        return promise;
      };




}]);