angular.module('baabtra').service('formCustomizerService',['$http','$upload','bbConfig',function formCustomizerService($http,$upload,bbConfig) {




	//service function to register a user 
this.FnSaveCustomForm=function($scope){
    var result;
      $http({
           url: bbConfig.BWS+'SaveCustomForm/',
           data: angular.toJson($scope.customForm),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.result=angular.fromJson(JSON.parse(data));
                result='success';
                $scope.fnSaveCustomFormCallBack(result);
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnSaveCustomFormCallBack(result);
             });  
      return result;
   };


   //service function to fetch all details of an exsisting user 
   this.FnFetchCustomForm=function(formFetchData){
   	console.log(formFetchData);
    var result;
      var promise=$http({
           url: bbConfig.BWS+'FetchCustomForm/',
           data: angular.toJson(formFetchData),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             	return data;
               
              }).
              error(function(data, status, headers, config) {
                result='error';
             });

      return promise;	
   };

					
	
}]);