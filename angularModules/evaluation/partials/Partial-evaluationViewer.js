angular.module('baabtra').controller('EvaluationviewerCtrl',['$scope','$rootScope','$state','commonService','evaluationService','addCourseService','branchSrv', function($scope,$rootScope,$state,commonService,evaluationService,addCourseService,branchSrv){

	if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}

$scope.data = {};
$scope.data.searchKey = {};
$scope.data.searchKey.course = {};
$scope.selectedElement={}; //obj to store the selected element


$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
		$scope.childCompanyId='';
		if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId,'')){
			$scope.childCompanyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId.$oid;
		}

		if(angular.equals($scope.childCompanyId,'')){
		var evaluationFetchObj={companyId:$scope.companyId,firstId:'',lastId:'',status:'Pending Evaluation'};
		}else{
		var evaluationFetchObj={companyId:$scope.companyId,childCompanyId:$scope.childCompanyId,firstId:'',lastId:'',status:'Pending Evaluation'};	
		}


		var evaluationFetchResponse=evaluationService.evaluationFetch(evaluationFetchObj);
		evaluationFetchResponse.then(function(data){
		var result=angular.fromJson(JSON.parse(data.data));
		
		$scope.data.EvaluationList=result.EvaluationList;
		$scope.data.firstId=result.firstId;
		$scope.data.lastId=result.lastId;

		console.log($scope.EvaluationList);

		});


	var searchTimeOut;
	$scope.$watch('data.searchKey', function(){
		if(!angular.equals($scope.data.searchKey.profile,undefined)){
				if(searchTimeOut) {
					clearTimeout(searchTimeOut);
				}
				searchTimeOut=setTimeout(function(){
			    var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,'','','initial',$scope.data.searchKey); 
			    fetchUsersToCourseAllocateCallback.then(function(data){
			        $scope.data.result = angular.fromJson(JSON.parse(data.data));

			        $scope.data.usersCountFrom = 1;
			        $scope.data.usersCountTo = (($scope.data.result.usersCount <= 12)?$scope.data.result.usersCount:12); 
			        
			        $scope.data.usersObject = $scope.data.result.users;
			        $scope.data.firstUserId = $scope.data.result.firstUserId;
			        $scope.data.lastUserId = $scope.data.result.lastUserId;
			        $scope.data.prevButtondisabled = true;
			    });
			    },500);
			}
		}, true);

	$scope.nextOne=function(){//event  for showing next 12 items
	  
	   var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'next',$scope.data.searchKey); 
    	fetchUsersToCourseAllocateCallback.then(function(data){
	        $scope.data.result = angular.fromJson(JSON.parse(data.data));

	        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
		        $scope.data.usersCountFrom = $scope.data.usersCountFrom + 12;
			    $scope.data.usersCountTo = (($scope.data.result.usersCount-$scope.data.usersCountFrom) > 12) ? ($scope.data.usersCountTo + 12):$scope.data.result.usersCount;

		        $scope.data.usersObject = $scope.data.result.users;
		        $scope.data.firstUserId = $scope.data.result.firstUserId;
		        $scope.data.lastUserId = $scope.data.result.lastUserId;
		        $scope.data.prevButtondisabled = false;
		    }
		    else{
		    	$scope.data.nextButtondisabled = true;
		    }
    	});
	};

	//event  for showing previous 9 items
	$scope.prevOne=function(){
		var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,$scope.data.firstUserId,$scope.data.lastUserId,'prev',$scope.data.searchKey); 
	    	fetchUsersToCourseAllocateCallback.then(function(data){
		        $scope.data.result = angular.fromJson(JSON.parse(data.data));
		        if(!angular.equals($scope.data.firstUserId, $scope.data.result.firstUserId)){
			        
			        $scope.data.usersCountFrom = $scope.data.usersCountFrom - 12;
			    	$scope.data.usersCountTo = $scope.data.usersCountFrom + 11;

			        $scope.data.usersObject = $scope.data.result.users.reverse();
			        $scope.data.firstUserId = $scope.data.result.lastUserId;
			        $scope.data.lastUserId = $scope.data.result.firstUserId;
			       
		    	}
		    	else{
		    		$scope.data.prevButtondisabled = true;
		    	}
	    	});
	};


$scope.$watch('selectedElement',function(){
	if($scope.selectedElement.elementAddress){
		var evaluationElementFetchObj={elementAddress:selectedElement.elementAddress};
		var evaluationElementFetchResponse=evaluationService.evaluationElementFetch(evaluationFetchObj);
		evaluationElementFetchResponse.then(function(data){
		var result=angular.fromJson(JSON.parse(data.data));
		
		$scope.EvaluationList=result.EvaluationList;
		$scope.firstId=result.firstId;
		$scope.lastId=result.lastId;

		console.log($scope.EvaluationList);

		});

	};

},true);


var courseFetchData={fkcompanyId:$scope.companyId,type:'all'};
	var FetchCourseListCallBack = addCourseService.fnFetchCourseList(courseFetchData);

	FetchCourseListCallBack.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
	});

	var branchLoaderObj = {companyId:$scope.companyId};
	var branchLoaderResponse = branchSrv.fnLoadAllBranchesUnderCompany(branchLoaderObj);
	branchLoaderResponse.then(function(response){
		 $scope.data.branchList = angular.fromJson(JSON.parse(response.data));
		 console.log($scope.data.branchList);
	})

$scope.selectElement=function(element,index){

$scope.selectedElement=element;

};



//this function is used to format the date from milliseconds
	$scope.convertDate=function (millisec) {
				var date=new Date(millisec);
				return {day:date.toDateString(),time:date.toTimeString()};
	}; 






}]);