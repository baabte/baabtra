angular.module('baabtra').directive('collegeLoader',['collegeServices','$rootScope', function(collegeServices,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"=",
			companyId:"="
		},
		templateUrl: 'angularModules/Registration/directives/Directive-collegeLoader.html',
		link: function(scope, element, attrs, fn) {
		console.log(scope.ngModel);
		console.log(scope.companyId);

		var companyid = scope.companyId;

        var fngetCollageList = collegeServices.fngetCollageList(companyid);
        fngetCollageList.then(function(response){
		scope.lists = angular.fromJson(JSON.parse(response.data));        
		});//service call for college fetch

        scope.selectCollege=function(College){
        	if(!angular.equals(College,null)){
        		scope.Course='';
		        scope.courses=College.Courses;
		        scope.ngModel.collegeId=College._id.$oid;
		        scope.ngModel.CollegeName=scope.College.companyName;
        	}else{
        		delete scope.ngModel.collegeId;
		        delete scope.ngModel.CollegeName;
		        delete scope.ngModel.course;
        		scope.Course='';
        		scope.courses={};
        	}
		
        
		}; //selectCollege end

		scope.selectCourse=function(Course){
			if(!angular.equals(Course,null)){
		 		scope.ngModel.course=Course.text;
			}else{
				delete scope.ngModel.course;
        		scope.Course='';
        	}
		

		};//selectCourse funtion end

	}//link end
}; //return end
}]); //directive end