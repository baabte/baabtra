angular.module('baabtra').controller('ManageorderformsCtrl',['$scope','commonService','$rootScope','$state','courseAllocateService','manageOrderFormSrvc',function($scope,commonService,$rootScope,$state,courseAllocateService,manageOrderFormSrvc){

/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	var companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.data = {};

	$scope.data.userDropdown = [{"text" : "<i class=\"fa fa-fw fa-rotate-left\"></i>&nbsp;Refund Request","click" : "refundRequest(orderForm._id)"}];


	var searchKey='';
    var fetchOrderFormsCallback = manageOrderFormSrvc.fnfetchOrderForms(companyId,'','initial','',searchKey); 
    fetchOrderFormsCallback.then(function(data){
        $scope.data.orderForms = angular.fromJson(JSON.parse(data.data));
        console.log($scope.data.orderForms);       
        $scope.data.firstUser = $scope.data.orderForms.firstId;
    });

    var searchTimeOut;
	$scope.searchOrderForm=function(){
		if(searchTimeOut) {
		clearTimeout(searchTimeOut);
		}
		searchTimeOut=setTimeout(function(){
			var fetchOrderFormsCallback = manageOrderFormSrvc.fnfetchOrderForms(companyId,'', 'initial', '', $scope.data.orderForms.searchKey);
		   fetchOrderFormsCallback.then(function(data){
		   	$scope.data.orderForms = angular.fromJson(JSON.parse(data.data));
	       });
		},500);
	};
	
	//event  for showing next 9 items
	$scope.nextOne=function(){
	  $scope.data.prevButtondisabled = false;
	   var fetchOrderFormsCallback=manageOrderFormSrvc.fnfetchOrderForms(companyId,$scope.data.orderForms.firstId,'next',$scope.data.orderForms.lastId,$scope.data.orderForms.searchKey);
	   fetchOrderFormsCallback.then(function(data){
        $scope.data.orderForms = angular.fromJson(JSON.parse(data.data));
       });
};


//event  for showing previous 9 items
$scope.prevOne=function(){
	  
	  if(angular.equals($scope.data.firstUser,$scope.data.orderForms.firstId)){ 
		$scope.data.prevButtondisabled = true;
	  }
	  else{
	   var fetchOrderFormsCallback=manageOrderFormSrvc.fnfetchOrderForms(companyId,$scope.data.orderForms.firstId,'prev',$scope.data.orderForms.lastId,$scope.data.orderForms.searchKey);
	   fetchOrderFormsCallback.then(function(data){
	        $scope.data.orderForms = angular.fromJson(JSON.parse(data.data));
	         if (angular.equals($scope.data.firstUser,$scope.data.orderForms.firstId)){ 
				$scope.data.prevButtondisabled=true;
	  		}
	   });
   	  }
};


	$scope.refundRequest = function(ofId){
		console.log(ofId);
		$state.go("home.main.refundRequest",{ofId:ofId});
	};



}]);