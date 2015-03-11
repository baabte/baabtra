angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state','commonService','$modal','$alert','$stateParams',function($scope,$rootScope,userProfile,$state,commonService,$modal,$alert,$stateParams){

$scope.updatepicmsg=true;
$scope.showHideAbtPic=false;
$scope.showHidelocationPic=false;
$scope.showHideDobAndPlacePic=false;
$scope.selectedTab='AccountSettings';
$scope.saveButton="save";
$scope.nameicon=false;
$scope.emailicon=false;
$scope.toggle=true;
$scope.pwdicon=false;
$scope.lange=false;
$scope.availlangualges=[{"language":"English(en)","langCode":"en"},{"language":"Arabic(ar)","langCode":"ar"}];
$scope.languageActiveOrNot=true;

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.userinfo =$rootScope.userinfo;
var profile; 
if(!angular.equals($stateParams.userId,"")){
	profile = userProfile.loadProfileData($stateParams.userId);

}
else{
	profile = userProfile.loadProfileData($scope.userinfo.userLoginId);

}
profile.then(function (data) {
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			console.log($scope.profileData.profile);
			// $scope.profileData.profile.passwordRelatedData={};
			// $scope.profileData.profile.passwordRelatedData.passwordChanges=["hai","hello"];
			// console.log($scope.profileData.profile.passwordRelatedData);
			if(!$scope.profileData.profile.Preferedlanguage){
				$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[0];
				$scope.oldLang=$scope.availlangualges[0].langCode;	
			}
			else{

				if($scope.profileData.profile.Preferedlanguage.langCode=="en"){
					$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[0];

				}
				else{
					$scope.profileData.profile.Preferedlanguage=$scope.availlangualges[1];
				}
				$scope.oldLang=$scope.profileData.profile.Preferedlanguage.langCode;
			}

});



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
	else if(variable=='nameicon'){
		$scope.nameicon=$scope.nameicon===false? true:false;
	}
	else if(variable=='emailicon'){
		$scope.emailicon=$scope.emailicon===false? true:false;
	}
	else if(variable=='pwdicon'){
		$scope.pwdicon=$scope.pwdicon===false?true:false;
	}
	else if(variable=='lange'){
		$scope.lange=$scope.lange===false?true:false;
	}

};

// $scope.loadTabData=function(tab){
// 	if(tab=='AccountSettings'){
// 		console.log($rootScope.userinfo.userLoginId);
// 	}
// };
$scope.passwordChangeFrequency=function(){
		if($scope.profileData.profile.passwordChanges)
		{
			return "changed last week";
		}
		else{
			return "never changed";
		}

};
$scope.checkPasswordMatch=function(){
	$scope.changePwd.retypedPassword.$invalid= $scope.newPassword !== $scope.retypedPassword;
};

$scope.$watch(function(scope) { return scope.profileData.profile.Preferedlanguage.langCode },
              function(newValue, oldValue) {
                  if($scope.oldLang!=newValue){
                  		$scope.languageActiveOrNot=false;
                  }
                  else{
                  		$scope.languageActiveOrNot=true;
                  }
              }
  );

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

}]);
