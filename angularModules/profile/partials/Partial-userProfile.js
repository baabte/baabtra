angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state','commonService','$modal',function($scope,$rootScope,userProfile,$state,commonService,$modal){

$scope.updatepicmsg=true;
$scope.showHideAbtPic=false;
$scopeshowHidelocationPic=false;
if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.userinfo =$rootScope.userinfo;
var profile = userProfile.loadProfileData($scope.userinfo.userLoginId);
		profile.then(function (data) {
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			console.log($scope.profileData.profile);
		});


$scope.capitalize=function(str){
	// return str.replace(/\b./g, function(m){ return m.toUpperCase(); });
	return str;
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

$scope.showHideFotoDive=function(){
	$scope.updatepicmsg=$scope.updatepicmsg===false? true:false;
};

$scope.updateUserProfileDatas=function(field,newdata){
	var profileUpdateConfirmation = userProfile.updateUserProfileData($scope.profileData._id.$oid,field,newdata);
		profileUpdateConfirmation.then(function (data) {
			if(data.status==200&&data.statusText=="OK"){
				$scope.profileData.profile.about=newdata;
			}
		});

};
$scope.editAboutOpt=function(variable){
	console.log(variable);
	if(variable=='about'){
		$scope.showHideAbtPic=$scope.showHideAbtPic===false? true:false;
	}
	else if(variable=='location'){

	} 
	

};

}]);
