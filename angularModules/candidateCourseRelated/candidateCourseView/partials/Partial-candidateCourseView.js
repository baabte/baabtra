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

		$scope.PrevObj={
                    "index" : 0,
                    "elements" : [ 
                        {
                            "type" : "cours-element-title",
                            "value" : "doc"
                        }, 
                        {
                            "url" : "http://server.mb-test.in/files/courseDocs/alldbfunctions.js",
                            "fileType" : "application/javascript",
                            "type" : "doc-viewer",
                            "value" : "http://docs.google.com/gview?url=http://server.mb-test.in/files/courseDocs/alldbfunctions.js&embedded=true"
                        }
                    ],
                    "Name" : "Document",
                    "iconColor" : "#ffffff",
                    "tlPointInMinute" : 7201,
                    "Icon" : "fa-file-text-o document",
                    "order" : 1,
                    "iconBackground" : "rgb(0, 128, 0)"
                };
                

	}]);