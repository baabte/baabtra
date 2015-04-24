angular.module('baabtra').controller('ViewpaymentreportCtrl',['$scope','$rootScope','paymentReport','commonService','$modal','$alert','$state',function($scope,$rootScope,paymentReport,commonService,$modal,$alert,$state){

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
	var currentStateIdentifier=$state.params.key;
	var stateArray=[
					{acthType:"Requestee",reportName:'Cash'},
					{acthType:"Course",reportName:'Sales'}
				   ];
	$scope.customerType=[
							{value:'company',name:'Corporate customer'},
							{value:'individual',name:'Individual customer'}
						];
    $scope.reportName=stateArray[currentStateIdentifier].reportName;
	$scope.filter={};
	$scope.filter.courses=[];
	$scope.searchObj={};
	$scope.searchObj.searchObj={companyId:companyId,"actHead.type":stateArray[currentStateIdentifier].acthType};
	

	$scope.fnGetReport=function () {
		var promise=paymentReport.getReport($scope.searchObj);
		promise.then(function  (data) {

			$scope.report=angular.fromJson(JSON.parse(data.data));
			$scope.totalCredit={};
			for(key in $scope.report){
				if(angular.equals($scope.totalCredit[$scope.report[key]._id.currency],undefined)){
					$scope.totalCredit[$scope.report[key]._id.currency]=0;
				}
				$scope.totalCredit[$scope.report[key]._id.currency]+=$scope.report[key].credit;
			}
			if(!$scope.report.length){
				$alert({title: 'Sorry !', content: 'There have no entries to show.', placement: 'top-right', type: 'warning', show: true});
			}
		});
	};

	$scope.clearReport=function () {
		delete $scope.report;
	};

	$scope.filterPopup=function () {
		// popup-paymentReportFilter.html
		$modal({scope: $scope, template: 'angularModules/Nomination/partials/popup-paymentReportFilter.html', show: true})
	};

	$scope.selectTab=function (tabName) {
		$scope.selectedFilterTab=tabName;
	};

	$scope.buildFilterObject=function  (hide) {
		// $scope.searchObj.searchObj['actHead.requesteeType']
		if(!angular.equals($scope.filter.customerType,undefined)){
			$scope.searchObj.searchObj['actHead.requesteeType']=$scope.customerType[$scope.filter.customerType].value;
		}
		else{
			delete $scope.searchObj.searchObj['actHead.requesteeType'];
		}

		if(!angular.equals($scope.filter.courses,undefined)){
			if($scope.filter.courses.length){
				// $scope.searchObj.searchObj['transactionFor.courseId']={};
				// $scope.searchObj.searchObj['transactionFor.courseId']['$in']=[];
				// for(key in $scope.filter.courses){
					$scope.searchObj.searchObj['transactionFor.courseId']=$scope.filter.courses[0]._id;
				// }
			}else{
				delete $scope.searchObj.searchObj['transactionFor.courseId'];
				// delete $scope.filter.courses;
			}

		}

		hide();
	};


	$scope.deleteSearchKey=function (keyName){
		if(keyName=='customerType'){
			delete $scope.searchObj.searchObj['actHead.requesteeType'];
			delete $scope.filter.customerType;
		}
		else if(keyName=='course'){
			delete $scope.searchObj.searchObj['transactionFor.courseId'];
		}
	};

	$scope.fnGetObjectLen = function(obj){
		return Object.keys(obj).length;
	};

}]);