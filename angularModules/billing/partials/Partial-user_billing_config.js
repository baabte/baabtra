angular.module('baabtra').controller('UserBillingConfigCtrl',['$scope','userBillingConfigService','localStorageService','$location','$alert','$state', function ($scope,userBillingConfigService,localStorageService,$location,$alert,$state){

 if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
  $location.path('/');
}  

	$scope.companyId=$state.params.companyId;
	console.log($scope.companyId);
    userBillingConfigService.FnGetUserPlan($scope);
    userBillingConfigService.FnGetPlan($scope);
    userBillingConfigService.FnGetFeature($scope);

// console.log($scope.PFlist);
$scope.featureSelected=false;
$scope.custombillfield=false;
$scope.PlanChangeTT="Warning changing plan will lead loss of current plan";
$scope.FeatureConfigTT="Click on feature to configure!";
$scope.PriceConfigTT="Click to edit Price";
$scope.BillConfigTT="Click to edit Billing";
var i;

$scope.fnChangeplan=function(plan){
	
	 if(plan.features.length>0){
	 // console.log($scope.userplan);
   $scope.userplan={};
   $scope.userplan.companyId=$scope.companyId;
   plan.planId=plan._id
   delete plan._id;
	 $scope.userplan.plan=plan;
   $scope.userplan.plan.planId=$scope.userplan.plan.planId.$oid;
   var flen=$scope.userplan.plan.features.length;
      i=0;
      while(i<flen){
        $scope.userplan.plan.features[i].featureId=$scope.userplan.plan.features[i].featureId.$oid;
        i++;
      }
      console.log($scope.userplan);
	 userBillingConfigService.FnChangeUserPlan($scope);
	}

};

$scope.fConfig = function(feature){
$scope.featureSelected=true;
$scope.selectedFeature=feature;
console.log(feature);
if((feature.billing.years===1)&&(feature.billing.months===0)&&(feature.billing.days===0))
{
  console.log("yearly");
     i=0;
}
else if((feature.billing.years===0)&&(feature.billing.months===1)&&(feature.billing.days===0))
{
  console.log("monthly");
      i=1;
}
else{
  console.log("custom");
     i=2;
  }


$scope.bill = [
    "yearly",
    "monthly",
    "custom"
  ]; 
  $scope.sel={};
$scope.sel.freqency=$scope.bill[i];

if($scope.sel.freqency==='custom'){
  $scope.custombillfield=true;
}
else if($scope.sel.freqency!=='custom'){
  $scope.custombillfield=false;
}


};


 $scope.addFeature = function( feature ) {
  var index = $scope.featurelist.indexOf( feature );
  console.log(feature);
  $scope.userplan.plan.features.push( feature );
  if ( index >= 0 ) {
      $scope.featurelist.splice( index, 1 );
      }
       $scope.AddFeature={};
       $scope.AddFeature.companyId=$scope.companyId;
       $scope.AddFeature.feature=feature;
      if (feature._id===undefined) {
        $scope.AddFeature.feature.featureId=feature.featureId.$oid;
      }
      else if (feature.featureId===undefined) {
        $scope.AddFeature.feature.featureId=feature._id.$oid;
         delete $scope.AddFeature.feature._id;
      }
      console.log($scope.AddFeature.feature);
      // $scope.AddFeature.feature.featureId=feature._id.$oid;
      // delete $scope.AddFeature.feature._id;
      userBillingConfigService.FnAddFeature($scope)
};


 $scope.deleteFeature = function( feature ) {
  var index = $scope.userplan.plan.features.indexOf( feature );
  console.log(feature);
  $scope.featurelist.push( feature );
  if ( index >= 0 ) {
      $scope.userplan.plan.features.splice( index, 1 );
      }
       $scope.DeleteFeature={};
       $scope.DeleteFeature.companyId=$scope.companyId;
      if (feature._id===undefined) {
        $scope.DeleteFeature.featureId=feature.featureId.$oid;
      }
      else if (feature.featureId===undefined) {
        $scope.DeleteFeature.featureId=feature._id.$oid;
      };
      console.log($scope.DeleteFeature);
      // $scope.DeleteFeature.featureId=feature._id.$oid;
       userBillingConfigService.FnDeleteFeature($scope);

};

$scope.editPricing = function(Pricing) {
  $scope.editPrice={};
  $scope.editPrice.companyId=$scope.companyId;
  $scope.editPrice.featureId=$scope.selectedFeature.featureId.$oid;
  $scope.editPrice.pricing=Pricing;
  console.log($scope.editPrice);
  userBillingConfigService.FnEditPricing($scope);

};

$scope.editBill = function(Billing) {
  console.log(Billing);
    $scope.editBilling={};
    $scope.editBilling.billing={};
    $scope.editBilling.companyId=$scope.companyId;
    $scope.editBilling.featureId=$scope.selectedFeature.featureId.$oid;
  
  if(Billing==='yearly'){
    $scope.custombillfield=false;
    $scope.editBilling.billing.years=1;
    $scope.editBilling.billing.months=0;
    $scope.editBilling.billing.days=0;
    $scope.editBilling.billing.totalDays=365;

    userBillingConfigService.FnEditBilling($scope);
  }
  else if(Billing==='monthly'){
    $scope.custombillfield=false;
    $scope.editBilling.billing.years=0;
    $scope.editBilling.billing.months=1;
    $scope.editBilling.billing.days=0;
    $scope.editBilling.billing.totalDays=30;

    userBillingConfigService.FnEditBilling($scope);
  }
  else if(Billing==='custom'){
    $scope.custombillfield=true;
  }
  console.log($scope.editBilling);
};

$scope.editCustomBilling = function() {
$scope.editBilling={};
    $scope.editBilling.billing={};
    $scope.editBilling.companyId=$scope.companyId;
    $scope.editBilling.featureId=$scope.selectedFeature.featureId.$oid;
    $scope.editBilling.billing.years=$scope.selectedFeature.billing.years;
    $scope.editBilling.billing.months=$scope.selectedFeature.billing.months;
    $scope.editBilling.billing.days=$scope.selectedFeature.billing.days;
    $scope.editBilling.billing.totalDays=parseInt(($scope.selectedFeature.billing.years*365))+parseInt(($scope.selectedFeature.billing.months*30))+parseInt(($scope.selectedFeature.billing.days));
    userBillingConfigService.FnEditBilling($scope);
}
 

//call backs
$scope.fnGetUserPlanCallBack=function(result){
  if(result==='success'){
        // console.log($scope.userplan);
      }
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};
$scope.fnGetPlanCallBack=function(result){
  if(result==='success'){
        // console.log($scope.userplan);
      }
	
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

$scope.fnGetFeatureCallBack=function(result){
  if(result==='success'){
       // console.log($scope.featurelist);
      }

	 if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
        // console.log($scope.featurelist);
      }

};

$scope.fnChangeUserPlanCallBack=function(result){
  if(result==='success'){
        userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
        
      }

};

$scope.fnEditPricingCallBack=function(result){
if(result==='success'){
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnAddFeatureCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};

$scope.fnEditBillingCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
        
      }

   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
       
      }

};
$scope.fnDeleteFeatureCallBack=function(result){
if(result==='success'){
      userBillingConfigService.FnGetUserPlan($scope);
        userBillingConfigService.FnGetFeature($scope);
        
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