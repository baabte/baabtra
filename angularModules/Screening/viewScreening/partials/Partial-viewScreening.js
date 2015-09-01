angular.module('baabtra').controller('ViewscreeningCtrl',['$scope','$rootScope','$state','commonService','viewUsers','addCourseService','courseAllocateService','statusChangeSrvc','branchSrv','multiRegistrationSrvc','$modal','$alert', function($scope,$rootScope,$state,commonService,viewUsers,addCourseService,courseAllocateService,statusChangeSrvc,branchSrv,multiRegistrationSrvc,$modal,$alert){

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId,'')){
	$scope.childCompanyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.childCompanyId.$oid;
}




//====================================
//this is to manage the progress popup
	$scope.loaderProgressTab=0;
	$scope.progressStart=function () {
	$scope.loaderProgressTab=$scope.loaderProgressTab==4?1:$scope.loaderProgressTab*1+1;
	};
	var interval=setInterval(function() {
	$scope.progressStart();
	},700);
//=======================================

var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: false,placement:'center'});

$scope.startLoader =function(){
loader.$promise.then(loader.show);
};

$scope.stopLoader =function(){
loader.hide();
};   


//primary initialization for status 
	$scope.tab='Account';
	$scope.status={};


	$scope.data = {};
	$scope.data.clickOnExport = false;
	$scope.data.searchKey = {};
	$scope.data.searchKey.course = {};
	$scope.data.searchKey.course.minMark = 1;

	$scope.data.searchKey.status = {};
	$scope.data.searchKey.profile = {};
	$scope.data.searchKey.profile.gender = "";
	$scope.value = "State";

	var screeningArray=[{key:'Baabtra',value:'Under Screening'},{key:'Baabtra',value:'Ok To Supply'}]

	if($state.params){
		$scope.screeningObj=screeningArray[$state.params.key];

		if(!angular.equals($scope.screeningObj,undefined)){
			$scope.data.searchKey.status[$scope.screeningObj.key]=$scope.screeningObj.value;
		}
	}
	// console.log($state.params);


	$scope.data.userDropdown = [{"text" : "<i class=\"mdi-action-account-box\"></i>&nbsp;View Profile",
    							"click":"$state.go(\"home.main.userProfile\",{userId:user.fkUserLoginId.$oid})"},
    							{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View BP Summary",
    							"click":"viewProfile(user.fkUserLoginId.$oid, 'summary')"},
    							{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View Detailed BP",
    							"click":"viewProfile(user.fkUserLoginId.$oid, 'detailed')"},
    							{"text" : "<i class=\"fa fa-fw fa-user\"></i>&nbsp;View BP By Course",
    							"click":"viewProfile(user.fkUserLoginId.$oid, 'byCourse')"},
    							{"text" : "<i class=\"mdi-av-repeat\"></i>&nbsp;Change User Status",
    							"click":"changeStatus(user.fkUserLoginId.$oid)"}];
    

// {"text" : "<i class=\"fa fa-fw fa-rotate-left\"></i>&nbsp;Refund Request","click" : "refundRequest(user.fkUserLoginId)"}

	
	var fetchFormFeildsResp = viewUsers.fnFetchFormFeildsForSearch("User test registration", companyId);
	fetchFormFeildsResp.then(function(response){
		$scope.data.Feilds = angular.fromJson(JSON.parse(response.data));
	});

	var courseFetchData={fkcompanyId:companyId,type:'all'};
	var FetchCourseListCallBack = addCourseService.fnFetchCourseList(courseFetchData);

	FetchCourseListCallBack.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
	});

	var branchLoaderObj = {companyId:companyId};
	var branchLoaderResponse = branchSrv.fnLoadAllBranchesUnderCompany(branchLoaderObj);
	branchLoaderResponse.then(function(response){
		 $scope.data.branchList = angular.fromJson(JSON.parse(response.data));
	});

	var searchTimeOut;
	$scope.$watch('data.searchKey', function(){
		if(!angular.equals($scope.data.searchKey.profile,undefined)){
				if(searchTimeOut) {
					clearTimeout(searchTimeOut);
				}
				searchTimeOut=setTimeout(function(){
					$scope.startLoader();
					console.log($scope.data.searchKey);
			    var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersByDynamicSearch(companyId,'','','initial',$scope.data.searchKey); 
			    fetchUsersToCourseAllocateCallback.then(function(data){
			        $scope.data.result = angular.fromJson(JSON.parse(data.data));

			        $scope.data.usersCountFrom = 1;
			        $scope.data.usersCountTo = (($scope.data.result.usersCount <= 12)?$scope.data.result.usersCount:12); 
			        
			        $scope.data.usersObject = $scope.data.result.users;
			        $scope.data.firstUserId = $scope.data.result.firstUserId;
			        $scope.data.lastUserId = $scope.data.result.lastUserId;
			        $scope.data.prevButtondisabled = true;
			        $scope.stopLoader();
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

	$scope.courseSelectionChanged = function(course){
		
		var courseId = course._id.$oid;
		if(!$scope.data.searchKey.coursesSelected){
			$scope.data.searchKey.coursesSelected = [];
		}
		

		if(angular.equals($scope.data.searchKey.coursesSelected.indexOf(courseId), -1)){
			$scope.data.searchKey.coursesSelected.push(courseId);
		}
		else{
			$scope.data.searchKey.coursesSelected.splice($scope.data.searchKey.coursesSelected.indexOf(courseId), 1);
		}

		if($scope.data.searchKey.coursesSelected.length){

			for(var index in $scope.data.courseList){
				if(angular.equals($scope.data.courseList[index]._id.$oid, $scope.data.searchKey.coursesSelected[0])){
					$scope.data.selectedCourse = $scope.data.courseList[index];
					$scope.data.searchKey.course.maxMark = $scope.data.selectedCourse.totalMark;
				}
			}
		}
	};

	$scope.branchSelectionChanged = function(branch){
		var branchId = branch._id.$oid;
		if(!$scope.data.searchKey.branchSelected){
			$scope.data.searchKey.branchSelected = [];
		}

		if(angular.equals($scope.data.searchKey.branchSelected.indexOf(branchId), -1)){
			$scope.data.searchKey.branchSelected.push(branchId);
		}
		else{
			$scope.data.searchKey.branchSelected.splice($scope.data.searchKey.branchSelected.indexOf(branchId), 1);
		}

	};

    var searchTimeout;
	$scope.searchUser=function(){
		if(searchTimeout) {
		clearTimeout(searchTimeout);
		}
		searchTimeout=setTimeout(function(){
			var fetchUsersToCourseAllocateCallback = courseAllocateService.fnfetchUsersToCourseAllocate(companyId,'', 'initial', '', $scope.data.usersObject.searchKey);
		   fetchUsersToCourseAllocateCallback.then(function(data){
		   	$scope.data.usersObject = angular.fromJson(JSON.parse(data.data));
	       });
		},500);
	};






    $scope.viewProfile = function(userId, type){
		$state.go("home.main.baabtraProfile",{type:type, userLoginId:userId});
	};


	// Pre-fetch an external template populated with a custom scope
	var statusChangeModal = $modal({scope:$scope,placement:'top', template: 'angularModules/user/partials/modal-changeStatus.html', show: false});//call aside for add new department
	// Show when some event occurs (use $promise property to ensure the template has been loaded)

	$scope.showStatusChange =function(){
		statusChangeModal.$promise.then(statusChangeModal.show);
		$scope.fnChangeTab('Account');
	};

	$scope.hideStatusChange =function(){
		statusChangeModal.hide();
	};    

	 // FetchCompaniesCallback=multiRegistrationSrvc.FetchCompanies(companyId,"CM");
		// 	FetchCompaniesCallback.then(function(data){
		// 		var result= angular.fromJson(JSON.parse(data.data));
		// 		console.log(result);
		// 	});


	$scope.fnChangeTab = function(tab){
		$scope.tab=tab;
		// $scope.status={};
		var fnFetchCurrentStatusCallback='';
		if(angular.equals(tab,'Account')){
			// console.log(tab,$scope.selectedUserId,companyId);
			 fnFetchCurrentStatusCallback=statusChangeSrvc.fnFetchCurrentStatus(tab,$scope.selectedUserId,companyId);
			fnFetchCurrentStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				$scope.status[tab]=result.status[tab];
				// console.log($scope.status[tab]);

			});

		}else if(angular.equals(tab,'Course')){
			// console.log(tab,$scope.selectedUserId,companyId);

			 fnFetchCurrentStatusCallback=statusChangeSrvc.fnFetchCurrentStatus(tab,$scope.selectedUserId,companyId);
			fnFetchCurrentStatusCallback.then(function(data){
				 $scope.courseStatusList= angular.fromJson(JSON.parse(data.data));
				// console.log($scope.courseStatusList);
			});

		}else if (angular.equals(tab,'Job')){
			// console.log(tab,$scope.selectedUserId,companyId);

			 fnFetchCurrentStatusCallback=statusChangeSrvc.fnFetchCurrentStatus(tab,$scope.selectedUserId,companyId);
			fnFetchCurrentStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				$scope.status[tab]=result.status[tab];
				// console.log(result);
			});

		}else if (angular.equals(tab,'Baabtra')){
			// console.log(tab,$scope.selectedUserId,companyId);

			 fnFetchCurrentStatusCallback=statusChangeSrvc.fnFetchCurrentStatus(tab,$scope.selectedUserId,companyId);
			fnFetchCurrentStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				$scope.status[tab]=result.status[tab];
				// console.log(result);
			});

		}else if (angular.equals(tab,'Company')){
			// console.log(tab,$scope.selectedUserId,companyId);

			 fnFetchCurrentStatusCallback=statusChangeSrvc.fnFetchCurrentStatus(tab,$scope.selectedUserId,companyId);
			fnFetchCurrentStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// $scope.status[tab]=result.status[tab];
				// console.log(result);
			});

		}

	};

	$scope.fnChangeStatus = function(tab,Id){
		$scope.tab=tab;
		var fnSetStatusCallback='';
		if(angular.equals(tab,'Account')){
			// console.log($scope.status,tab,$scope.selectedUserId,companyId);

			fnSetStatusCallback=statusChangeSrvc.fnSetStatus($scope.status,tab,$scope.selectedUserId,companyId,rm_id);
			fnSetStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// console.log(result)
			$scope.notifications('','Status Updated Successfully','success');   

			});

		}else if(angular.equals(tab,'Course')){
			// console.log($scope.status,tab,$scope.selectedUserId,companyId);
			var status=angular.copy($scope.status);
			status.Course=status.Course[Id];
			status.Course._id=Id;

			fnSetStatusCallback=statusChangeSrvc.fnSetStatus(status,tab,$scope.selectedUserId,companyId,rm_id);
			fnSetStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// console.log(result);
			$scope.notifications('','Status Updated Successfully','success');   

			});

		}else if (angular.equals(tab,'Job')){
			// console.log($scope.status,tab,$scope.selectedUserId,companyId);

			fnSetStatusCallback=statusChangeSrvc.fnSetStatus($scope.status,tab,$scope.selectedUserId,companyId,rm_id);
			fnSetStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// console.log(result);
			$scope.notifications('','Status Updated Successfully','success');   

			});

		}else if (angular.equals(tab,'Baabtra')){
			// console.log($scope.status,tab,$scope.selectedUserId,companyId);

			fnSetStatusCallback=statusChangeSrvc.fnSetStatus($scope.status,tab,$scope.selectedUserId,companyId,rm_id);
			fnSetStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// console.log(result);
			$scope.notifications('','Status Updated Successfully','success');   

			});

		}else if (angular.equals(tab,'Company')){
			// console.log($scope.status,tab,$scope.selectedUserId,companyId);

			fnSetStatusCallback=statusChangeSrvc.fnSetStatus($scope.status,tab,$scope.selectedUserId,companyId,rm_id);
			fnSetStatusCallback.then(function(data){
				var result= angular.fromJson(JSON.parse(data.data));
				// console.log(result);
			$scope.notifications('','Status Updated Successfully','success');   
				
			});

		}

		 Id ='';

	};


	$scope.changeStatus = function(userId){
			$scope.selectedUserId=userId;
		 	$scope.showStatusChange();

	};

	$scope.exportToSpreadsheet = function(){
		
		var fetchUsersToCourseAllocateCallback = viewUsers.fnFetchUsersReportBasedOnDynamicSearch(companyId,'','','initial',$scope.data.searchKey); 
		fetchUsersToCourseAllocateCallback.then(function(response){
			var result= angular.fromJson(JSON.parse(response.data));
			
		});

	};

	//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:2, type: type});// calling notification message function
    };


}]);