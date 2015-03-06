angular.module('baabtra').controller('viewCandidateCourseCtrl',
	['$scope','$state',
	function($scope,$state){

		$scope.courseMapping=$state.params.courseMappingId;
		$scope.total=50;
		$scope.obtained=3;
		setInterval(function () {
			if($scope.obtained>=50){
				$scope.obtained=5;
			}
			$scope.obtained+=3;
			$scope.$digest();
		},500);

	}]);