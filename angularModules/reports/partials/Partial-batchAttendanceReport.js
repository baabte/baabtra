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
$scope.userBasedList={};
//checking for feedbackId to load the feedback report
	$scope.viewReport=function(){
		//if(!angular.equals($scope.selectedCourse,undefined)){
			//getting the promise here
			var batchAttendanceReportPromise = menteeAttendanceReport.fnLoadBatchAttReport($scope.filter);
				batchAttendanceReportPromise.then(function(response){ //getting the promise of feedback response
					$scope.reportList=angular.fromJson(JSON.parse(response.data));
						var arr=[];
						angular.forEach($scope.reportList.report,function(report){

							if(angular.equals($scope.userBasedList[report._id.uid.$oid],undefined)){
								$scope.userBasedList[report._id.uid.$oid]={};
							}

							if(angular.equals($scope.userBasedList[report._id.uid.$oid][report._id.status],undefined)){
								$scope.userBasedList[report._id.uid.$oid][report._id.status]=0;
							}

							$scope.userBasedList[report._id.uid.$oid][report._id.status]+=1;

							$scope.userBasedList[report._id.uid.$oid]['Name']=report._id.userFname+' '+(report._id.userLname?report._id.userLname:"");
							if(angular.equals($scope.userBasedList[report._id.uid.$oid]['Absent'],undefined)){
								$scope.userBasedList[report._id.uid.$oid]['Absent']=0;
							}
							if(angular.equals($scope.userBasedList[report._id.uid.$oid]['Present'],undefined)){
								$scope.userBasedList[report._id.uid.$oid]['Present']=0;
							}
							if(angular.equals($scope.userBasedList[report._id.uid.$oid]['Planned leave'],undefined)){
								$scope.userBasedList[report._id.uid.$oid]['Planned leave']=0;
							}
							
						 });

						//building the reqired chart object here
						$scope.reportArr=[];
						for(var key in $scope.userBasedList){
							var data=[];
							data.push(["Days","Status"]);
							for(var keyInner in $scope.userBasedList[key]){
								if(!angular.equals(keyInner,'Name')){
									data.push([keyInner,$scope.userBasedList[key][keyInner]]);
								}
							}

							$scope.chart.data=data;
							$scope.chart.options.title="Attendance Report of "+$scope.userBasedList[key].Name;
							$scope.chartObj=angular.copy($scope.chart); 
							$scope.reportArr.push($scope.chartObj);
						}

			});
		//}
	};

$scope.chartTypes = [{"value":"PieChart","label":"PieChart"},{"value":"AreaChart","label":"Area Chart"},{"value":"ColumnChart","label":"Column Chart"},{"value":"LineChart","label":"Line Chart"},{"value":"Table","label":"Table"},{"value":"BarChart","label":"Bar Chart"}];

}]);