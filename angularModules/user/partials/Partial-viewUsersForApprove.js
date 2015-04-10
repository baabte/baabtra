angular.module('baabtra').controller('ViewusersforapproveCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewUsersForApprove', '$modal', 'nomination', 'userRegistrationService','$filter',function ($scope, $rootScope, $state, $alert, commonService, viewUsersForApprove, $modal, nomination, userRegistrationService,$filter){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	

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



//ANOOP ***************************************************************************************
	//creating a mock of the global configuration of the company for the approval flow and access privileges for roles

	$scope.approvalFlow = [{displayName:"Verify Applicants", loadStatus:["Pending Approval"], nextStatus:"Verified", privilegedRoles:['a','b','c'], buttonText:"Verify", paymentStage:false },
	{displayName:"Collect Payment", loadStatus:["Verified", "Partially Paid"], nextStatus:"Paid", privilegedRoles:['a','b'], buttonText:"Make Payment", paymentStage:true },
	{displayName:"Approve Order Form", loadStatus:["Paid"], nextStatus:"Approved", privilegedRoles:['a','c'], buttonText:"Approve", paymentStage:false}
	];	

	//.End == creating a mock of the global configuration of the company for the approval flow and access privileges for roles

	//taking the role of the current logged in user to a variable
	//$scope.currentUserRole = angular.copy($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId);
	$scope.currentUserRole = 'a';


	//creating a function to bind custom action dropdown to an order form (for eg. if the order form is already verified, then the verify option should not appear on the respective order form)
	$scope.data.activeOptions=[];
	$scope.getOptions = function(orderFormStatus, orderFormIndex){


		//creating an array for the active options to get the clicked element on the corresponding order form
		$scope.data.activeOptions[orderFormIndex]=[];

			//Creating the options for each role dynamically to show in the options menu, for eg. if the logged in user is of role 'a' only the entries which has role 'a' in their privilegedroles array will appear in the menu
			$scope.data.orderFormOptions = [];

			//a variable to keep the active options for the user so that for the click on an option the properties of the particular object in the approval flow object can be tracked
			
			var orderFormOption = {};
			for (var i in $scope.approvalFlow) {				
				//checking for the uder's previlege to change the status
				if(!angular.equals($scope.approvalFlow[i].privilegedRoles.indexOf($scope.currentUserRole),-1)){	


				// if the order form is in a status which is not in the load status of the current step in the approval flow, that link should not be shown, for eg, if an order form can be set to approved state from verified or paid state, then only the order forms in those statuses should be shown		

					//if the status of the order form is already the next status of the approval form the option to change to that status should not be shown
						 if(!angular.equals(orderFormStatus.toLowerCase(), $scope.approvalFlow[i].nextStatus.toLowerCase() ) && !angular.equals($scope.approvalFlow[i].loadStatus.indexOf(orderFormStatus), -1) ) {

						 	orderFormOption = {text: $scope.approvalFlow[i].displayName, click: "this.approveOrderForm(orderForm," + orderFormIndex + ", $index)"};
							if(!angular.equals(orderFormOption.text, undefined) && !angular.equals(orderFormOption.text, "")){

								$scope.data.orderFormOptions.push(orderFormOption);
								$scope.data.activeOptions[orderFormIndex].push($scope.approvalFlow[i]);
							}

					}
				}
			};
			
			return $scope.data.orderFormOptions;
	}
	// **End**

	//show or hide order form by looking at its tatus and accessibility by the logged in user
	$scope.showOrderFormOnStatus = function(orderFormStatus){

		// an array to store the accessible statuses for the logged in role
		var arrAccessibleStatuses = [];		

		//looping through the approval form to get the statuses those can be changed by the role
		for (var i in $scope.approvalFlow) {
			if(!angular.equals($scope.approvalFlow[i].privilegedRoles.indexOf($scope.currentUserRole),-1)){
				for (var j in $scope.approvalFlow[i].loadStatus) {
					arrAccessibleStatuses.push($scope.approvalFlow[i].loadStatus[j].toLowerCase());
				}
			}
		}

		// checking whether the current status of the order form is inside the newly build array
		if(!angular.equals(arrAccessibleStatuses.indexOf(orderFormStatus.toLowerCase()),-1)){
			return true;
		}
		else{
			return false;
		}

	}

	//**End**

	//function to trigger when an option from the options menu of each order form is clicked
		$scope.approveOrderForm = function(orderForm,orderFormIndex, index){

		
		//getting the currently clicked object to an object in the current scope
		$scope.currentClickedObject = $scope.data.activeOptions[orderFormIndex][index];
		
		//getting the order from to an object in scope
		$scope.data.approveOrderForm = orderForm;

		 // Pre-fetch an external template populated with a custom scope
            var myOtherModal = $modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-orderFormApprovalFlow.html', show: true});



		
		// $scope.data.approveOrderFormStatus = true;
		// $state.go('home.main.viewOrderForm.approveOrderFrom',{ofId:orderForm.orderFormId});
	};

	// **End**


//the approval popup functions, the functions and operations below are for the activities in the pupup which comes when somebody clicks on any of the options in an approval form ======================================================================================

//function to show or hide requests on the basis of the status of the request
$scope.showHideIndividualRequestForApproval = function(requestStatus){

	if(!angular.equals($scope.currentClickedObject.loadStatus.indexOf(requestStatus),-1)){

		return true;
	}
	else{
		return false;
	}

}

//function to show or hide a course title when there is nobody in the current status in concern, for eg. if the user is trying to verify requests if there are no requests in the status "pending verification", the course title should not be shown
$scope.checkRequestsForStatus = function(course, statusArray){

	//looping through the order details section of the order form to check for the existence of atleast one request in the specified status

	var status = '';
	for (var i in statusArray){
		status = statusArray[i];

	//looping through the user info object in the course to check the status of each user
		for (var j in course.userInfo) {

			if(angular.equals(status.toLowerCase(),course.userInfo[j].status.toLowerCase())){

				return true;
			}

		}

	}

	return false;
}

$scope.setStatus = [];

//creating a function to update the status of a mentee when the user checks a checkbox
$scope.updateStatus = function (mentee, checked){

	if(checked){	
		mentee.statusTobeChangedTo = $scope.currentClickedObject.nextStatus;
	}
	else {
		delete mentee.statusTobeChangedTo;
	}

}

//function to check all the checkboxes when the check all checkbox is clicked
$scope.checkAll = function(checked){
 
 	var mentee = {};

		 for(var i in $scope.data.approveOrderForm.orderDetails){
		 
		 	for (var j in $scope.data.approveOrderForm.orderDetails[i].userInfo){

				mentee = $scope.data.approveOrderForm.orderDetails[i].userInfo[j];
		 		mentee.checkedStatus = checked;		 		
		 		$scope.updateStatus(mentee, checked)
		 	}
		 }
	
}

//function to update the orderform status
$scope.updateOrderFormStatus = function(){

	console.clear();

	// creating a copy of the original orderForm to hold the updated values, this is done like this to prevent a false notification to the user before the actual database update gets carried out
	var updatedOrderForm = angular.copy($scope.data.approveOrderForm);

	//set the status of the userinfo by looping inside the updatedOrderForm object
	var request = {};

	// keep a variable to hold the information for changing the overall status of the orderform
	var changeOrderFormStatus = true;

	for (var i in updatedOrderForm.orderDetails){
		for (var j in updatedOrderForm.orderDetails[i].userInfo){
			
			request = updatedOrderForm.orderDetails[i].userInfo[j];

			var d = new Date();
			
			if(!angular.equals(request.statusTobeChangedTo, undefined)){
				

				// pushing the current status into a status history array
				if(angular.equals(request.statusHistory, undefined)){
					request.statusHistory = [];
				}
				var statusHistory = {};

				statusHistory.previousStatus = request.status;
				statusHistory.statusChangedTo = request.statusTobeChangedTo;
				statusHistory.statusChangedOn = d.toISOString();
				statusHistory.statusChangedby = $scope.rmId;

				request.statusHistory.push(statusHistory);

				//change the current status
				request.status = request.statusTobeChangedTo;

				//delete the temp property
				delete request.statusTobeChangedTo;

			}
			else{
				if(!angular.equals(request.status, $scope.currentClickedObject.nextStatus)){

					changeOrderFormStatus = false;
				}
			}

		// if the stage is a payment stage set the data for the same
			if($scope.currentClickedObject.paymentStage){

				if(angular.equals(actTransactions, undefined)){
					var actTransactions = [];			
				}


			}

		}
	}

	//change the status of the order form if the status of all the requests in the orderfrom has been changed
	if(changeOrderFormStatus){
		var orderFormStatusHistory = {};

		if(angular.equals(updatedOrderForm.statusHistory, undefined)){
			updatedOrderForm.statusHistory=[];
		}

		orderFormStatusHistory.previousStatus = updatedOrderForm.status;
		orderFormStatusHistory.statusChangedTo = $scope.currentClickedObject.nextStatus;
	
		orderFormStatusHistory.statusChangedOn = d.toISOString();
		orderFormStatusHistory.statusChangedby = $scope.rmId;
		

		updatedOrderForm.statusHistory.push(orderFormStatusHistory);
		
		updatedOrderForm.status =$scope.currentClickedObject.nextStatus; 

	}


	//updating the details to the database
	updatedOrderForm._id = updatedOrderForm._id.$oid;
	updatedOrderForm.companyId = updatedOrderForm.companyId.$oid;
	updatedOrderForm.urmId = updatedOrderForm.urmId.$oid;
	updatedOrderForm.crmId = updatedOrderForm.crmId.$oid;	
	updatedOrderForm.createdDate = $filter('date')(updatedOrderForm.createdDate.$date);	

	var updateOrderForm = nomination.fnUpdateOrderFormStatus(updatedOrderForm);

	updateOrderForm.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		console.clear();
		console.log(result);
		if(angular.equals(result, 'success')){
			$scope.data.approveOrderForm = updatedOrderForm;
			delete updatedOrderForm;
			$alert({title:'Done. ',content:'The statuses have been set to ' + $scope.currentClickedObject.nextStatus + ' successfully.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});
		}
		else{
			delete updatedOrderForm;
			$alert({title:'Error. ',content:'We could not update the statuses this time, please click on the "' + $scope.currentClickedObject.buttonText + '" button to retry.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'danger', show:true});
		}

	});



}

// ======================================================================================
//ANOOP ***************************************************************************************


	var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId, $scope.data.selectedStatusTypes);
	LoadMenteesResponse.then(function(response){
		$scope.data.companOrderForms = angular.fromJson(JSON.parse(response.data));
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