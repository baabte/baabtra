angular.module('baabtra').controller('ViewcourseCtrl',['$scope','$stateParams','viewCourse',function($scope,$stateParams,viewCourse){

$scope.companyId=$stateParams.id;
var fnViewCourseData=viewCourse.loadCourseData($scope);
fnViewCourseData.then(function(data){
	$scope.coursePreviewObject={};
	$scope.course=angular.fromJson(JSON.parse(data.data));
});


}]);