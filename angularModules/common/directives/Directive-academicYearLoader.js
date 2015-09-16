angular.module('baabtra').directive('academicYearLoader', ['$rootScope', '$state', 'commonService', 'academicYear', function($rootScope, $state, commonService, academicYear) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel: '=',
			yearName:'=?'
		},
		templateUrl: 'angularModules/common/directives/Directive-academicYearLoader.html',
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

		scope.academicYearLoaderObj = {};
		// service call for load academicYear
		var loadAcademicYear = academicYear.loadAcademicYear({companyId:companyId, type:"all"});
		loadAcademicYear.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			scope.academicYearLoaderObj.AcademicYearList = result.academicYear;
		});

		scope.academicYearChanged = function(yearId){

			if(!angular.equals(scope.yearName, undefined)){
				for(var academicYear in scope.academicYearLoaderObj.AcademicYearList){
					if(angular.equals(scope.academicYearLoaderObj.AcademicYearList[academicYear]._id.$oid, yearId)){
						scope.yearName = scope.academicYearLoaderObj.AcademicYearList[academicYear].academicYearName;
					}
				}
			}
		};

		}
	};

}]);
