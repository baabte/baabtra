angular.module('baabtra').directive('batchMenteeList', function() {
	return {
		restrict: 'E',
		replace: true,
		required: 'ngModel',
		scope: {
			userList:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-batchMenteeList.html',
		link: function(scope, element, attrs, fn) {
			console.log(scope.userList);

		}
	};
});
