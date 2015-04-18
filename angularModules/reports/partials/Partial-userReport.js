angular.module('baabtra').controller('UserreportCtrl',['$scope','$filter','bulkEnrollment','$rootScope','commonService','$state','candidateReport','addCourseService',function($scope,$filter,bulkEnrollment,$rootScope,commonService,$state,candidateReport,addCourseService){

 if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }


//report list drop down values
// $scope.courses=[ {'id':'rptEnroll','type':'user enrollment report'},
//                         {'id':'rptDetail','type':'Performance report'}];
$scope.courses=[];
$scope.obj={};

$scope.type={'id':'rptEnroll','type':'user enrollment report'};
//getting the user role mapping id
      /*login detils start*/
 

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/
    
    // $scope.userRegister={};
    // var loadReportResponse = bulkEnrollment.FnLoadReport($scope.companyId);
    // loadReportResponse.then(function(response){
    //   $scope.data = angular.fromJson(JSON.parse(response.data)).data;
    //   $scope.obj.rptEnroll = {
    //       "type":"PieChart",  
    //       "displayed": true,
    //       "data":$scope.data,
    //       "options": {
    //         "title": "Sales per month",
    //         "isStacked": "true",
    //         "fill": 20,
    //         "displayExactValues": true,
    //         "vAxis": {
    //           "title": "Sales unit",
    //           "gridlines": {
    //             "count": null
    //           }
    //         },
    //         "hAxis": {
    //           "title": "Date"
    //         },
    //         "tooltip": {
    //           "isHtml": true
    //         },
    //         'width':800,
    //        'height':400
    //       },
    //       "formatters": {}
    //     };
    // });
    
/////////////////////////////////////original call




 var courseFetchData={fkcompanyId:$scope.companyId};
$scope.candidateReport={};
var FetchCandidateReportCallBack=candidateReport.FetchCandidateReport(courseFetchData);
      FetchCandidateReportCallBack.then(function(data){
        $scope.chartData=[];
        var array=[];
        array[0]="Course";
        array[1]="Candidates";
        $scope.chartData.push(array);
        $scope.CandidateReport = angular.fromJson(JSON.parse(data.data)); 
         array=[];
        for (var i in $scope.CandidateReport) {
           // console.log($scope.CandidateReport[i]);
           array[0]=$scope.CandidateReport[i].courseName;
           array[1]=$scope.CandidateReport[i].candidateCount;
          $scope.chartData.push(array);
          array=[];
         };
         // $scope.candidateReport.type="PieChart";
          $scope.candidateReport= { //dummy object
                                  "type":"PieChart",  
                                  "options": {
                                    "title": "",
                                    "tooltip": {
                                      "isHtml": true
                                    },
                                    'width':700,
                                   'height':500
                                  }
                                };
         $scope.candidateReport.data=$scope.chartData;
        // console.log($scope.candidateReport);
  });




}]);