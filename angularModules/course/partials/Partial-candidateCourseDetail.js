
angular.module('baabtra').controller('CandidatecoursedetailCtrl',['$scope','$stateParams','candidateCourseDetail','$state',function($scope,$stateParams,candidateCourseDetail,$state){

$scope.courseId=$stateParams.courseId;
var courseDatas=candidateCourseDetail.FetchCourseData($scope);
courseDatas.then(function (data) {
		$scope.courseData = angular.fromJson(JSON.parse(data.data));
		console.log($scope.courseData);
});

$scope.navigateToTimeline=function(courseId){
	$state.go('home.main.viewCourse',{courseId:courseId.$oid});
}

}]);