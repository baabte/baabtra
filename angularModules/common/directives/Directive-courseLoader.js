angular.module('baabtra').directive('courseLoader',['addCourseService','$rootScope', function(addCourseService,$rootScope) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-courseLoader.html',
		link: function(scope, element, attrs, ctrls) {



			
		//------------------------------------------

		var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
					
		//service call for course fetch
			var courseFetchData={fkcompanyId:companyId};

			var FetchCourseListCallBack= addCourseService.fnFetchCourseList(courseFetchData);

			FetchCourseListCallBack.then(function(data){

			 scope.courselist=angular.fromJson(JSON.parse(data.data));
			// console.log($scope.courselist);        

			});

			// ctrls.$setValidity('courseLoader',false);


			scope.onCourseSelectionChanged = function(course){
				if(angular.equals(course,null)){
					scope.ngModel=course;
					ctrls.$setValidity('courseLoader',false);

									
				}
				if(!angular.equals(course,null)){
					if(!angular.equals(course._id.$oid,undefined)){
					course._id=course._id.$oid;
					}
					scope.ngModel=course;
					ctrls.$setValidity('courseLoader',true);
					
				}
				
			};
        

		}
	};
}]);