angular.module('baabtra').controller('CourseCtrl',['$rootScope', '$scope', '$state', '$alert', 'commonService', 'viewCourse', function($rootScope, $scope, $state, $alert, commonService, viewCourse){

	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty = false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.courseObj = {};
	$scope.courseObj.newCourse = {};
	$scope.courseObj.newCourse.activeFlag = 1;

	$scope.courseObj.newBatch = {};
	$scope.courseObj.initialBatch = false;
	$scope.courseObj.mode = $state.params.key;

	if(angular.equals($scope.courseObj.mode, 'view')){
		var courseCondition = {companyId:companyId, activeFlag:1};
		var loadClassRoomDetails = viewCourse.loadClassRoomDetails(courseCondition);
		loadClassRoomDetails.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.courseObj.courseList = result;
		});
	}
	else if(angular.equals($scope.courseObj.mode, 'update')){
		
		var courseCondition = {companyId:companyId, activeFlag:1,_id:$state.params._id};
		var loadClassRoomDetails = viewCourse.loadClassRoomDetails(courseCondition);
		loadClassRoomDetails.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.courseObj.newCourse = result;
		});
	}

	// function for save course
	$scope.saveCourse = function(course, callback){
		
		if(course._id){
			course._id = course._id.$oid;
		}

		course.crmId = course.crmId?course.crmId.$oid:rm_id;
		course.urmId = rm_id;
		course.companyId = course.companyId?course.companyId.$oid:companyId;
		var saveCourse = viewCourse.saveCourse(course);
		saveCourse.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			if(callback){
				callback();
			}
			else{
				$scope.courseObj.newCourse = result.course;
				$alert({title: result.type+"!", content: "Course "+result.type+" Successfully", placement: 'top-right',duration:2, type: "success"});
			}
			
		});

	};//saveCourse - end

	$scope.deleteCourse = function(course, index){
		course.activeFlag = 0;
		$scope.saveCourse(course,function(){
			$scope.courseObj.courseList.splice(index, 1);
			$alert({title: "Deleted!", content: "Course Deleted Successfully", placement: 'top-right',duration:2, type: "success"});
		});
	};

}]);