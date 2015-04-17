angular.module('baabtra').controller('ViewusersforapproveCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewUsersForApprove', '$modal', 'nomination', 'userRegistrationService','$filter','$stateParams',function ($scope, $rootScope, $state, $alert, commonService, viewUsersForApprove, $modal, nomination, userRegistrationService,$filter,$stateParams){

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
	//change the top padding of the details section when the height of the header changes

	$scope.$watch(function(){
		return $(".header").height();
	},
	function(){

		$(".orderDetails").css("padding-top",($(".header").height() + 20) +'px');
	})


	//function to expand and collapse the details of all applicants
	$scope.fnShowDetailsOfAll = function(show){
		
		$scope.showDetailsOfAll = show;

		for(var i in $scope.currentOrderForm.orderDetails){
			var uInfo = $scope.currentOrderForm.orderDetails[i];			
			for(var j in uInfo.userInfo){

				uInfo.userInfo[j].showDetails = show;

			}
		}
	}


	//creating a mock of the global configuration of the company for the approval flow and access privileges for roles

	$scope.approvalFlow = [{currentStage:'Verification',displayName:"Verify Applicants", loadStatus:["Pending Approval","Resubmit"], nextStatus:"Verified", privilegedRoles:['a','b','c'], buttonText:"Verify", paymentStage:false, viewStage:false,canReject:true },
	{currentStage:'Payment',displayName:"Collect Payment", loadStatus:["Verified", "Partially Paid"], nextStatus:"Paid", privilegedRoles:['a','b'], buttonText:"Make Payment", paymentStage:true, viewStage:false,canReject:false },
	{currentStage:'Approval',displayName:"Approve Applicants", loadStatus:["Paid"], nextStatus:"Approved", privilegedRoles:['a','c'], buttonText:"Approve", paymentStage:false, viewStage:false,canReject:true},
	{currentStage:'Approved',displayName:"Approved Applicants", loadStatus:["Approved"], nextStatus:"", privilegedRoles:['a','c'], buttonText:"View Approved", paymentStage:false, viewStage:true,canReject:false},
	{currentStage:'Rejected',displayName:"Rejected Applicants", loadStatus:["Rejected"], nextStatus:"", privilegedRoles:['a','c'], buttonText:"View Rejected", paymentStage:false, viewStage:true,canReject:false}

	];	

	//.End == creating a mock of the global configuration of the company for the approval flow and access privileges for roles


	//taking the role of the current logged in user to a variable
	//$scope.currentUserRole = angular.copy($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId);
	$scope.currentUserRole = 'a';

	//setting a current stage, this must be taken from the url since every stage will be having a menu link

	var currentStageIndex = $stateParams.key;	
	$scope.currentStage = {};
	$scope.currentStage = $scope.approvalFlow[currentStageIndex];

	// checking whether the current role has access to change the status
	if(angular.equals($scope.currentStage.privilegedRoles.indexOf($scope.currentUserRole), -1)) {
		$state.go('home.main');
	}

// set an array that contains the status of which the order forms are to be loaded

$scope.data.selectedStatusTypes = $scope.currentStage.loadStatus;


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

		$scope.approveOrderForm = function(orderForm){

		//getting the order from to an object in scope
		$scope.data.approveOrderForm = orderForm;

		//taking the current orderform into a variable
		$scope.currentOrderForm = orderForm;

		$scope.createCurrencyArray();


		// Pre-fetch an external template populated with a custom scope
            var myOtherModal = $modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-orderFormApprovalFlow.html', show: true});



		
		// $scope.data.approveOrderFormStatus = true;
		// $state.go('home.main.viewOrderForm.approveOrderFrom',{ofId:orderForm.orderFormId});
	};

	// **End**


//the approval popup functions, the functions and operations below are for the activities in the pupup which comes when somebody clicks on any of the options in an approval form ======================================================================================

//function to show or hide requests on the basis of the status of the request
$scope.showHideIndividualRequestForApproval = function(requestStatus){

	if(!angular.equals($scope.currentStage.loadStatus.indexOf(requestStatus),-1)){

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


//creating a function to update the status of a mentee when the user checks a checkbox
$scope.updateStatus = function (mentee, checked, course){

	if(checked){	
		mentee.statusTobeChangedTo = $scope.currentStage.nextStatus;

		//if the stage is a payment stage update the payment details as well as populate the payment textbox
		if($scope.currentStage.paymentStage){

			// updating the model for the respective currency
			for (var i in $scope.currencyArray) {
				var currentCurrencyRow = $scope.currencyArray[i];

				if(angular.equals(course.currency, currentCurrencyRow.currency)){

					if(angular.equals(currentCurrencyRow.amount, undefined)){
						currentCurrencyRow.amount = 0;
					}

					currentCurrencyRow.amount = parseInt(currentCurrencyRow.amount) + parseInt(course.coursePrice);
					currentCurrencyRow.actualAmount = currentCurrencyRow.amount;
				}

			}    

		}
	}
	else {
		delete mentee.statusTobeChangedTo;
		//if the stage is a payment stage update the payment details as well as populate the payment textbox
		if($scope.currentStage.paymentStage){

			// updating the model for the respective currency
			for (var i in $scope.currencyArray) {
				var currentCurrencyRow = $scope.currencyArray[i];

				if(angular.equals(course.currency, currentCurrencyRow.currency) && !angular.equals(currentCurrencyRow.amount,0)){

					if(angular.equals(currentCurrencyRow.amount, undefined)){
						currentCurrencyRow.amount = 0;
					}

					currentCurrencyRow.amount = parseInt(currentCurrencyRow.amount) - parseInt(course.coursePrice);
					currentCurrencyRow.actualAmount = currentCurrencyRow.amount;

				}

			}    

		}
	}

}

//function to check all the checkboxes when the check all checkbox is clicked
$scope.checkAll = function(checked){
 
 	var mentee = {};
 	var course = {};

 	//setting the model of the amounts and discounts to 0
 		for(var i in $scope.currencyArray){
 			var currentCurrencyRow = $scope.currencyArray[i];
 			currentCurrencyRow.amount = 0;
 			currentCurrencyRow.discount = 0;
 			currentCurrencyRow.actualAmount = 0;
 		}

		 for(var i in $scope.data.approveOrderForm.orderDetails){		 
		 	for (var j in $scope.data.approveOrderForm.orderDetails[i].userInfo){

		 		var currentUserInfo =  $scope.data.approveOrderForm.orderDetails[i].userInfo[j];
		 		
		 		if (!angular.equals($scope.currentStage.loadStatus.indexOf(currentUserInfo.status), -1)) {
					course = $scope.data.approveOrderForm.orderDetails[i];
					mentee = $scope.data.approveOrderForm.orderDetails[i].userInfo[j];
			 		mentee.checkedStatus = checked;		 		
			 		$scope.updateStatus(mentee, checked, course);
			 	}

		 	}
		 }
	
}

//create an ng-change function update the total amount when discount amount is applied

$scope.updateDiscount = function(currency){	

	//change the amount
	var inequalityArray = [undefined,null,0];
	
		if(angular.equals(inequalityArray.indexOf(currency.discount), -1) && currency.discount <= 100) {			
		currency.amount = currency.actualAmount - Math.ceil(currency.actualAmount * (Math.floor(currency.discount)/100));
		}
		else {
			currency.amount = currency.actualAmount;
		}
}

//get the array of currencies in the courses to show the payment screen, this is needed since each course may be configured to have a differnet currency
$scope.createCurrencyArray = function() {

		if($scope.currentStage.paymentStage){
			$scope.currencyArray = [];

			//looping through the current order form to create the currency array
			for(var i in $scope.currentOrderForm.orderDetails){


				var currentCourse = $scope.currentOrderForm.orderDetails[i];
				console.log(currentCourse)

			if(angular.equals($scope.currencyArray.length,0)) {
					$scope.currencyArray.push({currency:currentCourse.currency});				
			}
			else{				
				for (var j in $scope.currencyArray) {
					if(!angular.equals($scope.currencyArray[j].currency,currentCourse.currency)){
						$scope.currencyArray.push({currency:currentCourse.currency});
					}
				}
			}

			

			}		

		}
}

//creating a function to set the common details of the accountTransaction oobject
var fillActTransaction = function(updatedOrderForm, currentOrderDetail, mode, actHead, narration, paymentMode){

					var actTransaction = {};

					actTransaction.companyId = updatedOrderForm.companyId.$oid;
					actTransaction.crmId = updatedOrderForm.urmId.$oid;
					actTransaction.urmId = updatedOrderForm.urmId.$oid;
					actTransaction.activeFlag = 1;
					actTransaction.actHead = {};
					actTransaction.actHead = actHead;
						
					actTransaction.debit = {};
					actTransaction.credit = {};

					var discount = 0;
					//calculating the amount
					for (var k in $scope.currencyArray){
						var currentCurrency = $scope.currencyArray[k];
						if(angular.equals(currentCurrency.currency,currentOrderDetail.currency)){
							discount = currentCurrency.discount; 
						}
					}

					actTransaction.transactionFor = {courseId:currentOrderDetail.courseId,
						courseName:currentOrderDetail.Name,
						courseType:currentOrderDetail.coursetype};


					actTransaction.debit.currency = currentOrderDetail.currency;
					actTransaction.credit.currency = currentOrderDetail.currency;

					var amount = 0;

					var inequalityArray = [undefined,null,0];
						if(angular.equals(inequalityArray.indexOf(discount), -1) && discount <= 100) {
							amount = currentOrderDetail.coursePrice - Math.ceil(currentOrderDetail.coursePrice * (Math.floor(discount)/100));
						}
						else{
							amount = currentOrderDetail.coursePrice;
						}

					if (angular.equals(mode,'credit')){
						actTransaction.debit.amount = 0;
						actTransaction.credit.amount = amount;					
					}
					else{
						actTransaction.credit.amount = 0;
						actTransaction.debit.amount = amount;	
					}

					actTransaction.narration = narration;
					actTransaction.paymentMode = paymentMode;
					actTransaction.orderFormId = $scope.currentOrderForm._id.$oid;

					return actTransaction;
}


//function to popup the receipt print
$scope.printReceipt = function(orderForm){
		$modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-paymentReceipt.html', show: true});
};


//create a receipt detail object
var receiptDetail = {};

//function to update the orderform status
$scope.updateOrderFormStatus = function(type){

	console.clear();

	var actTransactions = [];
	$scope.paymentReceipt={};

	// A variable to hold tha data that at least one entry has been selected for status change
	var minimumSelection = false;

	// creating a copy of the original orderForm to hold the updated values, this is done like this to prevent a false notification to the user before the actual database update gets carried out
	var updatedOrderForm = angular.copy($scope.data.approveOrderForm);

	//set the status of the userinfo by looping inside the updatedOrderForm object
	var request = {};

	// keep a variable to hold the information for changing the overall status of the orderform
	var changeOrderFormStatus = true;

	// a variable to hold a single account transaction this will be added to the actTransactions array
	var actTransaction = {};
	


	for (var i in updatedOrderForm.orderDetails){
		var currentOrderDetail = updatedOrderForm.orderDetails[i];
		
		/*updatedOrderForm.orderDetails[i].rejectedCount=0;
		updatedOrderForm.orderDetails[i].approvedCount=0;
		updatedOrderForm.orderDetails[i].verifiedCount=0;
		updatedOrderForm.orderDetails[i].allocatedCount=0;
		updatedOrderForm.orderDetails[i].pendingApprovalCount=0;
		updatedOrderForm.orderDetails[i].resubmitCount=0;*/


		for (var j in currentOrderDetail.userInfo){
			
			request = currentOrderDetail.userInfo[j];

			var d = new Date();
							/*counting the status here*/
				/*if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Rejected')){
					updatedOrderForm.orderDetails[i].rejectedCount=updatedOrderForm.orderDetails[i].rejectedCount+1;
				}
				if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Approved')){
					updatedOrderForm.orderDetails[i].approvedCount=updatedOrderForm.orderDetails[i].approvedCount+1;
				}	
				if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Verified')){
					updatedOrderForm.orderDetails[i].verifiedCount=updatedOrderForm.orderDetails[i].verifiedCount+1;
				}
				if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Allocated')){
					updatedOrderForm.orderDetails[i].allocatedCount=updatedOrderForm.orderDetails[i].allocatedCount+1;
				}
				if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Pending Approval')){
				updatedOrderForm.orderDetails[i].pendingApprovalCount=updatedOrderForm.orderDetails[i].pendingApprovalCount+1;
				}
				if(angular.equals(updatedOrderForm.orderDetails[i].userInfo[j].status,'Pending Approval')){
					updatedOrderForm.orderDetails[i].resubmitCount=updatedOrderForm.orderDetails[i].resubmitCount+1;
				}*/
				/**************************/
			if(!angular.equals(request.statusTobeChangedTo, undefined)){
				
				//set the variable that at least one entry has been selected
				minimumSelection = true;

				// pushing the current status into a status history array
				if(angular.equals(request.statusHistory, undefined)){
					request.statusHistory = [];
				}
				var statusHistory = {};

				statusHistory.previousStatus = request.status;
				if(!angular.equals(type,'reject')){
					statusHistory.statusChangedTo = request.statusTobeChangedTo;
				}else{
					statusHistory.statusChangedTo = 'Rejected';
				}
				statusHistory.statusChangedOn = d.toISOString();
				statusHistory.statusChangedby = $scope.rmId;

				request.statusHistory.push(statusHistory);
				if(!angular.equals(type,'reject')){
					//change the current status
					request.status = request.statusTobeChangedTo;
				}else{
					request.status = "Rejected";
				}



				// if the stage is a payment stage set the data for the in a different object
				if($scope.currentStage.paymentStage){

					if(angular.equals(actTransactions, undefined)){
						var actTransactions = [];			
					}
					
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
					//crediting the course

					
					var actHead = {};
					actHead.type = 'Course';
					actHead.details = {courseId:currentOrderDetail.courseId,
						courseName:currentOrderDetail.Name,
						courseType:currentOrderDetail.coursetype};

					var actTransaction = fillActTransaction(updatedOrderForm,currentOrderDetail,'credit', actHead, 'Course Sales','By Cash');
					
					actTransactions.push(actTransaction);
				

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
					//debitting the requestee

					actHead = {};					
					actHead.type = 'Requestee';
					actHead.details = {userId:request.userId,
						Name:request.firstName + ' ' + request.lastName,
						eMail:request.eMail};

					var actTransaction = fillActTransaction(updatedOrderForm,currentOrderDetail,'debit', actHead, 'Course Sales','By Cash');
					
					actTransactions.push(actTransaction);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
					//crediting the requestee

					actHead = {};					
					actHead.type = 'Requestee';
					actHead.details = {userId:request.userId,
						Name:request.firstName + ' ' + request.lastName,
						eMail:request.eMail};

					var actTransaction = fillActTransaction(updatedOrderForm,currentOrderDetail,'credit', actHead, 'Course Sales','By Cash');
					
					actTransactions.push(actTransaction);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
					//debitting cash

					actHead = {};					
					actHead.type = 'Cash';
					actHead.details = {};

					var actTransaction = fillActTransaction(updatedOrderForm,currentOrderDetail,'debit', actHead, 'Course Sales','By Cash');
					
					actTransactions.push(actTransaction);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

				// create a receipt object
				
					
					$scope.paymentReceipt.orderFormId = $scope.currentOrderForm._id.$oid;
					$scope.paymentReceipt.orderFormCode = $scope.currentOrderForm.customCompanyCode;
					$scope.paymentReceipt.companyId = updatedOrderForm.companyId.$oid;
					$scope.paymentReceipt.crmId = updatedOrderForm.urmId.$oid;
					$scope.paymentReceipt.urmId = updatedOrderForm.urmId.$oid;
					$scope.paymentReceipt.activeFlag = 1;
					$scope.paymentReceipt.receiptDetails = [];
					$scope.paymentReceipt.totalPayableAmount = 0;
				

					var discount = 0;
					var currency = '';
					//calculating the amount
					for (var k in $scope.currencyArray){
						var currentCurrency = $scope.currencyArray[k];
						if(angular.equals(currentCurrency.currency,currentOrderDetail.currency)){
							discount = currentCurrency.discount; 
							currency = currentCurrency.currency; 
						}
					}



					var amount = 0;

					var inequalityArray = [undefined,null,0];
						if(angular.equals(inequalityArray.indexOf(discount), -1) && discount <= 100) {
							amount = currentOrderDetail.coursePrice - Math.ceil(currentOrderDetail.coursePrice * (Math.floor(discount)/100));
						}
						else{
							amount = currentOrderDetail.coursePrice;
						}

					receiptDetail = {};	

					if(angular.equals($scope.paymentReceipt.receiptDetails.length,0)){
						receiptDetail = {
							courseId:currentOrderDetail.courseId,
							course:currentOrderDetail.Name,
							count:1,
							currency:currency,
							actualAmount:currentOrderDetail.coursePrice,
							discount:discount,
							payableAmount:amount};
						$scope.paymentReceipt.totalPayableAmount = 	parseInt($scope.paymentReceipt.totalPayableAmount) + amount;
						$scope.paymentReceipt.receiptDetails.push(receiptDetail);
					}
					else{

						var alreadyExists = false;
						for(var l in $scope.paymentReceipt.receiptDetails) {

							var currentReceiptDetail = $scope.paymentReceipt.receiptDetails[l];

							if (angular.equals(currentReceiptDetail.courseId,currentOrderDetail.courseId)){
								currentReceiptDetail.count = parseInt(currentReceiptDetail.count) + 1;
								currentReceiptDetail.actualAmount = parseInt(currentReceiptDetail.actualAmount) + parseInt(currentOrderDetail.coursePrice);
								currentReceiptDetail.payableAmount = parseInt(currentReceiptDetail.payableAmount) + parseInt(amount);

								$scope.paymentReceipt.totalPayableAmount = 	parseInt($scope.paymentReceipt.totalPayableAmount) + amount;

								alreadyExists = true;
							}
							
						}

						if(!alreadyExists){						

								receiptDetail = {
								courseId:currentOrderDetail.courseId,
								course:currentOrderDetail.Name,
								count:1,
								currency:currency,
								actualAmount:currentOrderDetail.coursePrice,
								discount:discount,
								payableAmount:amount};
								$scope.paymentReceipt.receiptDetails.push(receiptDetail);

								$scope.paymentReceipt.totalPayableAmount = 	parseInt($scope.paymentReceipt.totalPayableAmount) + amount;

						}

					}

				}				
				

				//delete the temp property
				delete request.statusTobeChangedTo;

			}
			else{
				if(!angular.equals(request.status, $scope.currentStage.nextStatus)){

					changeOrderFormStatus = false;
				}
			}

		delete request.checkedStatus;

		}
	}


	// exiting the function if no entry has been selected for status change
	if(!minimumSelection){
		if(!angular.equals(type,'reject')){
			$alert({title:'Operation Aborted. ',content:'Please select at least one entry to ' + $scope.currentStage.buttonText, placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'warning', show:true});
			}else{
				$alert({title:'Operation Aborted. ',content:'Please select at least one entry to Reject', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'warning', show:true});
			}
			return false;
	}

	//change the status of the order form if the status of all the requests in the orderfrom has been changed
	if(changeOrderFormStatus){
		var orderFormStatusHistory = {};

		if(angular.equals(updatedOrderForm.statusHistory, undefined)){
			updatedOrderForm.statusHistory=[];
		}

		orderFormStatusHistory.previousStatus = updatedOrderForm.status;
		//condition to check if the user clicked 'reject' button or not
		if(!angular.equals(type,'reject')){
			
			orderFormStatusHistory.statusChangedTo = $scope.currentStage.nextStatus;
		}else{
			orderFormStatusHistory.statusChangedTo = 'Rejected';
		}
		orderFormStatusHistory.statusChangedOn = d.toISOString();
		orderFormStatusHistory.statusChangedby = $scope.rmId;
		

		updatedOrderForm.statusHistory.push(orderFormStatusHistory);
		
		updatedOrderForm.status =$scope.currentStage.nextStatus; 

	}


	//updating the details to the database
	updatedOrderForm._id = updatedOrderForm._id.$oid;
	updatedOrderForm.companyId = updatedOrderForm.companyId.$oid;
	updatedOrderForm.urmId = updatedOrderForm.urmId.$oid;
	updatedOrderForm.crmId = updatedOrderForm.crmId.$oid;	
	updatedOrderForm.createdDate = new Date($filter('date')(updatedOrderForm.createdDate.$date));	

	console.log(updatedOrderForm);
	console.log(actTransactions);
	console.log($scope.paymentReceipt);
    
	
	/*var updateOrderForm = nomination.fnUpdateOrderFormStatus(updatedOrderForm,actTransactions, $scope.paymentReceipt);

	updateOrderForm.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		
		if(angular.equals(result.type, 'success')){
			$scope.data.approveOrderForm = updatedOrderForm;
			delete updatedOrderForm;
			//cheking the status is rejected or not
			if(!angular.equals(type,'reject')){
				$alert({title:'Done. ',content:'The statuses have been set to ' + $scope.currentStage.nextStatus + ' successfully.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});
			}else{
				$alert({title:'Done. ',content:'The statuses have been set to Rejected successfully.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'success', show:true});
			}
			if(!angular.equals(result.data,undefined) && $scope.currentStage.paymentStage){
				$scope.paymentReceipt = result.data;
				//setting the model of the amounts and discounts to 0
		 		for(var i in $scope.currencyArray){
		 			var currentCurrencyRow = $scope.currencyArray[i];
		 			currentCurrencyRow.amount = 0;
		 			currentCurrencyRow.discount = 0;
		 			currentCurrencyRow.actualAmount = 0;
		 		}

		 		//calling the print receipt modal			
				$scope.printReceipt();
			}

			$scope.$Apply();
		}
		else{
			delete updatedOrderForm;
			$alert({title:'Error. ',content:'We could not update the statuses this time, please click on the "' + $scope.currentStage.buttonText + '" button to retry.', placement:'top-right', duration:'4', animation:'am-fade-and-slide-bottom', type:'danger', show:true});
		}

	});*/



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