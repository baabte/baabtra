angular.module('baabtra').directive('courseStreamline', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			syncData:'='
		},
		templateUrl: 'angularModules/courseStreamline/directives/Directive-courseStreamline.html',
		link: function(scope, element, attrs, fn) {

			scope.ddlViewIn = {id: "1",name:"Days",mFactor:(1/1440),show:true};
			scope.ddlView 	= [{id: "1",name:"Days",mFactor:(1/1440),show:true},
                     	   	   {id: "2",name: "Months",mFactor:(1/43200),show:false},
                           	   {id: "3",name: "Hours",mFactor:1/60,show:true},
                           	   {id: "4",name: "Minutes",mFactor:1,show:true}];


			scope.$watch('syncData.courseTimeline', function(){
				if(!angular.equals(scope.syncData.courseTimeline, undefined)){
					console.log(scope.syncData.courseTimeline);
				}
			});
		}
	};
});
