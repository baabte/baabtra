


angular.module('baabtra').service('companyRegistrationService',['$http','$upload','bbConfig',function companyRegistrationService($http,$upload,bbConfig) {

	// service('Companyregistration',['$http','$upload', function Companyregistration($http,$upload) {

 //service function for sector loading
this.FnGetSectors=function($scope){
    
    var result;
      $http({
           url: bbConfig.BWS+'CompanySector/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.sectorlist=angular.fromJson(JSON.parse(data));
                result='success';
               
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnGetSectorsCallBack(result);
             });  
      return result;

   };

//service function for country state district loading
this.FnGetCountryStateDistrict=function($scope){
     
     var result;
      $http({
           url: bbConfig.BWS+'CountryStateDistrict/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.CSDlist=angular.fromJson(JSON.parse(data));
              }).
              error(function(data, status, headers, config) {
                
                result='error';
                $scope.fnGetCountryStateDistrictCallBack(result);
                
             });  
      return result;
 

   };
   //service fuction for username validation
this.fnUserNameValid=function($scope,userNameId){
      
     var result;
      $http({
           url: bbConfig.BWS+'UserNameValid/',
           data: JSON.stringify(userNameId),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
            
                result=angular.fromJson(JSON.parse(data));
                console.log(result);
                $scope.fnUserCheckCallBack(result);
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnUserCheckCallBack(result);

             });  
      return result;

   };


    

//service function for company registration
    this.fnCompanyRegister=function($scope,companyRegData){
      var result;
      var companyLogo=$scope.company.companyLogo;
      var extArr=companyLogo.name.split('.');
      var ext=extArr[extArr.length-1].toUpperCase();
      // console.log(companyRegData);
      if(ext!=='JPG'&&ext!=='JPEG'&&ext!=='PNG'&&ext!=='TIF'&&ext!=='GIF'){
        result='fileErr';
        $scope.fnGetCompanyRegisterDetailsCallBack(result);
        return 0;
      }
       $upload.upload({
           url: bbConfig.BWS+'CompanyRegistration/',
           file: companyLogo,
           data: companyRegData,
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
      
           }).
       success(function( data, status, headers, config) {
                 result='success';
                $scope.fnGetCompanyRegisterDetailsCallBack(result);
              }).
       error(function(data, status, headers, config) {
                 result='error';    
                $scope.fnGetCompanyRegisterDetailsCallBack(result);
             }).
       progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      });


     return result;
   };
//end ofservice function for company registration

}]);