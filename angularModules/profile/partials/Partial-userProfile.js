angular.module('baabtra').controller('UserprofileCtrl',['$scope','$rootScope','userProfile','$state','commonService','$modal',function($scope,$rootScope,userProfile,$state,commonService,$modal){

$scope.updatepicmsg=true;
if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
$scope.userinfo =$rootScope.userinfo;
var profile = userProfile.loadProfileData($scope.userinfo.ActiveUserData.roleMappingId.$oid);
		profile.then(function (data) {
			$scope.profileData = angular.fromJson(JSON.parse(data.data));
			$rootScope.userinfo.profileData=$scope.profileData;
			if(!$scope.profileData.profileImg){
				$scope.profileData.profileImg="default.jpg";
			}
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

$scope.updateProfilePicture=function(){
	$modal({ scope: $scope,
              template: 'angularModules/login/partials/Partial-updateUserProfilePicture.html',
              placement:'center',
              show: true});	
		
};

var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

}]);
