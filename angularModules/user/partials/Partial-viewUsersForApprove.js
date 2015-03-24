angular.module('baabtra').controller('ViewusersforapproveCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'viewUsersForApprove', function ($scope, $rootScope, $state, $alert, commonService, viewUsersForApprove){

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
	$scope.data.checkAll = false;
	$scope.data.approvedMenteesList = [];
	$scope.data.statusTypes = [{"value":"requested","label":"Requested"},
							   {"value":"approved","label":"Approved"},
							   {"value":"rejected","label":"Rejected"}];
	$scope.data.selectedStatusTypes = "requested";

	var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId, $scope.data.selectedStatusTypes);
	LoadMenteesResponse.then(function(response){
		$scope.data.orderForms = angular.fromJson(JSON.parse(response.data));
		console.log($scope.data.orderForms);
		//$scope.data.menteesListLength = Object.keys($scope.data.menteesList).length;
	});

	
	// $scope.checkAllMentees = function(value) {
	// 	if(!value){
	// 		$scope.data.approvedMenteesList = [];
	//     	angular.forEach($scope.data.menteesList,function(item){
	//     		$scope.data.approvedMenteesList.push(item._id.$oid);
	//     	});
	//     }
	//     else{
	//     	$scope.data.approvedMenteesList = [];
	//     }
	//     $scope.data.checkAll = !$scope.data.checkAll;
 //  	};

 //  	$scope.statusTypesChanged = function(){
  		
 //  		$scope.data.menteesList = [];
 //  		$scope.data.approvedMenteesList = [];

 //  		var LoadMenteesResponse = viewUsersForApprove.fnLoadMenteesForApprove($scope.cmpId, $scope.data.selectedStatusTypes);
	// 	LoadMenteesResponse.then(function(response){
	// 		$scope.data.menteesList = angular.fromJson(JSON.parse(response.data));
	// 		$scope.data.menteesListLength = Object.keys($scope.data.menteesList).length;
	// });
 //  	};

	// $scope.approveUsers = function(statusType){

	// 	$scope.data.menteesList = [];

	// 	var approveUserResponse = viewUsersForApprove.fnApproveUserRequest($scope.data.approvedMenteesList, statusType ,$scope.rmId, $scope.cmpId);
	// 	approveUserResponse.then(function(response){
			
	// 		$scope.data.menteesList = angular.fromJson(JSON.parse(response.data));
	// 		$scope.data.selectedStatusTypes = statusType;

	// 		$scope.data.menteesListLength = Object.keys($scope.data.menteesList).length;
	// 		$scope.data.approvedMenteesList = [];

	// 		$alert({title: 'Done..!', content: 'Mentees '+ statusType +' successfully :-)', placement: 'top-right',duration:3 ,animation:'am-slide-bottom', type: 'success', show: true});
	// 	});
	// };

}]);