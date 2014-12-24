angular.module('baabtra').service('userFeatureConfigService',['$http','bbConfig' ,function userFeatureConfigService($http,bbConfig) {

	this.FnGetFeatures=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'GetFeaturesConfig/',
           data: angular.toJson($scope.featuresConfig),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.featurelist=angular.fromJson(JSON.parse(data));
                result='success';
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetUserPlanCallBack(result);
             });  
      return result;

   };



}]);