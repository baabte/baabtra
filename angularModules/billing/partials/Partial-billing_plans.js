angular.module('baabtra').controller('BillingPlansCtrl',['$scope','billingPlans','$alert',function($scope,billingPlans,$alert){

$scope.tooltip = {
  "title": "Click to add this feature to the plan",
  "checked": false
};
$scope.callme=function(fae){
console.log(fae);
};

$scope.planName="";
billingPlans.loadFeatures($scope);
$scope.current_plan=false;
$scope.features_to_billing_plan=[];
$scope.newPlan={};
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
                 		$scope.features_to_billing_plan=[];
                 }
                 else{
                 		$scope.current_plan=false;
                 }
              }
);
$scope.addPlan=function()
{
			$scope.newPlan.planName=$scope.planName;
			$scope.newPlan.features=$scope.features_to_billing_plan;
			console.log($scope.newPlan);

};
$scope.removeFromFeaturelist=function(feature,index){
				$scope.features_to_billing_plan.splice(index,1);
				$scope.features.push(feature);
};

//callback functions
$scope.fnloadFeaturesBack=function(data){ //callback function for handle Edit role of the company         
 $scope.features=angular.fromJson(JSON.parse(data));
 // console.log($scope.features);             
};
$scope.filterBillingPlan=function(feature){
			console.log(feature.billing);
			if(feature.billing.years>0&&feature.billing.days==0&&feature.billing.months==0	){
					$scope.billingplan="yearly";
			}else if(feature.billing.months>0&&feature.billing.days==0&&feature.billing.years==0	){
				 $scope.billingplan="monthly";
			}
			else{
				 $scope.billingplan="custom";
			}
			console.log($scope.billingplan);
};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };


}]);