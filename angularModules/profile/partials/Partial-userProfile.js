angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile',function($scope,$rootScope,userProfile){

$rootScope.$watch(function(rootScope){
		return $rootScope.userinfo;
},function(newvalue,oldvalue){
		$scope.userinfo =newvalue;
		var profile = userProfile.loadProfileData($scope.userinfo.ActiveUserData.roleMappingId.$oid);
		profile.then(function (data) {
			// console.log(data);
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			console.log($scope.profileData.profile.dob);
		});

});

$scope.capitalize=function(str){
	return str.substr(0, 1).toUpperCase() + str.substr(1);
};

$scope.convertDate=function(date){
	// console.log(date);
	date=new Date(date);
	console.log(date.toDateString());
	// date=date.toISOString()
	// return date;
	console.log(date);
};



}]);