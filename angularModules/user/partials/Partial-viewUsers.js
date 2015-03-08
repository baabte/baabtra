angular.module('baabtra').controller('ViewusersCtrl',['$scope','viewUsers','$rootScope','$state',function($scope,viewUsers,$rootScope,$state){

//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    viewUsers.fnLoadCompnayUsers($scope); 
});

$scope.userState = function(userId){
	$scope.userActive=userId;
	
};

$scope.fnLoadCompnayUsersCallback=function(result){
	$scope.userList=result;

};

$scope.viewCourseDetails = function(courseId){
	$state.go("home.main.course",{courseId:courseId});
}

}]);