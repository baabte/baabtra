angular.module('baabtra').directive('courseElementBubble',['$dropdown','$rootScope', 'bbConfig', function($dropdown,$rootScope, bbConfig) {
	return {
		restrict: 'E',
		templateUrl: 'angularModules/courseElements/directives/Directive-courseElementBubble.html',
		link: function(scope, element, attrs, fn) {
			// console.log(scope.timeLineView[attrs['tlPoint']]);
			if(!angular.equals(attrs['tlPoint'],undefined)){
				scope.thisPoint=attrs['tlPoint'];				
			}

			var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
			// console.log(scope.elementOrderNewFormat);
			// console.log(scope.timeLineView);
			
			scope.status = true;
			scope.showBubble = 2;
			scope.viewAllBubble = function(length,elementName){
				scope.status = false;
				if(!angular.equals(elementName,"")){
					scope.status = true;
				}
			}
			var cantAccess = [bbConfig.MURID, bbConfig.PUSRID];
			if(angular.equals(cantAccess.indexOf(roleId),- 1)){
				scope.dropdown = [{text:'<i class=\"fa fa-fw fa-edit\"></i>&nbsp;Edit', click:"editCourseElement()"},
								  {text:'<i class=\"fa fa-fw fa-trash\"></i>&nbsp;Remove', click:"removeCourseElement($event)"}];
				//{text:'<i class=\"fa fa-fw fa-sort\"></i>&nbsp;Move', click:"moveCourseElement(element)"}
				scope.moveDropdown =[{text:'<i class=\"fa fa-fw fa-level-up\"></i>&nbsp;Above', click:"moveTo(element,'Above')"},
								  	{text:'<i class=\"fa fa-fw  fa-level-down\"></i>&nbsp;Below', click:"moveTo(element,'Below')"}]
			}
		 }
	};
}]);
