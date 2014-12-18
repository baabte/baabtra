angular.module('baabtra').service('home',['$http','$state','$rootScope','bbConfig',function home($http,$state,$rootScope,bbConfig) {
this.FnLoadMenus=function($scope)
    {
      $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
            method: 'post',
            url: bbConfig.BWS+'LoadMenus/',
            data:{'rm_id':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                var result=angular.fromJson(JSON.parse(data));
                $scope.userMenus=$rootScope.userMenusOrigin=result[0].menuStructure[0].regionMenuStructure;
                $scope.menuLength=$scope.userMenus.length;
                //$scope.getMenuByLink($rootScope.userMenusOrigin,null,null,$state.current.url.split("/")[1]);
                //alert($scope.menuLength);
                $scope.classn=["btn-info",'btn-success','btn-warning','btn-danger','btn-inverse'];
                //$scope.breadCrumb(result[0].menuStructure[0].regionMenuStructure);
                //$scope.companyDetails=result.data;      //filer the user list from respond data
              }).
              error(function(data, status, headers, config) {
             });
    };

}]);