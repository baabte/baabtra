angular.module('baabtra').directive('batchLoader',['addBatches','$rootScope', function (addBatches,$rootScope) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"=",
			coursedata:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-batchLoader.html',
		link: function(scope, element, attrs, fn) {			
			var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}
   //function for loading Batches

	scope.$watch('coursedata', function(){//adding watch to couse id 
				
         if(!angular.equals(scope.coursedata,undefined)){
         	 var promise = addBatches.loadCourseRelatedBatches(companyId,scope.coursedata)
      		promise.then(function(response){
      			//console.log(angular.fromJson(JSON.parse(response.data)));
        	var batchElements = angular.fromJson(JSON.parse(response.data)).result;
      		angular.forEach(batchElements, function(batch){
      			//console.log(batch);
      			batch.Name = batch.batchName;
      			batch._id = batch._id.$oid;
      		})
      		scope.batchElements = batchElements;
      	   });  
         }
     }, true);   
 	  
	  }	
	};
}]);
