angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state','commonService','$modal','$alert',function($scope,$rootScope,userProfile,$state,commonService,$modal,$alert){

$scope.updatepicmsg=true;
$scope.showHideAbtPic=false;
$scope.showHidelocationPic=false;
$scope.showHideDobAndPlacePic=false;
$scope.selectedTab='AccountSettings';
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

$scope.updateUserProfileDatas=function(data){
	// console.log($scope.profileData.profile);
	var profileUpdateConfirmation = userProfile.updateUserProfileData($scope.profileData._id.$oid,$scope.profileData.profile);
		profileUpdateConfirmation.then(function (data) {
			if(data.status==200&&data.statusText=="OK"){
				$scope.notifications("Success","Updated","success");
			}
		});

};

$scope.editAboutOpt=function(variable){
	if(variable=='about'){
		$scope.showHideAbtPic=$scope.showHideAbtPic===false? true:false;
	}
	else if(variable=='location'){
		$scope.showHidelocationPic=$scope.showHidelocationPic===false? true:false;
	} 
	else if(variable=='DobAndPlace'){
		$scope.showHideDobAndPlacePic=$scope.showHideDobAndPlacePic===false? true:false;
	}
	

};

$scope.loadTabData=function(tab){
	if(tab=='AccountSettings'){
		console.log($rootScope.userinfo.userLoginId);
	}
};
$scope.hello=function(){
alert("hai");
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);
