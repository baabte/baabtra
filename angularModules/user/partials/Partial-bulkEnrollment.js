angular.module('baabtra').controller('BulkenrollmentCtrl',['$scope','bulkEnrollment','$rootScope',function($scope,bulkEnrollment,$rootScope){


//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
	$scope.userRegister={};
    $scope.userRegister.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.userRegister.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
     //$scope.userRegister.role={};
      //$scope.userRegister.role.roleId=3;
    //console.log($scope.urmId,$scope.companyId);
});

//bulk enrollment

$scope.fnBulkEnroll=function(){
	//console.log($scope.excelDoc);
	bulkEnrollment.fnSaveBulkEnroll($scope);
};

}]);