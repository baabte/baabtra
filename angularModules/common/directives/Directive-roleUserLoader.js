angular.module('baabtra').directive('roleUserLoader', ['$rootScope', 'commonSrv', function ($rootScope, commonSrv) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"=",
			roleId:"=",
			selectionType:"="
		},
		templateUrl: 'angularModules/common/directives/Directive-roleUserLoader.html',
		link: function(scope, element, attrs, fn) {
			
			if(angular.equals(scope.selectionType,1)){
				console.log(scope.selectionType);
				scope.selectionType = "single";
			};
			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
			var roleUserResponse = commonSrv.fnLoadUsersUnderRole("54e1780103e38dc70f5efb96",companyId);
			roleUserResponse.then(function(response){
				var usersUnderRoles = angular.fromJson(JSON.parse(response.data));
				angular.forEach(usersUnderRoles, function(user){

					user.Name = user.profile.firstName + ' ' + user.profile.lastName;
					delete user.profile;
				});
				scope.usersUnderRoles = angular.copy(usersUnderRoles);
			});

			scope.onItemClick = function(item){
				if(angular.equals(scope.ngModel,undefined)){
					scope.ngModel = [];
				}
				scope.ngModel.push({ticked:item.ticked,roleMappingId:item.roleMappingId,Name:item.Name});
			};
		}
	};
}]);
