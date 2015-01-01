angular.module('baabtra').service('addCourseElementService',['$http','bbConfig',function addCourseElementService($http,bbConfig) {

	




  this.FnGetExitCriteria=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'GetExitCriteria/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
              $scope.exitcriterialist=angular.fromJson(JSON.parse(data));
                result='success';
               
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetExitCriteriaCallBack(result);
             });  
      return result;

   };

	this.FnSaveCourseElementForm=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'SaveCourseElementForm/',
           data: angular.toJson($scope.courseElement),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                result='success';
                $scope.fnSaveCourseElementFormCallBack(result);                
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSaveCourseElementFormCallBack(result);
             });  
      return result;

   };




}]);