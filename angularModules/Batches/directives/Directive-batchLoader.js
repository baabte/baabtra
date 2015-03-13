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
   //console.log(scope.coursedata);
   var joinDate="2015-03-15T18:30:00.000Z";
   coursedata='54fc31f443fa1fe885d3ad61';
	//scope.$watch('coursedata', function(){//adding watch to couse id 
         //if(!angular.equals(scope.coursedata,undefined)){
         	 //var promise = addBatches.loadCourseRelatedBatches(companyId,scope.coursedata,joinDate)
         	 var promise = addBatches.loadCourseRelatedBatches(companyId,coursedata,joinDate)
      		promise.then(function(response){
      			console.log(angular.fromJson(JSON.parse(response.data)));
        	var batchElements = angular.fromJson(JSON.parse(response.data));
      		angular.forEach(batchElements, function(batch){
      			//console.log(batch);
      			batch.Name = batch.batchName;
      			batch._id = batch._id.$oid;
      		})
      		scope.batchElements = batchElements;
      		
      	   });  
        // }
    // }, true);   
 	  
	  }	
	};
}]);
