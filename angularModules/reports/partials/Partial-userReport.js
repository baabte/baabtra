angular.module('baabtra').controller('UserreportCtrl',['$scope','$filter','bulkEnrollment','$rootScope','commonService','$state','candidateReport','addCourseService',function($scope,$filter,bulkEnrollment,$rootScope,commonService,$state,candidateReport,addCourseService){

 if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

$scope.dates={};
$scope.courses=[];
$scope.obj={};

//to get number of weeks in the year
// var today = new Date();
// $scope.weekno =getISOWeeks(today);


  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
   $scope.months = [
      {name:'January', value:0},
      {name:'February', value:1},
      {name:'March', value:2},
      {name:'April', value:3},
      {name:'May', value:4},
      {name:'June', value:5},
      {name:'July', value:6},
      {name:'August', value:7},
      {name:'September', value:8},
      {name:'October', value:9},
      {name:'November', value:10},
      {name:'December', value:11}
    ];




var courseFetchData={fkcompanyId:$scope.companyId};
courseFetchData.type=0;
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
           array[0]=$scope.CandidateReport[i].courseName;
           array[1]=$scope.CandidateReport[i].candidateCount;
          $scope.chartData.push(array);
          array=[];
         }
         // $scope.candidateReport.type="PieChart";
          $scope.candidateReport= { //dummy object
                                  "type":"PieChart", 
                                  "displayExactValues": true, 
                                  "options": {
                                    "is3D":true,  
                                    "title": "Courses and Candidates",
                                    "vAxis":{
                                      "title":"Candidates"
                                    },
                                    "hAxis": {
                                        "title": "Course"
                                      },
                                    "tooltip": {
                                      "isHtml": true
                                    },
                                    'width':600,
                                   'height':400
                                  }
                                };                      
         $scope.candidateReport.data=$scope.chartData;
         // console.log($scope.candidateReport);

  });

$scope.UpdateReport=function(from,data){
  var dataToSend={};
  dataToSend.type=from;
  dataToSend.fkcompanyId=$scope.companyId;
    if(from=='monthly'){    
      dataToSend.monthNumber=data.value;    
    }
    else if(from=='DateRange'){
     dataToSend.DateRange={};
     dataToSend.DateRange.startDate=$scope.dates.startDate;     
     dataToSend.DateRange.endDate=$scope.dates.endDate;
    }
    else{
         dataToSend.type='DateRange';
         dataToSend.DateRange={};
         var weekstartdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'first');
         weekstartdate=new Date(weekstartdate);
         var weeklastdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'last');
         weeklastdate=new Date(weeklastdate);
         dataToSend.DateRange.startDate=weekstartdate;
         dataToSend.DateRange.endDate=weeklastdate;
    }
    // console.log(dataToSend);
     var UpdateReportCallBack=candidateReport.FetchCandidateReport(dataToSend); 
     UpdateReportCallBack.then(function(data){
        $scope.updatedCourseObj = angular.fromJson(JSON.parse(data.data)); 
        // console.log($scope.updatedCourseObj);
        var arrayToPush=[];
        var array=[];
            array[0]="Course";
            array[1]="Candidates";
        arrayToPush.push(array);
        array=[];
        for (var i in $scope.updatedCourseObj) {
               array[0]=$scope.updatedCourseObj[i].courseName;
               array[1]=$scope.updatedCourseObj[i].candidateCount;
               arrayToPush.push(array);
               array=[];
        }
        $scope.candidateReport.data=arrayToPush;

 });


}
///////////////////////////////////////////////////////////////////
function firstDayOfWeek(week, year,type) {

    var date       = firstWeekOfYear(year,type),
        weekTime   = weeksToMilliseconds(week),
        targetTime = weekTime + date.getTime();

    return date.setTime(targetTime);

}


function weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
}

function firstWeekOfYear(year,type) {
    var date = new Date();
    date = firstDayOfYear(date,year);
    if(type=='first'){
      date = firstWeekday(date);
    }
    else{
      date = LastWeekday(date);
    }
    
    return date;
}

function firstDayOfYear(date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function firstWeekday(date) {
    
    var day = date.getDay(),
        day = (day === 0) ? 7 : day;
    if (day > 3) {

        var remaining = 8 - day,
            target    = remaining + 1;
                
        date.setDate(target);
    }
    
    return date;
}

function LastWeekday(date) {
    
    var day = date.getDay(),
        day = (day === 0) ? 7 : day;
    if (day > 3) {

        var remaining = 8 - day,
            target    = remaining + 7;
                
        date.setDate(target);
    }
    
    return date;
}

function getISOWeeks(y) {
    var d,
        isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}


}]);

