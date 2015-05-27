angular.module('baabtra').controller('CompanycourselistCtrl',['$scope', 'companyCourseList', '$state', '$modal', function ($scope, companyCourseList, $state, $modal){

	$scope.data = {};
	var courseResponse = companyCourseList.loadCourseToWebSite($state.params.companyId);
	courseResponse.then(function(response){
		$scope.data.result = angular.fromJson(JSON.parse(response.data));
		$scope.data.courseList = {};
		angular.forEach($scope.data.result, function(course){
			if(angular.equals($scope.data.courseList[course.type], undefined)){
				$scope.data.courseList[course.type] = [];
			}
			$scope.data.courseList[course.type].push(course);
		})
		console.log($scope.data.courseList);

		$scope.onClickTakeCourse = function(courseId){
			$modal({scope: $scope, placement:'center',  template: 'angularModules/publicAPIs/course/partials/Popup-courseRegistration.html', show: true});
		};
	});




}]);