angular.module('baabtra').controller('MenteeattendanceCtrl',['$scope','$rootScope','viewBatches','$state','$alert','assignCourseMaterial','attendenceService', 'commonService',function($scope,$rootScope,viewBatches,$state,$alert,assignCourseMaterial,attendenceService, commonService){
	/*login detils start*/
	if(!$rootScope.userinfo){
		commonService.GetUserCredentials($scope);
		$rootScope.hide_when_root_empty=false;
		return;
	}

	if(angular.equals($rootScope.loggedIn,false)){
		$state.go('login');
	}

	var rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
	$scope.companyId = $rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	/*login detils ends*/

	$scope.menteeAttendanceObj = {};
	var menteedetail = {loginId:$state.params.userId};

	$scope.menteeAttendanceObj.menteeLoginId = $state.params.userId;
	
	var menteesBatchDetails = attendenceService.loadMenteesBatchDetails(menteedetail);
	menteesBatchDetails.then(function(response){
		var result = angular.fromJson(JSON.parse(response.data));
		$scope.menteeAttendanceObj.menteesBatchDetails = result.batchDetails;
	});

	$scope.loadAttendanceDetails = function(batch){
		if(batch){
			$scope.menteeAttendanceObj.selectedBatchId = batch._id.$oid;
			$state.go('home.main.menteeAttendance',{userId:$state.params.userId, batchId:batch._id.$oid});
		}

		var loadMenteeMarkedAttendanceDetails = attendenceService.loadMenteeMarkedAttendanceFromBatch({loginId:$state.params.userId, batchCourseMappingId:$scope.menteeAttendanceObj.selectedBatchId});
		loadMenteeMarkedAttendanceDetails.then(function(response){
			var result = angular.fromJson(JSON.parse(response.data));
			$scope.menteeAttendanceObj.totalPresent = 0;
			$scope.menteeAttendanceObj.totalLeave = {count:0, dates:[]};
			$scope.menteeAttendanceObj.totalAbsent = {count:0, dates:[]};
			$scope.menteeAttendanceObj.candidateAttendance = result.candidateAttendance;
			$scope.menteeAttendanceObj.totalWorkingDays = result.candidateAttendance.attendance.length;
			for(var attendance in result.candidateAttendance.attendance){
				if(angular.equals(result.candidateAttendance.attendance[attendance].attendanceStatus, "Planned leave")){
					$scope.menteeAttendanceObj.totalLeave.count ++;
					$scope.menteeAttendanceObj.totalLeave.dates.push(result.candidateAttendance.attendance[attendance].date);
				}
				else if(angular.equals(result.candidateAttendance.attendance[attendance].attendanceStatus, "Present")){
					$scope.menteeAttendanceObj.totalPresent ++;
				}
				else if(angular.equals(result.candidateAttendance.attendance[attendance].attendanceStatus, "Absent")){
					$scope.menteeAttendanceObj.totalAbsent.count ++;
					$scope.menteeAttendanceObj.totalAbsent.dates.push(result.candidateAttendance.attendance[attendance].date);
				}
				
			}

			$scope.menteeAttendanceObj.chartObject = {};
			$scope.menteeAttendanceObj.chartObject.data = {	"cols": [{ "id": "attendanceStatus", "label": "Status", "type": "string", "p": {}},
																	 { "id": "Count", "label": "Count", "type": "number", "p": {} }],
															"rows": [{ "c":[{ "v": "Present"},
																			{ "v": $scope.menteeAttendanceObj.totalPresent, "f": $scope.menteeAttendanceObj.totalPresent +" days"}]},
																	 { "c":[{"v": "Leave"}, { "v": $scope.menteeAttendanceObj.totalLeave.count}]},
																	 { "c":[{"v": "Absent"},{ "v": $scope.menteeAttendanceObj.totalAbsent.count}]}]};
			$scope.menteeAttendanceObj.chartObject.options = { "title": "Attendance for this batch","isStacked": "true", "is3D": true, "fill": 20, "displayExactValues": true, "vAxis": { "title": "Sales unit", "gridlines": { "count": 9 } }, "hAxis": { "title": "Date"},"tooltip": { "isHtml": false } };

			$scope.menteeAttendanceObj.chartObject.type = "PieChart";

			$scope.menteeAttendanceObj.percentage = ($scope.menteeAttendanceObj.totalPresent/$scope.menteeAttendanceObj.totalWorkingDays)*100;

			$scope.loadLeaveDetails = function(type){
				$scope.menteeAttendanceObj.tableType = type;
			};
			
		});
	};

	if($state.params.batchId){
		$scope.menteeAttendanceObj.selectedBatchId = $state.params.batchId;
		$scope.loadAttendanceDetails();
	}

}]);