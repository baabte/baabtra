angular.module('baabtra').controller('UpdateprofileinfoCtrl',['$scope','updateProfileInfo','$rootScope','$stateParams',function($scope,updateProfileInfo,$rootScope,$stateParams){

$rootScope.$watch(function(rootScope){
		return $rootScope.userinfo;
},function(newvalue,oldvalue){
		$scope.userinfo =newvalue;
		// console.log($scope.userinfo);
			$scope.profileData = $rootScope.userinfo.profileData;
			console.log($scope.profileData);
			if(!$scope.profileData.profileImg){
				$scope.profileData.profileImg="default.jpg";
			}
		});


}]);