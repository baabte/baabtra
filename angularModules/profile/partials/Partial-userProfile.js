angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state',function($scope,$rootScope,userProfile,$state){

$rootScope.$watch(function(rootScope){
		return $rootScope.userinfo;
},function(newvalue,oldvalue){
		$scope.userinfo =newvalue;
		var profile = userProfile.loadProfileData($scope.userinfo.ActiveUserData.roleMappingId.$oid);
		profile.then(function (data) {
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			$rootScope.userinfo.profileData=$scope.profileData;
			if(!$scope.profileData.profileImg){
				$scope.profileData.profileImg="default.jpg";
			}
		});

});

$scope.capitalize=function(str){
	return str.replace(/\b./g, function(m){ return m.toUpperCase(); });
};

$scope.convertDate=function(date){
	var date=new Date(date);
	var cur = new Date();
	var diff = cur-date; // This is the difference in milliseconds
    var age = Math.floor(diff/31536000000); 
    date=date.toDateString();
	return "Born on "+date+" ("+age+" years old)";
};

$scope.updateinfo=function(){
	 $state.go('home.main.updateUserProfile');
};


}]);