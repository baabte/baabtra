angular.module('baabtra').service('userBillingConfigService',['$http','bbConfig',function userBillingConfigService($http,bbConfig) {

	this.FnGetUserPlan=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'GetUserPlan/',
           data: angular.toJson($scope.companyId),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.userplan=angular.fromJson(JSON.parse(data));
                result='success';
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetUserPlanCallBack(result);
             });  
      return result;

   };

   this.FnGetPlan=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'GetPlans/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.planlist=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnGetPlanCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetPlanCallBack(result);
             });  
      return result;

   };


   this.FnChangeUserPlan=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'ChangeUserPlan/',
           data: angular.toJson($scope.userplan),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
            
                result='success';
                $scope.fnChangeUserPlanCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnChangeUserPlanCallBack(result);
             });  
      return result;

   };

   this.FnGetFeature=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'GetFeatures/',
           data: angular.toJson($scope.companyId),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.featurelist=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnGetFeatureCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetFeatureCallBack(result);
             });  
      return result;

   };

   this.FnAddFeature=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'AddFeature/',
           data: angular.toJson($scope.AddFeature),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {            
                result='success';
                $scope.fnAddFeatureCallBack(result);              
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnAddFeatureCallBack(result);
             });  
      return result;

   };



this.FnDeleteFeature=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'DeleteFeature/',
           data: angular.toJson($scope.DeleteFeature),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {            
                result='success';
                $scope.fnDeleteFeatureCallBack(result);              
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnDeleteFeatureCallBack(result);
             });  
      return result;

   };



   this.FnEditPricing=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'EditPricing/',
           data: angular.toJson($scope.editPrice),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {            
                result='success';
                $scope.fnEditPricingCallBack(result);              
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnEditPricingCallBack(result);
             });  
      return result;

   };

   this.FnEditBilling=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'EditBilling/',
           data: angular.toJson($scope.editBilling),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {            
                result='success';
                $scope.fnEditBillingCallBack(result);              
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnEditBillingCallBack(result);
             });  
      return result;

   };

}]);