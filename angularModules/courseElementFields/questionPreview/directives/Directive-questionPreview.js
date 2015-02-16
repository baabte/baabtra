angular.module('baabtra').directive('questionPreview', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
         previewData:'='
		},
		templateUrl: 'angularModules/courseElementFields/questionPreview/directives/Directive-questionPreview.html',
		link: function(scope, element, attrs, fn) {
          
          
           console.log(scope.previewData);
            	//angular.forEach(scope.previewData,function(data){
                  //console.log(data.answerType);
                  //scope.answerType=data.answerType;
            	//});
		}
	};
});
