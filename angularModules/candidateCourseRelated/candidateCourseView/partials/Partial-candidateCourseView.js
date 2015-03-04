angular.module('baabtra').controller('viewCandidateCourseCtrl',
	['$scope','$state',
	function($scope,$state){

		$scope.courseMapping=$state.params.courseMappingId;

	}]);