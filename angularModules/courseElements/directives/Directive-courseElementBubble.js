angular.module('baabtra').directive('courseElementBubble',['$dropdown','$rootScope', function($dropdown,$rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'angularModules/courseElements/directives/Directive-courseElementBubble.html',
		link: function(scope, element, attrs, fn) {
			// console.log(scope.timeLineView[attrs['tlPoint']]);
			if(!angular.equals(attrs['tlPoint'],undefined)){
				scope.thisPoint=attrs['tlPoint'];				
			}
			

			scope.status = true;
			scope.showBubble = 2;
			scope.viewAllBubble = function(length,elementName){
				scope.status = false;
				if(!angular.equals(elementName,"")){
					scope.status = true;
				}
			}
			if(angular.equals($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId,2)){
				scope.dropdown = [{text:'<i class=\"fa fa-fw fa-edit\"></i>&nbsp;Edit', click:"editCourseElement()"},{text:'<i class=\"fa fa-fw fa-trash\"></i>&nbsp;Remove', click:"removeCourseElement($event)"}];
			}
		 }
	};
}]);
