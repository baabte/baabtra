angular.module('baabtra').directive('roleUserLoader', ['$rootScope', 'commonSrv', function ($rootScope, commonSrv) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"=",
			roleId:"=",
			selectionType:"=",
			placeholderValue:"@"
		},
		templateUrl: 'angularModules/common/directives/Directive-roleUserLoader.html',
		link: function(scope, element, attrs, fn) {
			
			var companyId = "54978cc57525614f6e3e710b";
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			  
			}
			
			if(angular.equals(scope.usersUnderRoles,undefined)){
				var roleUserResponse = commonSrv.fnLoadUsersUnderRole("54e1780103e38dc70f5efb96",companyId);
				roleUserResponse.then(function(response){
					var usersUnderRoles = angular.fromJson(JSON.parse(response.data));
					angular.forEach(usersUnderRoles, function(user){

						user.Name = user.profile.firstName + ' ' + user.profile.lastName;
						delete user.profile;
					});
					scope.usersUnderRoles = angular.copy(usersUnderRoles);
				});
			}
			scope.onItemClick = function(item,index){
				if(angular.equals(scope.ngModel,undefined)){
					scope.ngModel = [];
				}
				if(angular.equals(scope.selectionType,1)){
					scope.ngModel = [];
					scope.ngModel.push({ticked:item.ticked,roleMappingId:item.roleMappingId.$oid,Name:item.Name});
				}
				else{
					if(item != null){

						if(item.ticked){
							scope.ngModel.push({ticked:item.ticked,roleMappingId:item.roleMappingId.$oid,Name:item.Name});
						}
						else{
							scope.ngModel.splice(scope.ngModel.indexOf(item.Name),1);
						}
					}
					
				}
			};
		}
	};
}]);
