angular.module('baabtra').controller('ViewusersCtrl',['$scope','viewUsers','$rootScope','$state',function($scope,viewUsers,$rootScope,$state){

//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    var LoadCompnayUsersCallback=viewUsers.fnLoadCompnayUsers($scope,'','initial',''); 
    LoadCompnayUsersCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        $scope.firstUser=$scope.userObj.firstId.$oid;
    });
});

$scope.userState = function(userId){
	$scope.userActive=userId;
	
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
	   var LoadCompnayUsersCallback=viewUsers.fnLoadCompnayUsers($scope,$scope.userObj.firstId.$oid,'next',$scope.userObj.lastId.$oid);
	   LoadCompnayUsersCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
       });
};

$scope.prevOne=function(){//event  for showing previous 9 items
	  if (angular.equals($scope.firstUser,$scope.userObj.firstId.$oid)){ 
		$scope.prevButtondisabled=true;
	  }
	  else{
	   var LoadCompnayUsersCallback=viewUsers.fnLoadCompnayUsers($scope,$scope.userObj.firstId.$oid,'prev',$scope.userObj.lastId.$oid);
	   LoadCompnayUsersCallback.then(function(data){
	        $scope.userObj=angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.firstUser,$scope.userObj.firstId.$oid)){ 
				$scope.prevButtondisabled=true;
	  		}
	   });
   	  }
  
};

}]);