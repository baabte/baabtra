angular.module('baabtra').controller('ViewusersCtrl',['$scope','viewUsers','$rootScope','$state',function($scope,viewUsers,$rootScope,$state){

//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    viewUsers.fnLoadCompnayUsers($scope,'','initial',''); 
});

$scope.userState = function(userId){
	$scope.userActive=userId;
	
};

$scope.fnLoadCompnayUsersCallback=function(userObj){
	$scope.userObj=userObj;
	console.log($scope.userObj);
};

$scope.viewCourseDetails = function(courseId){
	$state.go("home.main.course",{courseId:courseId});
};

$scope.viewProfile = function(userId){
	$state.go("home.main.userProfile",{userId:userId});
};

$scope.prevButtondisabled=true;

$scope.nextOne=function(){//event  for showing next 12 items
	  $scope.prevButtondisabled=false;
	   viewUsers.fnLoadCompnayUsers($scope,$scope.userObj.firstId.$oid,'next',$scope.userObj.lastId.$oid);
};

$scope.prevOne=function(){//event  for showing previous 9 items
   
   viewUsers.fnLoadCompnayUsers($scope,$scope.userObj.firstId.$oid,'prev',$scope.userObj.lastId.$oid);
  
};

}]);