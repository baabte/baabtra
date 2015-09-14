angular.module('baabtra').controller('FinancialyearCtrl', ['$scope', '$rootScope', '$state', '$alert', 'commonService', 'commonSrv', function($scope, $rootScope, $state, $alert, commonService, commonSrv){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.financialYearObj = {};
	$scope.financialYearObj.newFinancialYear = {};
	$scope.financialYearObj.newFinancialYear.activeFinancialYear = false;
	$scope.financialYearObj.newFinancialYear.crmId = rm_id;
	$scope.financialYearObj.newFinancialYear.urmId = rm_id;
	$scope.financialYearObj.newFinancialYear.activeFlag = 1;
	$scope.financialYearObj.newFinancialYear.companyId = companyId;

	var loadFinancialYear = commonSrv.loadFinancialYear({companyId:companyId, type:"all"});
	loadFinancialYear.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.financialYearObj.financialYearList = result.financialYear;
		console.log($scope.financialYearObj.financialYearList);
	});

	function reset(){
		$scope.financialYearObj.newFinancialYear = {};
		$scope.financialYearObj.newFinancialYear.activeFinancialYear = false;
		$scope.financialYearObj.newFinancialYear.crmId = rm_id;
		$scope.financialYearObj.newFinancialYear.urmId = rm_id;
		$scope.financialYearObj.newFinancialYear.activeFlag = 1;
		$scope.financialYearObj.newFinancialYear.companyId = companyId;
	};

	// function for save financial year details
	$scope.saveFinancialYear = function(financialYearDetails, callback){
		console.clear();
		console.log(financialYearDetails);

		if(financialYearDetails._id){
			financialYearDetails._id = financialYearDetails._id.$oid?financialYearDetails._id.$oid:financialYearDetails._id;
		}

		financialYearDetails.crmId = financialYearDetails.crmId.$oid?financialYearDetails.crmId.$oid:financialYearDetails.crmId;
		financialYearDetails.urmId = financialYearDetails.urmId.$oid?financialYearDetails.urmId.$oid:financialYearDetails.urmId;
		financialYearDetails.companyId = financialYearDetails.companyId.$oid?financialYearDetails.companyId.$oid:financialYearDetails.companyId;

		saveFinancialYear = commonSrv.saveFinancialYear(financialYearDetails);
		saveFinancialYear.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			
			if(callback){
				callback();
			}else{
				$alert({title: result.status+"!", content: "Academic Year "+result.status+" Successfully", placement: 'top-right',duration:2, type: "success"});
				console.log(result.financialYear);
				$scope.financialYearObj.financialYearList = result.financialYear;
			}

			reset();

		});
	};

	// function for delete financial year

	$scope.deleteFinancialYear = function(financialYearDetails, index){
		financialYearDetails.activeFlag = 0;
		$scope.saveFinancialYear(financialYearDetails, function(){
			$scope.financialYearObj.financialYearList.splice(index, 1);
			$alert({title: "Deleted!", content: "Financial Year Deleted Successfully", placement: 'top-right',duration:2, type: "success"});
		});
	};

}]);