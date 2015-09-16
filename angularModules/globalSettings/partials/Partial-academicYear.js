angular.module('baabtra').controller('AcademicyearCtrl',['$scope', '$rootScope', '$state', '$alert', 'commonService', 'academicYear',function($scope, $rootScope, $state, $alert, commonService, academicYear){

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

	$scope.academicYearObj = {};
	$scope.academicYearObj.newAcademicYear = {};
	$scope.academicYearObj.newAcademicYear.activeAcademicYear = false;
	$scope.academicYearObj.newAcademicYear.crmId = rm_id;
	$scope.academicYearObj.newAcademicYear.urmId = rm_id;
	$scope.academicYearObj.newAcademicYear.activeFlag = 1;
	$scope.academicYearObj.newAcademicYear.companyId = companyId;

	var loadAcademicYear = academicYear.loadAcademicYear({companyId:companyId, type:"all"});
	loadAcademicYear.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.academicYearObj.AcademicYearList = result.academicYear;
	});

	$scope.deleteAcademicYear = function(academicYearDetails, index){
		academicYearDetails.activeFlag = 0;
		$scope.saveAcademicYear(academicYearDetails, function(){
			$scope.academicYearObj.AcademicYearList.splice(index, 1);
			$alert({title: "Deleted!", content: "Academic Year Deleted Successfully", placement: 'top-right',duration:2, type: "success"});
		});
	};

	function reset(){
		$scope.academicYearObj.newAcademicYear = {};
		$scope.academicYearObj.newAcademicYear.activeAcademicYear = false;
		$scope.academicYearObj.newAcademicYear.crmId = rm_id;
		$scope.academicYearObj.newAcademicYear.urmId = rm_id;
		$scope.academicYearObj.newAcademicYear.activeFlag = 1;
		$scope.academicYearObj.newAcademicYear.companyId = companyId;
	};

	$scope.saveAcademicYear = function(academicYearDetails, callback){
		
		if(academicYearDetails._id){
			academicYearDetails._id = academicYearDetails._id.$oid?academicYearDetails._id.$oid:academicYearDetails._id;
		}

		academicYearDetails.crmId = academicYearDetails.crmId.$oid?academicYearDetails.crmId.$oid:academicYearDetails.crmId;
		academicYearDetails.urmId = academicYearDetails.urmId.$oid?academicYearDetails.urmId.$oid:academicYearDetails.urmId;
		academicYearDetails.companyId = academicYearDetails.companyId.$oid?academicYearDetails.companyId.$oid:academicYearDetails.companyId;

		

		var academicYearSaveResponse = academicYear.saveAcademicYear(academicYearDetails);
		academicYearSaveResponse.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			
			if(callback){
				callback();
			}else{
				$alert({title: result.status+"!", content: "Academic Year "+result.status+" Successfully", placement: 'top-right',duration:2, type: "success"});
				$scope.academicYearObj.AcademicYearList = result.academicYear;
			}
			reset();
		});
	};

}]);