angular.module('baabtra').controller('AddcandidateunderparentCtrl',['$scope','$rootScope','commonService','manageParent','courseAllocateService',function($scope,$rootScope,commonService,manageParent,courseAllocateService){

//for managing logged in user
if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$scope.data={}; /* for managing all the datas generated from this controller
				  otherwise sometimes we cant delete or reset some data from variables, so 
				  we will keep it binded to this object.*/



  var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  // var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
// manageParent.getParent(searchKey,$scope.companyId)

 	$scope.searchParents = function (argument) {
 		var gotParents = manageParent.getParent($scope.data.searchKey,$scope.companyId);
 			gotParents.then(function (response) {
 				var responseData = JSON.parse(response.data);
 				console.log(responseData);
 			});
 	};



	$scope.actions = [
				{
				"text": "<i class=\"fa fa-hand-o-up\"></i>&nbsp;Add a candidate",
				 "click": "fnMarkAttendance()"
				}
				];



	var searchKey='';
    var searchTimeOut;
	$scope.searchUser=function(){
		if(searchTimeOut) {
		clearTimeout(searchTimeOut);
		}
		searchTimeOut=setTimeout(function(){
			var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate(companyId,'', 'initial', '', $scope.data.usersObject.searchKey);
		   fetchUsersToCourseAllocateCallback.then(function(data){
		   	$scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	       });
		},500);
	};

	$scope.nextOne=function(){//event  for showing next 9 items
	  $scope.data.prevButtondisabled = false;
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate(companyId,$scope.data.usersObject.firstId,'next',$scope.data.usersObject.lastId,$scope.data.usersObject.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
       });
};


//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
		$scope.data.prevButtondisabled = true;
	  }
	  else{
	   var fetchUsersToCourseAllocateCallback=courseAllocateService.fnfetchUsersToCourseAllocate(companyId,$scope.data.usersObject.firstId,'prev',$scope.data.usersObject.lastId,$scope.data.usersObject.searchKey);
	   fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.data.firstUser,$scope.data.usersObject.firstId)){ 
				$scope.data.prevButtondisabled=true;
	  		}
	   });
   	  }
};



}]);