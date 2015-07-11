angular.module('baabtra').controller('BaabtraComprofileCtrl',['$scope', '$rootScope', '$stateParams', 'baabtraProfile', 'bbConfig', 'commonService', '$state', function ($scope,$rootScope,$stateParams,baabtraProfile, bbConfig, commonService, $state){

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



if(angular.equals(bbConfig.MURID, roleId)){
	$stateParams.userLoginId = $rootScope.userinfo.ActiveUserData.userLoginId;
	$stateParams.type = 'detailed';
	//$state.go('home.main.baabtraProfile',{type:$stateParams.type, userLoginId:$stateParams.userLoginId});

}

$scope.baabtraProfile = {};
$scope.baabtraProfile.type = $stateParams.type;
var userData = baabtraProfile.fnLoadUserProfileDetails($stateParams.userLoginId, $stateParams.type);

userData.then(function (data) {
	$scope.baabtraProfile.result = angular.fromJson(JSON.parse(data.data));
	$scope.baabtraProfile.userDetails = $scope.baabtraProfile.result.userDetails;
	$scope.baabtraProfile.courses = [];
	$scope.baabtraProfile.tests = [];
	for(var course in $scope.baabtraProfile.result.courses){
		
		if(angular.equals($scope.baabtraProfile.result.courses[course].type, 'course') || angular.equals($scope.baabtraProfile.result.courses[course].type, undefined)){
			$scope.baabtraProfile.result.courses[course].type = 'course';
			$scope.baabtraProfile.courses.push($scope.baabtraProfile.result.courses[course]);
		}
		else if(angular.equals($scope.baabtraProfile.result.courses[course].type, 'test')){
			$scope.baabtraProfile.tests.push($scope.baabtraProfile.result.courses[course]);
		}
		
	}
});

$scope.calculateAge = function calculateAge(birthday) { // birthday is a date
	birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - new Date().getUTCFullYear());
};


$scope.convertDate = function convertDate(date){
	return new Date(date);
};


$scope.getCourseDuration = function getCourseDuration(duration){
	return duration[Object.keys(duration)[0]] +" "+ Object.keys(duration)[0];
};
$scope.baabtraProfile.showInPrint = true;
$scope.showId = function showId(){
	$scope.baabtraProfile.showId = true;
	$scope.baabtraProfile.showInPrint = false;
	setTimeout(function(){ 
	angular.element('#myElement').click();
}, 5);
};

$scope.fullPrint = function fullPrint(){
	$scope.baabtraProfile.showInPrint = false;
	setTimeout(function(){ 
	angular.element('#myElement').click();
}, 5);
};



$scope.baabtraProfile.current = 4;
$scope.baabtraProfile.max = 5;

}]);