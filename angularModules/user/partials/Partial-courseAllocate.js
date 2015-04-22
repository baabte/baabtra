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

$scope.prevButtondisabled=true;

$scope.nextOne=function(){//event  for showing next 12 items
	  $scope.prevButtondisabled=false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope,$scope.userObj.firstId.$oid,'next',$scope.userObj.lastId.$oid);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.userObj=angular.fromJson(JSON.parse(data.data));
       });
};

$scope.prevOne=function(){//event  for showing previous 9 items
	  if (angular.equals($scope.firstUser,$scope.userObj.firstId.$oid)){ 
		$scope.prevButtondisabled=true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate($scope,$scope.userObj.firstId.$oid,'prev',$scope.userObj.lastId.$oid);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.userObj=angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.firstUser,$scope.userObj.firstId.$oid)){ 
				$scope.prevButtondisabled=true;
	  		}
	   });
   	  }
  
};



}]);