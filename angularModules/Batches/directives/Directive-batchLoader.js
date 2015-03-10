angular.module('baabtra').directive('batchLoader',['addBatches','$rootScope', function(addBatches,$rootScope) {
	return {
		restrict: 'E',
		require:'ngModel',
		scope: {
			ngModel:"="
		},
		templateUrl: 'angularModules/Batches/directives/Directive-batchLoader.html',
		link: function(scope, element, attrs, fn) {
              scope.multi = false;
		
			if(!angular.equals(attrs.multiSelect,undefined)){
				scope.multi = true;
			}
          var companyId='';
			if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId){
			  companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;				
			}

		//console.log(companyId);
      var promise=addBatches.loadBatches(companyId)
      promise.then(function(response){
        scope.batchElements = angular.fromJson(JSON.parse(response.data));
       for(var index in scope.batchElements.result){
       	       //console.log(scope.batchEelements);
			 	 scope.batchElements.result[index]._id=scope.batchElements.result[index]._id.$oid;
	    }
      });  
 	  
	  }	
	};
}]);
