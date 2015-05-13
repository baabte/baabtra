angular.module('baabtra').controller('DesignmarksheetCtrl',['$modal','$scope', 'commonService', '$rootScope','PublishedCourse','markSheetService',function($modal,$scope, commonService, $rootScope,PublishedCourse,markSheetService){

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
    var loader=$modal({scope: $scope,backdrop:'static', template: 'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html', show: true,placement:'center'});
	var gotSyllabus=markSheetService.getCourseSyllabus(course._id.$oid);
		gotSyllabus.then(function (response) {
			// console.log(JSON.parse(response.data));
			$scope.data.selectedCourse={};
			$scope.data.selectedCourse=angular.fromJson(JSON.parse(response.data));
			$scope.data.selectedCourse.courseId=course._id.$oid;
			loader.destroy();
			$modal({scope: $scope, template: 'angularModules/markSheet/designMarkSheet/popup/Popup-DesignMarkSheet.html', show: true,placement:'center'});
		});


	//'angularModules/markSheet/designMarkSheet/popup/Popup-loadCourseData.html'
    // $modal({scope: $scope, template: 'angularModules/markSheet/designMarkSheet/popup/Popup-DesignMarkSheet.html', show: true,placement:'center'});

};
// $scope.selectedNode={};
$scope.$watch('data.selectedNode',function () {
	console.log($scope.data.selectedNode);
	if(angular.equals($scope.selectedNode,undefined)){
		return;
	}
	$scope.elementsOfSelectedNode=[];
	if(!angular.equals($scope.selectedNode.element,undefined)){

		for(var key in $scope.selectedNode.element){
			var elemNameArray=$scope.selectedNode.element[key].split('.');
			var elem=$scope.data.selectedCourse.courseTimeline;
			for(index in elemNameArray){
				elem=elem[elemNameArray[index]];
			}
			console.log(elem);

		}
	}
},true);

}]);