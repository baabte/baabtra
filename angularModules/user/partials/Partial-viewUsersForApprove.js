angular.module('baabtra').controller('ViewusersforapproveCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewUsersForApprove', '$modal', 'nomination', 'userRegistrationService',function ($scope, $rootScope, $state, $alert, commonService, viewUsersForApprove, $modal, nomination, userRegistrationService){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	//creating a mock of the global configuration of the company for the approval flow and access privileges for roles

	$scope.approvalFlow = [{displayName:"Verify Applicants", loadStatus:["Pending Approval"], nextStatus:"Verified", privilegedRoles:[], paymentStage:false },
	{displayName:"Collect Payment", loadStatus:["Verified", "Partially Paid"], nextStatus:"Paid", privilegedRoles:[], paymentStage:true },
	{displayName:"Approve Order Form", loadStatus:["Paid"], nextStatus:"Approved", privilegedRoles:[], paymentStage:false}
	];

	

	//.End == creating a mock of the global configuration of the company for the approval flow and access privileges for roles



	$scope.coursePreviewObject={};
	$scope.rmId = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.cmpId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/
	$scope.data = {};
	$scope.data.checkAll = {};
	$scope.data.approvedMenteesList = {};
	$scope.data.courseObject = {};
	$scope.data.statusTypes = [{"value":"requested","label":"Requested"},
							   {"value":"approved","label":"Approved"},
							   {"value":"rejected","label":"Rejected"}];
	$scope.data.selectedStatusTypes = "requested";
	$scope.data.approveOrderFormStatus = false;
	$scope.viewOrderForm = function(orderForm){
		$scope.data.orderForm = orderForm;
		$modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-orderForm.html', show: true});
	};

	if(!angular.equals($state.params,"")){
		var orderFormResponse = nomination.fnLoadOrderFormById($state.params.ofId);
			orderFormResponse.then(function(response){
			var orderForm = angular.fromJson(JSON.parse(response.data));
			orderForm._id = orderForm._id.$oid;
			$scope.data.approveOrderForm = orderForm;
		});
	}

	$scope.approveOrderForm = function(orderForm){
		$scope.data.approveOrderForm = orderForm;
		$scope.data.approveOrderFormStatus = true;
		$state.go('home.main.viewOrderForm.approveOrderFrom',{ofId:orderForm.orderFormId});
	};

	$scope.data.orderFormOptions = [{text: "Verify Applicants", click: "this.approveOrderForm(orderForm)"},
									{text: "Collect Payment", click: "this.approveOrderForm(orderForm)"},
									{text: "Approve Order Form", click: "this.approveOrderForm(orderForm)"},
  									{text: "View Order Form", click: "this.viewOrderForm(orderForm)"}];

	var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId, $scope.data.selectedStatusTypes);
	LoadMenteesResponse.then(function(response){
		$scope.data.companOrderForms = angular.fromJson(JSON.parse(response.data));
		console.log($scope.data.companOrderForms);
		//$scope.data.menteesListLength = Object.keys($scope.data.menteesList).length;
	});

	
	$scope.checkAllMentees = function(value, key) {
		if(angular.equals(value[key],undefined)){
			value[key] = true;
		}
		if(value[key]){
			$scope.data.approvedMenteesList[key] = [];
	    	angular.forEach($scope.data.approveOrderForm.orderDetails,function(users){
	    		angular.forEach(users.userInfo, function(user){
	    			$scope.data.approvedMenteesList[key].push(user.userId);
	    		});
	    		
	    	});
	    }
	    else{
	    	console.log(value[key]);
	    	$scope.data.approvedMenteesList[key] = [];
	    }
  	};

 //  	$scope.statusTypesChanged = function(){
  		
 //  		$scope.data.menteesList = [];
 //  		$scope.data.approvedMenteesList = [];

 //  		var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId, $scope.data.selectedStatusTypes);
	// 	LoadMenteesResponse.then(function(response){
	// 		$scope.data.menteesList = angular.fromJson(JSON.parse(response.data));
	// 		$scope.data.menteesListLength = Object.keys($scope.data.menteesList).length;
	// });
 //  	};

	$scope.approveUsers = function(statusType, key, coursetype){
		if(angular.equals(statusType,"approved")){
		$scope.data.courseObject.course = {};
		$scope.data.courseObject.course._id = key;
		$scope.data.courseObject.coursetype = coursetype;
		$scope.data.courseObject.doj = new Date();
		console.log(JSON.stringify($scope.data.courseObject));
		
		$scope.addUserToBatch = function($hide){
			var allUsers = [];
			var userRegister = {};
			userRegister.mandatoryData = {};

			
			delete $scope.data.batchDetails[0].course;
 			userRegister.batchId = $scope.data.batchDetails[0]._id;
 			delete $scope.data.batchDetails[0]._id;
			delete $scope.data.batchDetails[0].companyId;
 			delete $scope.data.batchDetails[0].updatedDate;
 			delete $scope.data.batchDetails[0].createddDate;
 			delete $scope.data.batchDetails[0].crmId;
 			delete $scope.data.batchDetails[0].urmId;
 			$scope.data.batchDetails[0].startDate=new Date($scope.data.batchDetails[0].startDate).toISOString();
 			$scope.data.batchDetails[0].endDate=new Date($scope.data.batchDetails[0].endDate).toISOString();
 			$scope.data.batchDetails[0].enrollmentAfter=new Date($scope.data.batchDetails[0].enrollmentAfter.$date).toISOString();
 			 $scope.data.batchDetails[0].enrollmentBefore=new Date($scope.data.batchDetails[0].enrollmentBefore.$date).toISOString();
 			userRegister.batch= $scope.data.batchDetails[0];

         		var time=(new Date()).valueOf();
         		hashids = new Hashids("this is a batch id");
        		userRegister.batch.batchCode = hashids.encode(time);

 			userRegister.loggedusercrmid = $scope.rmId;

			var usersUnderCourse = $scope.data.approveOrderForm.orderDetails[key].userInfo;
			angular.forEach(usersUnderCourse,function(user){
				
				if(!angular.equals($scope.data.approvedMenteesList[key].indexOf(user.userId),-1)){
					console.log($scope.data.approveOrderForm.orderDetails[key].Name);
					var time=(new Date()).valueOf();
					hashids = new Hashids("password for"+ user.eMail);
					userRegister.mandatoryData.eMail = user.eMail;
					userRegister.mandatoryData.password = hashids.encode(time);
					userRegister.mandatoryData.dob = user.dob;
					userRegister.mandatoryData.firstName = user.firstName;
					userRegister.mandatoryData.lastName = user.lastName;
					userRegister.companyId = $scope.cmpId;
					userRegister.course = {};
					userRegister.course.Name = $scope.data.approveOrderForm.orderDetails[key].Name;
					userRegister.coursetype = $scope.data.approveOrderForm.orderDetails[key].coursetype;
					userRegister.role = {Name: "Mentee", roleId: 3};
					userRegister.course._id = key;

					allUsers.push(userRegister);
				}

			});
			var fnRegisterUserCallBack = userRegistrationService.FnRegisterMultipleUser(allUsers);
			fnRegisterUserCallBack.then(function(data){
				var approveUserResponse = viewUsersForApprove.fnApproveUserRequest($scope.data.approvedMenteesList[key], $state.params.ofId, key, statusType ,$scope.rmId, $scope.cmpId);
				approveUserResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					orderForm._id = orderForm._id.$oid;
					$scope.data.approveOrderForm = orderForm;
					$scope.data.approvedMenteesList[key] = [];
					$alert({title: 'Done..!', content: 'Mentees '+ statusType +' successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
				});

			});
			$hide();
		};
		$modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-addUserToBatch.html', show: true});
	}
else{
		var approveUserResponse = viewUsersForApprove.fnApproveUserRequest($scope.data.approvedMenteesList[key], $state.params.ofId, key, statusType ,$scope.rmId, $scope.cmpId);
				approveUserResponse.then(function(response){
					var orderForm = angular.fromJson(JSON.parse(response.data));
					orderForm._id = orderForm._id.$oid;
					$scope.data.approveOrderForm = orderForm;
					$scope.data.approvedMenteesList[key] = [];
					$alert({title: 'Done..!', content: 'Mentees '+ statusType +' successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
				});
	}
	};




}]);