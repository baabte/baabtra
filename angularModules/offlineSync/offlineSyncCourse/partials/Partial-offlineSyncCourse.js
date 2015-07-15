angular.module('baabtra').controller('OfflinesynccourseCtrl', ['$scope', '$rootScope', '$state', 'commonService', 'viewUsers', 'addCourseService' , function ($scope, $rootScope, $state, commonService, viewUsers, addCourseService){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.offlineSyncCourseData = {};
	$scope.offlineSyncCourseData.searchKey = {};
	$scope.offlineSyncCourseData.searchKey.profile = {}
	$scope.offlineSyncCourseData.searchKey.profile.gender = "";

	var fetchFormFeildsResp = viewUsers.fnFetchFormFeildsForSearch("User test registration", companyId);
	fetchFormFeildsResp.then(function(response){
		$scope.offlineSyncCourseData.Feilds = angular.fromJson(JSON.parse(response.data));
	})

	var courseFetchData={fkcompanyId:companyId,type:'all'};

	var FetchCourseListCallBack = addCourseService.fnFetchCourseList(courseFetchData);

	FetchCourseListCallBack.then(function(response){
		$scope.offlineSyncCourseData.courseList = angular.fromJson(JSON.parse(response.data));
	})

	$scope.courseSelectionChanged = function(courseId){
		if(!$scope.offlineSyncCourseData.searchKey.coursesSelected){
			$scope.offlineSyncCourseData.searchKey.coursesSelected = [];
		}
		

		if(angular.equals($scope.offlineSyncCourseData.searchKey.coursesSelected.indexOf(courseId), -1)){
			$scope.offlineSyncCourseData.searchKey.coursesSelected.push(courseId);
		}
		else{
			$scope.offlineSyncCourseData.searchKey.coursesSelected.splice($scope.offlineSyncCourseData.searchKey.coursesSelected.indexOf(courseId), 1);
		}
	};

	$scope.nextOne=function(){//event  for showing next 12 items
	   
	   var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.offlineSyncCourseData.firstUserId,$scope.offlineSyncCourseData.lastUserId,'next',$scope.offlineSyncCourseData.searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.offlineSyncCourseData.result = angular.fromJson(JSON.parse(data.data));
	        if(!angular.equals($scope.offlineSyncCourseData.firstUserId, $scope.offlineSyncCourseData.result.firstUserId)){
		        $scope.offlineSyncCourseData.usersObject = $scope.offlineSyncCourseData.result.users;
		        $scope.offlineSyncCourseData.firstUserId = $scope.offlineSyncCourseData.result.firstUserId;
		        $scope.offlineSyncCourseData.lastUserId = $scope.offlineSyncCourseData.result.lastUserId;
		        $scope.offlineSyncCourseData.prevButtondisabled = false;
		    }
		    else{
		    	$scope.offlineSyncCourseData.nextButtondisabled = true;
		    }
    	});
	};

	//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	 var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.offlineSyncCourseData.firstUserId,$scope.offlineSyncCourseData.lastUserId,'prev',$scope.offlineSyncCourseData.searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.offlineSyncCourseData.result = angular.fromJson(JSON.parse(data.data));
	        if(!angular.equals($scope.offlineSyncCourseData.firstUserId, $scope.offlineSyncCourseData.result.firstUserId)){
		        
		        $scope.offlineSyncCourseData.usersObject = $scope.offlineSyncCourseData.result.users.reverse();;
		        $scope.offlineSyncCourseData.firstUserId = $scope.offlineSyncCourseData.result.lastUserId;
		        $scope.offlineSyncCourseData.lastUserId = $scope.offlineSyncCourseData.result.firstUserId;
		       
	    	}
	    	else{
	    		$scope.offlineSyncCourseData.prevButtondisabled = true;
	    	}
    	});
    };

    var searchTimeOut;
	$scope.$watch('offlineSyncCourseData.searchKey', function(){
		if(!angular.equals($scope.offlineSyncCourseData.searchKey,undefined)){
				if(searchTimeOut) {
					clearTimeout(searchTimeOut);
				}
				searchTimeOut=setTimeout(function(){
			    var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,'','','initial',$scope.offlineSyncCourseData.searchKey); 
			    fetchUsersToCourseAllocateCallback.then(function(data){
				    $scope.offlineSyncCourseData.result = angular.fromJson(JSON.parse(data.data));
				    $scope.offlineSyncCourseData.usersObject = $scope.offlineSyncCourseData.result.users;
			        $scope.offlineSyncCourseData.firstUserId = $scope.offlineSyncCourseData.result.firstUserId;
			        $scope.offlineSyncCourseData.lastUserId = $scope.offlineSyncCourseData.result.lastUserId;
			    });
			    },500);
			}
		}, true)

}]);