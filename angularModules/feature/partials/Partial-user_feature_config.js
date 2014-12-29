angular.module('baabtra').controller('UserFeatureConfigCtrl',['$scope','userFeatureConfigService','localStorageService','$location','$alert','$state','schemaForm',function ($scope,userFeatureConfigService,localStorageService,$location,$alert,$state,schemaForm){

	 if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
  $location.path('/');
}


//to get the crmid of the user 							
 var loginInfo=localStorageService.get('loginInfo');
     // localStorageService.get('loginInfo');
var loggedusercrmid=loginInfo.roleMappingId.$oid;

//to save the company id from the url
$scope.companyId=$state.params.companyId;
// console.log(loginInfo);
// console.log(loggedusercrmid);

//variables used for looping and getting lenght of array
var i;
var flen;
$scope.status={};
$scope.Config={}; 
$scope.Config.roleId=loginInfo.roleMappingObj[0].fkRoleId;
$scope.Config.companyId=$scope.companyId;
//service call to get the feature config and values
userFeatureConfigService.FnGetFeaturesConfigForm($scope);
userFeatureConfigService.FnGetFeaturesConfigValues($scope);

//kepp feature config field hidden 	
$scope.FeatureConfigField=false;
//function to configure feature form builder and value binder in this functions
$scope.fConfig = function(feature){
	// console.log(feature);
	$scope.FeatureConfigField=true;	
	$scope.featuremodel = {};
	$scope.FeatureConfig=feature;
// console.log($scope.FeatureConfig);
	$scope.schema={type: "object"};
	$scope.schema.properties={};
	$scope.schema.required=[];
	$scope.form=[];
    flen=$scope.FeatureConfig.configDetails.length;
    i=0;
	while(i<flen){
		if(angular.equals($scope.FeatureConfig.configDetails[i].inputType,'select')){
		$scope.schema.properties[$scope.FeatureConfig.configDetails[i].label]={type:"string",enum:$scope.FeatureConfig.configDetails[i].allowedValues};
		// $scope.featuremodel[$scope.FeatureConfig.configDetails[i].label]=

	}
	else{
	$scope.schema.properties[$scope.FeatureConfig.configDetails[i].label]={type:"string"};
	}
	$scope.schema.required.push($scope.FeatureConfig.configDetails[i].label);

 	$scope.form.push({key:$scope.FeatureConfig.configDetails[i].label,type:$scope.FeatureConfig.configDetails[i].inputType});
 	i++;
	}

	$scope.form.push({
    "type": "submit",
    "style": "btn-info",
    "title": "Save Config"
  });

	flen=$scope.featureValues.featureConfigs.length;
    i=0;
	while(i<flen){
		// console.log(feature._id.$oid)
		// console.log($scope.featureValues.featureConfigs[i].featureId.$oid)
		if (angular.equals(feature._id.$oid,$scope.featureValues.featureConfigs[i].featureId.$oid)) {
			$scope.featuremodel=$scope.featureValues.featureConfigs[i];

		}
		// $scope.featuremodel=
		i++;
		// console.log(i);
	 }
};

//function to save the values in feature config field
$scope.saveFeature = function(){
	// console.log($scope.featuremodel);
	$scope.configValues={};
	$scope.configValues.fConfig=$scope.featuremodel;
	$scope.configValues.fConfig.featureId=$scope.FeatureConfig._id.$oid;
	$scope.configValues.companyId=$scope.companyId;

	// console.log($scope.configValues);
	userFeatureConfigService.FnSaveFeaturesConfig($scope);

};

//callbacks
$scope.fnGetFeaturesConfigCallBack=function(result){

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnGetFeaturesConfigValuesCallBack=function(result){
if(result==='success'){   
	// console.log($scope.featureValues.featureConfigs.length);
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnSaveFeaturesConfigCallBack=function(result){
	if(result==='success'){
        $scope.notifications('Done!','Feature configured successfully','info');
       
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};




//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };

 

  

  



}]);