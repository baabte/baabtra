angular.module('baabtra').controller('FeedbackreportCtrl',['$scope','$rootScope','$stateParams','feedbackList',function($scope,$rootScope,$stateParams,feedbackList){
$scope.chartType="PieChart";

$scope.chart = { //dummy object
  "type":"PieChart",	
    
  "options": {
    "title": "Perfomance per technology",
    "tooltip": {
      "isHtml": true
    },
    'width':600,
   'height':400
  }
};
/*"data": [
    [
      "Component",
      "cost"
    ],
    [
      "Software",
      50000
    ],
    [
      "Hardware",
      80000
    ],
    [
      "Services",
      20000
    ]
  ],*/
//$scope.reportList=[{"chart":$scope.chart3},{"chart":$scope.chart3},{"chart":$scope.chart3}];
//to check login info to get the user details
if(!$rootScope.userinfo){
    //commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

//$rootScope.$watch('userinfo',function(){
    //$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    //$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
    //viewUsers.fnLoadCompnayUsers($scope,'','initial',''); 
//});
//checking for feedbackId to load the feedback report
if(!angular.equals($stateParams.feedbackId,undefined)){
	var feedbackResponse = feedbackList.fnLoadFeedbackReport($stateParams.feedbackId);
		feedbackResponse.then(function(response){ //getting the promise of feedback response
			$scope.reportList=angular.fromJson(JSON.parse(response.data));
	});
}
//chart type object
$scope.chartTypes = [{"value":"PieChart","label":"PieChart"},{"value":"AreaChart","label":"Area Chart"},{"value":"ColumnChart","label":"Column Chart"},{"value":"LineChart","label":"Line Chart"},{"value":"Table","label":"Table"},{"value":"BarChart","label":"Bar Chart"}];

}]);