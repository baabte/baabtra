angular.module('baabtra').directive('youtubeVideo',['$sce', function($sce) {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			url:"@data"
		},
		templateUrl: 'angularModules/courseElementFields/youtubeVideo/directives/Directive-youtubeVideo.html',
		link: function(scope, element, attrs, fn) {
				scope.$watch('url',function () {
				if(!angular.equals(scope.url,undefined)){
					if(scope.url.indexOf("v=") !== -1){
						var videoUrl=scope.url.split('v=')[1];
						if(videoUrl.indexOf("&") !== -1){
							videoUrl=videoUrl.split('&')[0];
						}
						scope.embedUrl='//www.youtube.com/embed/'+videoUrl;
					}else{
						scope.embedUrl='\/\/'+scope.url;
					}
				}
			});
			scope.trustSrc = function(src) {
    				return $sce.trustAsResourceUrl(src);
  			};
		}
	};
}]);
