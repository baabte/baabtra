angular.module('baabtra').service('bulkEnrollment',['bbConfig','$upload','$http',function(bbConfig,$upload,$http) {
	//service function for uploading the doc for bulk enrolment
	this.fnSaveBulkEnroll=function($scope){

		var promise= $upload.upload({
				url: bbConfig.BWS+'fnBulkEnroll/',
				file: $scope.excelDoc,
				data:  $scope.userRegister,
				method: 'POST',
				withCredentials: false,
				contentType:'application/json',
				dataType:'json',

			}).
			success(function( data, status, headers, config) {
				return data;
			}).
			error(function(data, status, headers, config) {
				return data;     
			}).
			progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			});


		return promise;
	};
	this.FnLoadReport=function($scope){
    
    var result;
      var promise=$http({
           url: bbConfig.BWS+'fnLoadUserReport/',
           data: {companyId:$scope.companyId},
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             	$scope.data=angular.fromJson(JSON.parse(data)); //data from database
                //console.log($scope.data.data);
                //return promise;
               
              }).
              error(function(data, status, headers, config) {
                result='error';
             });  
      return promise;
   };
}]);


