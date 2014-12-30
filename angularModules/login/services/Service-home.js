/*
Created By:Jihin
Created On:12/11/2014
*/

angular.module('baabtra').service('home',['$http','$state','$rootScope','bbConfig',function home($http,$state,$rootScope,bbConfig) {
this.FnLoadMenus=function($scope){//for load menu for logged user
      $http({ 
            method: 'post',
            url: bbConfig.BWS+'LoadMenus/',
            data:{'rm_id':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                var result=angular.fromJson(JSON.parse(data));
                console.log(result);
                $scope.userMenus=$scope.userMenusOrigin=result[0].menuStructure[0].regionMenuStructure;
              }).
              error(function(data, status, headers, config) {
             });
    };
}]);