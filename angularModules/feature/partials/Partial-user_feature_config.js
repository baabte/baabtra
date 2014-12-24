angular.module('baabtra').controller('UserFeatureConfigCtrl',['$scope','userFeatureConfigService','localStorageService','$location','$alert','$state','schemaForm',function ($scope,userFeatureConfigService,localStorageService,$location,$alert,$state,schemaForm){

	 if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
  $location.path('/');
}  

 var loginInfo=localStorageService.get('loginInfo');
     // localStorageService.get('loginInfo');
var loggedusercrmid=loginInfo.roleMappingId.$oid;
$scope.companyId=$state.params.companyId;

$scope.featuresConfig={}; 
$scope.featuresConfig.roleId=loginInfo.roleMappingObj[0].fkRoleId;
$scope.featuresConfig.companyId=$scope.companyId;


$scope.fConfig = function(feature){
console.log(feature);


};

userFeatureConfigService.FnGetFeatures($scope);
 $scope.schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, title: "Name", description: "Name or alias" },
      title: {
        type: "string",
        enum: ['dr','jr','sir','mrs','mr','NaN','dj']
      }
    }
  };

  $scope.form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];

  $scope.model = {};




}]);