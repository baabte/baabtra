angular.module('baabtra').controller('FeatureConfigCtrl',['$scope','featureConfig','localStorageService','$location','$alert',function($scope,featureConfig,localStorageService,$location,$alert){
if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
        $location.path('/login');//redirecting path into login
  }


  newFeature={};
  $scope.billings={};
  $scope.fields=[];
  pricing={};
  $scope.atrributes=[];
  $scope.yearNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  $scope.monthNumbers = [0,1,2,3,4,5,6,7,8,9,10,11];
  $scope.weekNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  $scope.addAttrTooltip="add more attributes";
  $scope.RemoveAttrTooltip="remove this atribute";
  featureConfig.loadInputTypes($scope);
  $scope.customBilling=false;
  $scope.validations=[];

   $scope.avail_validations = [ "phone number" , "email" , "age" , "year" , "number","price","text","true/false" ];
 
  $scope.createFeature=function(){
  	// alert($scope.featureName+" "+$scope.featureDescription+" "+$scope.price+" "+$scope.units+" "+$scope.minUnits+" "+$scope.billing);
  	newFeature={"featureName":$scope.featureName,"featureDescription":$scope.featureDescription};
  	pricing={"price":$scope.price,"units":$scope.units,"minUnits":$scope.minUnits};
  	newFeature["pricing"]=pricing;
  	 if($scope.billing=="custom"){
	 		  year=365*$scope.years;
		  	month=31*$scope.months;
		  	days=$scope.days;
		  	billings={"years":$scope.years,"months":$scope.months,"days":$scope.days,"totaldays":year+month+days};
	 		  newFeature["billing"]=billings;
 		}
 		else{
 			newFeature["billing"]=$scope.billings;
 		}
 		  newFeature.configDetails=$scope.fields;
  		console.log(newFeature);
  		featureConfig.addNewFeature(newFeature);
  };
  $scope.addField=function(){
  	if(typeof $scope.allowedvalue === 'undefined'){
  		$scope.allowedvalue=false;
  	}
  	var field={};
  	field={"label":$scope.label,"InputType":$scope.typeOfInput.inputtypes,"allowedvalue":$scope.allowedvalue,"userConfigurable":$scope.userConfigurable};
  	field.atrributes=$scope.atrributes;
    field.validations=$scope.validations;
  	$scope.fields.push(field);
  	// console.log($scope.fields);
    };

 $scope.BillingPlan=function(){
 	
 	if($scope.billing=="custom"){
 		$scope.customBilling=true;
 	}
 	else{
 		$scope.customBilling=false;
 		if($scope.billing=="yearly"){
 			$scope.billings={"years":1,"months":0,"days":0,"totaldays":365};
 			
 		}
 		else{
 			$scope.billings={"years":0,"months":1,"days":0,"totaldays":365};
 			
 		}
 	}
 	
 };
 $scope.createDivForAddAttr=function(){
  var atrribute={};
  atrribute[$scope.attributename]=$scope.attributevalue;
  if($scope.attributename!=undefined&&$scope.attributevalue!=undefined&&$scope.attributename!=""&&$scope.attributevalue!=""){
    $scope.atrributes.push(atrribute);
  }
 };
 $scope.fun_validations=function(item){
     if(!item){
       console.log("empty");
    }
    else{
      
      if(item.avail_validations!=undefined&&item.avail_validations!=""){
          $scope.validations.push(item.avail_validations);
          $scope.item.avail_validations="";
          // console.log($scope.validations);
        } 
    }
  };


 $scope.removeAttr = function(index){
    $scope.atrributes.splice(index, 1);
   }; 
$scope.remove_validation=function(index){
  $scope.validations.splice(index, 1);
};

//call back functions
  $scope.loadInputTypescallback=function(data){
  	 $scope.InputTypes=angular.fromJson(JSON.parse(data));
  }
}]);