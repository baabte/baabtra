angular.module('baabtra').service('home',['$http',function home($http) {
this.FnGetCompanyDetails=function($scope)
    {
      $http({ //headers: {'Content-Type': 'application/json; charset=utf-8'},
            method: 'post',
            url: 'http://127.0.0.1:8000/LoadMenus/',
            data:{'rm_id':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                var result=angular.fromJson(JSON.parse(data));
                $scope.userMenus=$scope.userMenusOrigin=result[0].menuStructure[0].regionMenuStructure;
                console.log($scope.userMenus);
                $scope.menuLength=$scope.userMenus.length;
                //alert($scope.menuLength);
                $scope.classn=["btn-info",'btn-success','btn-warning','btn-danger','btn-inverse'];
                //$scope.companyDetails=result.data;      //filer the user list from respond data
              }).
              error(function(data, status, headers, config) {
             });
    };

}]);