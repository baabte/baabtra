angular.module('baabtra').controller('BatchattendancereportCtrl',['$scope','menteeAttendanceReport','$rootScope','$stateParams','assignCourseMaterial',function($scope,menteeAttendanceReport,$rootScope,$stateParams,assignCourseMaterial){

$scope.filter={};
$scope.data={};
$scope.chartObj={};
//chart type object
$scope.chart = { //dummy object
  "type":"PieChart",	
  "options": {
    "title": "",
    "tooltip": {
      "isHtml": true
    },
    'width':600,
   'height':400
  }
};
//$scope.chartObj.type=$scope.attReportObj.chart.type;
//to check login info to get the user details
if(!$rootScope.userinfo){
    //commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

$rootScope.$watch('userinfo',function(){
	$scope.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	loadBatchesPromise=menteeAttendanceReport.fnLoadAllBatches4Report($scope.companyId);
	
	loadBatchesPromise.then(function(response){ //promise for batch load
		$scope.data.batchList=angular.fromJson(JSON.parse(response.data));
		// console.log($scope.data.batchList);
		angular.forEach($scope.data.batchList, function(batch){
			batch.batchMappingId=batch._id.$oid;
			batch.Name=batch.batchName+batch._id.$oid;
			batch.batchName=batch.batchName+' ['+batch.courseName+']';
			batch.fkCourseId=batch.fkCourseId.$oid;
			delete batch._id;
			delete batch.courseName;
		});
	});
});

//checking for feedbackId to load the feedback report
	$scope.viewReport=function(){
		//if(!angular.equals($scope.selectedCourse,undefined)){
			var batchAttendanceReportPromise = menteeAttendanceReport.fnLoadBatchAttReport($scope.filter);
				menteeAttendanceReportPromise.then(function(response){ //getting the promise of feedback response
					$scope.reportList=angular.fromJson(JSON.parse(response.data)).data;
						$scope.chart.data=$scope.reportList;
						$scope.chart.options.title="Attendance Report";
						$scope.chartObj=angular.copy($scope.chart); //to copy the object
						
			});
		//}
	};

$scope.chartTypes = [{"value":"PieChart","label":"PieChart"},{"value":"AreaChart","label":"Area Chart"},{"value":"ColumnChart","label":"Column Chart"},{"value":"LineChart","label":"Line Chart"},{"value":"Table","label":"Table"},{"value":"BarChart","label":"Bar Chart"}];

}]);