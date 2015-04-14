angular.module('baabtra').controller('CompanycourselistCtrl',['$scope', 'companyCourseList', '$state', function ($scope, companyCourseList, $state){

	$scope.data = {};
	var courseResponse = companyCourseList.loadCourseToWebSite($state.params.companyId);
	courseResponse.then(function(response){
		$scope.data.courseList = angular.fromJson(JSON.parse(response.data));
		console.log($scope.data.courseList);
	});


}]);