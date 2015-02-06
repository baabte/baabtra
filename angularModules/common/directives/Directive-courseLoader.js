angular.module('baabtra').directive('courseLoader',['addCourseService','$rootScope', function(addCourseService,$rootScope) {
	return {
		restrict: 'E',
		require:["ng-model"],
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-courseLoader.html',
		link: function($scope, element, attrs, fn) {

		//------------------------------------------
		



			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			$scope.onCourseSelectionChanged = function(course){
				if(!angular.equals(course,"")){
					if(!angular.equals(course._id.$oid,undefined)){
					course._id=course._id.$oid;
					}
				}
				// console.log(course);
				$scope.ngModel=course;

			};
			
			//service call for course fetch
			var courseFetchData={fkcompanyId:companyId};

			var FetchCourseListCallBack= addCourseService.fnFetchCourseList(courseFetchData);

			FetchCourseListCallBack.then(function(data){

			 $scope.courselist=angular.fromJson(JSON.parse(data.data));
			// console.log($scope.courselist);        

			});
        

		}
	};
}]);