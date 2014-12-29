angular.module('baabtra').controller('AddcourseCtrl',['$scope','addCourseService',function($scope,addCourseService){
///////////////
$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
$scope.technologies={};//object to store selected technologies
$scope.technologies.values = [];//object to store selected technologies
addCourseService.loadTechnologies($scope);
//////////////

	
	


}]);