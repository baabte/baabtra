angular.module('baabtra').directive('percentIndicator', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope:{totalValue:"=",obtainValue:"="},
		templateUrl: 'angularModules/common/directives/Directive-percentIndicator.html',
		link: function(scope, element, attrs, ctrls) {

			// console.log(attrs.totalValue);
			// console.log(attrs.obtainValue);
			scope.totalValueData=attrs.totalValue*1;
			scope.obtainValueData=attrs.obtainValue*1;

			scope.percentage=(scope.obtainValueData/scope.totalValueData)*100;
			if(scope.percentage==100){
				scope.textColour='text-success';
				scope.badgeColour='btn-success';
				scope.progressColour='progress-bar progress-bar-success';
			}
			else if(scope.percentage>=80){
				scope.textColour='text-info';
				scope.badgeColour='btn-info';
				scope.progressColour='progress-bar progress-bar-info';				
			}
			else if(scope.percentage>=60){
				scope.textColour='text-primary';
				scope.badgeColour='btn-primary';
				scope.progressColour='progress-bar progress-bar-primary';
			}
			else if(scope.percentage>=30){
				scope.textColour='text-warning';
				scope.badgeColour='btn-warning';
				scope.progressColour='progress-bar progress-bar-warning';
			}
			else if(scope.percentage<30){
				scope.textColour='text-danger';
				scope.badgeColour='btn-danger';
				scope.progressColour='progress-bar progress-bar-danger';
			}
			
		}
	};
});
