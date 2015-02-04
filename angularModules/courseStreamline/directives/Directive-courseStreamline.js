angular.module('baabtra').directive('courseStreamline', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			previewData:'='
		},
		templateUrl: 'angularModules/courseStreamline/directives/Directive-courseStreamline.html',
		link: function(scope, element, attrs, fn) {
			scope.ddlViewIn = {id: "3",name:"Week(s)",mFactor:(1/10080),show:true};
			scope.ddlView 	= [{id: "1",name: "Year(s)",mFactor:(1/525600),show:false},
							   {id: "2",name:"Month(s)",mFactor:(1/43200),show:true},
							   {id: "3",name:"Week(s)",mFactor:(1/10080),show:true},
							   {id: "4",name:"Day(s)",mFactor:(1/1440),show:true},
                           	   {id: "5",name: "Hour(s)",mFactor:1/60,show:true},
                           	   {id: "6",name: "Minute(s)",mFactor:1,show:true}];
		}
	};
});
