angular.module('baabtra').controller('BillingPlansCtrl',['$scope','billingPlans','$alert','localStorageService',function($scope,billingPlans,$alert,localStorageService){
if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
        $location.path('/login');//redirecting path into login
  }
	var loginInfo=localStorageService.get('loginInfo');
	$scope.userLoginId=loginInfo.userLoginId.$oid;

$scope.tooltip = {
  "title": "Click to add this feature to the plan",
  "checked": false
};


$scope.planName="";
$scope.custom = false;
billingPlans.loadFeatures($scope);
billingPlans.retriveCurrentPlans($scope);
$scope.current_plan=false;
$scope.features_to_billing_plan=[];
$scope.newPlan={};
$scope.feature_add_menu=false;

$scope.toggleCustom = function(index) {
            $scope.toggle = $scope.toggle === undefined ? index: undefined;
        };
$scope.addfeature=function(index)
{

				if($scope.planName==""){
							$scope.notifications('Warning!',"Please add a plan!","warning");
				}	else{
							$scope.this_feature={};
							$scope.this_feature.featureId=$scope.features[index]._id.$oid;
							$scope.this_feature.featureName=$scope.features[index].featureName;
							$scope.this_feature.featureDescription=$scope.features[index].featureDescription;	
							$scope.this_feature.pricing=$scope.features[index].pricing;	
							$scope.this_feature.billing=$scope.features[index].billing;	
							$scope.features_to_billing_plan.push($scope.this_feature);
							$scope.features.splice(index,1);
				}	
};
$scope.$watch(function(scope) { return scope.planName },
              function(newValue, oldValue) {
                 if($scope.planName!=""){
                 		$scope.current_plan=true;
                 		// $scope.features_to_billing_plan=[];
                 }
                 else{
                 		$scope.current_plan=false;
                 }
              }
);
$scope.$watchCollection(function(scope) { return scope.features_to_billing_plan },
              function(newValue, oldValue) {
                 if($scope.features_to_billing_plan.length==0){
                 		$scope.feature_add_menu=false;
                 }
                 else{
                 		$scope.feature_add_menu=true;
                 }

              }
);
$scope.addPlan=function()
{
			$scope.newPlan.planName=$scope.planName;
			$scope.newPlan.features=$scope.features_to_billing_plan;
			$scope.newPlan.createdId=$scope.userLoginId;
			// console.log($scope.newPlan);
			billingPlans.addNewBillingPlan($scope);
};
$scope.removeFromFeaturelist=function(feature,index){
				$scope.features_to_billing_plan.splice(index,1);
				$scope.features.push(feature);
};
$scope.filterBillingPlan=function(feature){
			console.log(feature.billing);
			if(feature.billing.years>0&&feature.billing.days==0&&feature.billing.months==0	){
					select=0;
			}else if(feature.billing.months>0&&feature.billing.days==0&&feature.billing.years==0	){
				 select=1;
			}
			else{
				 select=2;
			}
			$scope.billings = [
    "yearly",
    "monthly",
    "custom"
  ];

};

//callback functions
$scope.fnloadFeaturesBack=function(data){ //callback function for handle Edit role of the company         
 $scope.features=angular.fromJson(JSON.parse(data));
 // $scope.features_keeper.push($scope.features);             
};

$scope.fnaddNewBillingPlanBack=function(data){ //callback function for handle Edit role of the company         
 addNewBillingPlanBackResult=angular.fromJson(JSON.parse(data));
 if(addNewBillingPlanBackResult=="success")
    {
    	 $scope.current_plans.push($scope.newPlan);
     	$scope.notifications("Success","New Billing Plan created successfully","success");
     	$scope.planName="";
     	$scope.features_to_billing_plan=[];
     	// for(index=0;)
     	$scope.features.push($scope.features_keeper);
     	console.log($scope.features_keeper);
    }
  else if (addNewBillingPlanBackResult=="error"||addNewBillingPlanBackResult=="failed") 
    {$scope.notifications('Warning!',"New billing Plan creation was failed","warning");};       
		            
};
$scope.fnretrieveCurrentPlans=function(data){
	$scope.current_plans=angular.fromJson(JSON.parse(data));

};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);