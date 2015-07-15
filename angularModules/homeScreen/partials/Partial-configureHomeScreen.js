angular.module('baabtra').controller('ConfigurehomescreenCtrl',['commonService','$scope','$rootScope','homeScreenSrv','$modal','$alert',function(commonService,$scope,$rootScope,homeScreenSrv,$modal,$alert){


	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}

	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;

$scope.data={};

$scope.data.companyTypes=[
							{type:"Company",code:'CM',icon:'mdi-social-domain'},
							{type:"Training institute",code:'TI',icon:'mdi-maps-local-library'},
							{type:"School / College",code:'SC',icon:'mdi-social-school'}
						 ];
//function for loading current menus
$scope.loadHomeScreen = function (code) {

	// console.log(code);
	$scope.data.selectedType = code;
	var gotMenus = homeScreenSrv.getHomeScreenMenu(code);
	    gotMenus.then(function(response){
	    	var resData = angular.fromJson(JSON.parse(response.data));
	    	
	    	if(resData){
	    		$scope.data.menuListOfSelectedType = resData;	
	    	}
	    	else{
	    		$scope.data.menuListOfSelectedType = {};
	    	}
	    	console.log($scope.data.menuListOfSelectedType);
	    	
	    });
};


//function for loading popup for creating new menu entry
$scope.addMenu = function () {
	$modal({scope: $scope, template: 'angularModules/homeScreen/popup/popup-add-menu.html', show: true,placement:'center'});
};

$scope.saveMenu = function (hide) {
	// $scope.data.menu._id=$scope.data.selectedType;
	if(angular.equals($scope.data.menuListOfSelectedType.menus,undefined)){
		$scope.data.menuListOfSelectedType.menus = [];
	}
	if(angular.equals($scope.data.menuListOfSelectedType._id,undefined)){
		$scope.data.menuListOfSelectedType._id=$scope.data.selectedType;
	}
	$scope.data.menuListOfSelectedType.menus.push($scope.data.menu);
	var savedMenu = homeScreenSrv.saveMenu($scope.data.menuListOfSelectedType);
		savedMenu.then(function(response) {
			hide();
			delete $scope.data.menu;
		});
		savedMenu.error(function(err) {
			// hide();
			$alert({title: 'Error..!', content: 'Please try again.', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'danger', show: true});

		});
}

}]);