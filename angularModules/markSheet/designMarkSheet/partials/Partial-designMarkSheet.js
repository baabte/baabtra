angular.module('baabtra').controller('DesignmarksheetCtrl',['$modal','$scope', 'commonService', '$rootScope','PublishedCourse',function($modal,$scope, commonService, $rootScope,PublishedCourse){

	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
	}
	if($rootScope.loggedIn == false){
		$state.go('login');
	}
	$scope.rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	$scope.data={};
	$scope.data.pageNumber=1;
	$scope.data.searchText='';

	$scope.gotPublishedCourses=function (response) {
		$scope.data.courses=angular.fromJson(JSON.parse(response.data));
	};

	var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,'','','','');
	    gotPublishedCourses.then(function (response) {
	    	$scope.gotPublishedCourses(response);
	    });

$scope.pageNavigation=function(type){//event  for showing next/prev 12 items

	if(angular.equals(type,'next')){
		$scope.data.pageNumber+=1;

	}
	else if(angular.equals(type,'prev')){
		$scope.data.pageNumber=$scope.data.pageNumber==1?1:$scope.data.pageNumber-1;
	}

	  var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,$scope.data.courses.lastId.$oid,type,$scope.data.courses.firstId.$oid);
	      gotPublishedCourses.then(function (response) {
	    	$scope.gotPublishedCourses(response);
	    });
};
var searchKeyTimeout;
$scope.searchKeyChanged = function () {
	$scope.data.pageNumber=1;	
	if(searchKeyTimeout){
		clearTimeout(searchKeyTimeout);
	}

		searchKeyTimeout = setTimeout(function () {
			var gotPublishedCourses = PublishedCourse.loadPublishedCoursesWithPromise($scope.companyId,$scope.data.searchText,'','','');
		      gotPublishedCourses.then(function (response) {
		    	$scope.gotPublishedCourses(response);
		    });		
		},600);	

	

};

$scope.data.loaderProgressTab=0;
$scope.progressStart=function () {

		$scope.data.loaderProgressTab=$scope.data.loaderProgressTab==4?1:$scope.data.loaderProgressTab*1+1;
		$scope.$digest();


};
	var interval=setInterval(function() {
		$scope.progressStart();
	},700);

$scope.openPopup = function (course) {
	console.log(course._id.$oid);


	// $scope.data.selectedCourse=course;
	//'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html'
    var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
    //loader.destroy();
    // $modal({scope: $scope, template: 'angularModules/markSheet/designMarkSheet/popup/Popup-DesignMarkSheet.html', show: true,placement:'center'});

}

}]);