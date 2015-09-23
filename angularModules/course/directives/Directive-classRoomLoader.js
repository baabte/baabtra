angular.module('baabtra').directive('classRoomLoader',['$rootScope', 'commonService', '$state', 'viewCourse', function($rootScope, commonService, $state, viewCourse) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: '=',
			courseName:'=?',
			onChange:'&'
		},
		templateUrl: 'angularModules/course/directives/Directive-classRoomLoader.html',
		link: function(scope, element, attrs, fn) {

			/*login detils start*/
			if(!$rootScope.userinfo){
				commonService.GetUserCredentials(scope);
				$rootScope.hide_when_root_empty = false;
				return;
			}

			if(angular.equals($rootScope.loggedIn,false)){
				$state.go('login');
			}

			var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
			var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
			var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
			/*login detils ends*/

			scope.classRoomLoaderObj = {};
			var courseCondition = {companyId:companyId, activeFlag:1, status:true};
			var loadClassRoomDetails = viewCourse.loadClassRoomDetails(courseCondition);
			loadClassRoomDetails.then(function(response){
				var result = angular.fromJson(JSON.parse(response.data));
				scope.classRoomLoaderObj.classRoomList = result;
			});

			scope.courseChanged = function(courseId){
				console.log(scope);
				// if((typeof scope.onChange) == "function"){
				// 	scope.onChange()(courseId);
				// }

				if(!angular.equals(scope.courseName, undefined)){
					for(var classRoom in scope.classRoomLoaderObj.classRoomList){
						if(angular.equals(scope.classRoomLoaderObj.classRoomList[classRoom]._id.$oid, courseId)){
							scope.courseName = scope.classRoomLoaderObj.classRoomList[classRoom].courseName;
						}
					}
				}
			};

		}
	};
}]);
