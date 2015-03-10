angular.module('baabtra').service('commonSrv',['$http','$upload','bbConfig',function commonSrv($http,$upload,bbConfig) {
this.FnLoadGlobalValues=function(key)
      {
        var promise = $http({
          method: 'post',
          url: bbConfig.BWS+'LoadGlobalValues/',
          data:{"key":key},
          contentType:'application/json; charset=UTF-8',
        });
        return promise;
      };

  this.fnUploadProfilePic = function (path, urmId){
    var promise = $http({
      url: bbConfig.BWS+'UploadProfilePic/',
      data: {"path":path, "urmId":urmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   };

   this.fnSaveAppSettings = function(companyId, appSettings, rmId){
    var promise = $http({
      url: bbConfig.BWS+'SaveAppSettings/',
      data: {"companyId":companyId ,"appSettings":appSettings, "rmId":rmId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   }

   this.fnLoadMentees = function(companyId){
    var promise = $http({
      url: bbConfig.BWS+'loadMentees/',
      data: {"companyId":companyId},
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    });
    return promise;
   }

   this.fnFileUpload = function (fileToBeUpload, pathToBeSave){ // functon that call web service to add a comapny role
    var promise = $upload.upload({
           url: bbConfig.BWS+'CourseFileUpload/',
           file: fileToBeUpload,
           data: {'pathToBeSave':pathToBeSave},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           })
    return promise;
   };

   this.fnRemoveFileFromServer = function (pathToBeDelete){ // functon that call web service to add a comapny role
    var promise = $upload.upload({
           url: bbConfig.BWS+'fileRemove/',
           data: {'pathToBeDelete':pathToBeDelete},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           })
    return promise;
    };
    
   this.getResultFromUrl = function (url){
    var promise = $http({
      url:url,
      method: "GET",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
      crossDomain : true,
    });
    return promise;
   };

      // this.FnLoadExistingResellerUserData=function($scope, userEmail)
      // {
      //   $http({
      //     method: 'post',
      //     url: bbConfig.BWS+'LoadExistingUserData/',
      //     data:{"userEmail":userEmail},
      //     contentType:'application/json; charset=UTF-8',
      //   }).
      //   success(function(data, status, headers, config) {//success respond from server
      //       //$scope.globalValues=angular.fromJson(JSON.parse(data));//Converting the result to json object
      //     }).
      //     error(function(data, status, headers, config) {
      //       // called asynchronously if an error occurs
      //       // or server returns response with an error status. 
      //     });
      // };
}]);