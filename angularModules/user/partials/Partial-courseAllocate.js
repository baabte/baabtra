angular.module('baabtra').controller('CourseallocateCtrl',['$scope','bbConfig','$rootScope','$state','commonService','courseAllocateService','$alert',function($scope,bbConfig,$rootScope,$state,commonService,courseAllocateService,$alert){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$rootScope.$watch('userinfo',function(){
    $scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

    var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope,'','initial',''); 
    fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        console.log($scope.userObj);
        $scope.firstUser=$scope.userObj.firstId.$oid;
    });
});


$scope.courseAllocate={};

$scope.courseAllocate.selectedCourse={};
$scope.courseAllocate.selectedUsers={};

$scope.prevButtondisabled=true;

$scope.nextOne=function(){//event  for showing next 12 items
	  $scope.prevButtondisabled=false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope,$scope.userObj.firstId,'next',$scope.userObj.lastId);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        console.log($scope.userObj)
       });
};

//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.firstUser,$scope.userObj.firstId)){ 
		$scope.prevButtondisabled=true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope,$scope.userObj.firstId,'prev',$scope.userObj.lastId);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.userObj=angular.fromJson(JSON.parse(data.data));
        	console.log($scope.userObj)
	         if (angular.equals($scope.firstUser,$scope.userObj.firstId)){ 
				$scope.prevButtondisabled=true;
	  		}
	   });
   	  }
};

$scope.fnUserSelection=function(userobj,index){
	user=angular.copy(userobj);
	if(angular.equals($scope.courseAllocate.selectedUsers[user.userRoleMappingId],undefined)){
	$scope.courseAllocate.selectedUsers[user.userRoleMappingId]=user;
	 $scope.userObj.userList.splice(index,1);
	console.log($scope.courseAllocate.selectedUsers);
	}
	else{
	 $scope.userObj.userList.splice(index,1,user);
	 delete $scope.courseAllocate.selectedUsers[user.userRoleMappingId];
	console.log($scope.courseAllocate.selectedUsers);
	}

};



}]);