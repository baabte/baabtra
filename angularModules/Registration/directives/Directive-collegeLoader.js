angular.module('baabtra').directive('collegeLoader',['collegeServices','$rootScope', function(collegeServices,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			outModel:"="
		},
		templateUrl: 'angularModules/Registration/directives/Directive-collegeLoader.html',
		link: function(scope, element, attrs, fn) {

		var companyid = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

        var fngetCollageList = collegeServices.fngetCollageList(companyid);
        fngetCollageList.then(function(response){
		scope.lists = angular.fromJson(JSON.parse(response.data));        
		});//service call for college fetch

        scope.selectcourse=function(College){
        scope.Course='';
        scope.courses=College.Courses;
        scope.outModel={};
        scope.outModel={collegeId:College._id.$oid,"CollegeName":scope.College.companyName};
		}; //select course end

		scope.select=function(Course){
		 scope.outModel.course=scope.Course.text;
		};//select funtion end

	}//link end
}; //return end
}]); //directive end