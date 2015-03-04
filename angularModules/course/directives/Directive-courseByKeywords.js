angular.module('baabtra').directive('courseByKeywords',['PublishedCourse','$state', function(PublishedCourse,$state) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			keywords:"=",
			skipThis:"="
		},
		templateUrl: 'angularModules/course/directives/Directive-courseByKeywords.html',
		link: function(scope, element, attrs, fn) {
			scope.companyId = scope.keywords.companyId.$oid;
			scope.relatedCourses = [];
			scope.relatedInfo = "";
			angular.forEach(scope.keywords.Technologies,function(Technology){
			
			scope.relatedInfo = scope.relatedInfo + Technology.text + ',';

			var relatedCourseResponse = PublishedCourse.loadPublishedCourses(scope,Technology.text,'',"Technologies");
			relatedCourseResponse.then(function(data){
				var relatedCourses = angular.fromJson(JSON.parse(data.data)).courses;
				if(scope.skipThis){
					angular.forEach(relatedCourses, function(relatedCourse){
						if(!angular.equals(relatedCourse._id.$oid,scope.keywords._id.$oid)){
							scope.relatedCourses.push(relatedCourse);
						}
					});
				}
				else{
					scope.relatedCourses = relatedCourses;
				}
			});
		 });

		scope.viewCourseDetails = function(courseId){
			$state.go("home.main.course",{courseId:courseId})
		}

		}//link
	};
}]);
