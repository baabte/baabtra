angular.module('baabtra').service('branchSrv',['$http','bbConfig',function branchSrv($http,bbConfig) {

	this.fnInsertBranch=function($scope,cmp_id,branches,rm_id){
		 angular.forEach($scope.branches,function(branch)
  {
    if (!angular.equals(branch.childrenObj,undefined)) {
      delete branch.childrenObj;
    }
  });
        $http({
          method: 'post',
          url: bbConfig.BWS+'InsertBranch/',
          data:{"cmp_id":cmp_id,"branches":branches,"rm_id":rm_id},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
        	var result=angular.fromJson(JSON.parse(data));
        	//$scope.branches=null;
              $scope.branchTree=[];
              $scope.branches=[];
        	   $scope.branches=result[0].branches;
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

      this.fnLoadBranch=function($scope,cmp_id){
        $http({
          method: 'post',
          url: bbConfig.BWS+'LoadBranches/',
          data:{"cmp_id":cmp_id},
          contentType:'application/json; charset=UTF-8',
        }).
        success(function(data, status, headers, config) {//success respond from server
        	var result=angular.fromJson(JSON.parse(data));
        	if (!angular.equals(result,"")) {
            $scope.branchTree=[];
            $scope.branches=[];

        		$scope.branches=result[0].branches;
        	}
        	else{
        		$scope.branches=[{ '_id': "Baabtra.com", 'parent': null , 'children': null }];
        	}
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };
}]);




