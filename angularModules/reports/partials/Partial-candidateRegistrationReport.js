angular.module('baabtra').controller('CandidateregistrationreportCtrl',['$scope','candidateReport','$rootScope','commonService',function($scope,candidateReport,$rootScope,commonService){


 if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
$scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;

$scope.candidateRegistrationReport={};

$scope.dates={};
var candidateregReport={"companyId":$scope.companyId};
candidateregReport.type=0;
var CandidateRegistrationReportCallback=candidateReport.CandidateRegistrationReport(candidateregReport);
      CandidateRegistrationReportCallback.then(function(data){
      $scope.candidateregdata=angular.fromJson(JSON.parse(data.data)); 
      // console.log($scope.candidateregdata);
      $scope.chartData=[];
      var array=[];
      array[0]="Candidates";
      array[1]="Registered On";
      $scope.chartData.push(array);
      array=[];
      for (var i in $scope.candidateregdata) {
           array[0]=$scope.candidateregdata[i].registered;
           array[1]=$scope.candidateregdata[i].candidateCount;
           $scope.chartData.push(array);
           array=[];
      }
       $scope.candidateRegistrationReport= { 
                                  "type":"PieChart", 
                                  "displayExactValues": true, 
                                  "options": {
                                    "is3D":true,  
                                    "title": "Courses and Candidates",
                                    "vAxis":{
                                      "title":"Candidates"
                                    },
                                    "hAxis": {
                                        "title": "RegisteredOn"
                                      },
                                    "tooltip": {
                                      "isHtml": true
                                    },
                                    'width':600,
                                   'height':400
                                  }
                        };   
      $scope.candidateRegistrationReport.data=$scope.chartData; 
      // console.log($scope.candidateRegistrationReport);
});
$scope.UpdateReport=function(from,data){
	var dataToSend={};
	dataToSend.type=from;
	dataToSend.companyId=$scope.companyId;
    if(from=='DateRange'){
	     dataToSend.DateRange={};
	     dataToSend.DateRange.startDate=$scope.dates.startDate;     
	     dataToSend.DateRange.endDate=$scope.dates.endDate;
    }else{
    	 dataToSend.type='DateRange';
    	 dataToSend.week=$scope.dates.weekNumber;
         dataToSend.DateRange={};
         var weekstartdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'first');
         weekstartdate=new Date(weekstartdate);
         var weeklastdate=firstDayOfWeek($scope.dates.weekNumber,(new Date()).getFullYear(),'last');
         weeklastdate=new Date(weeklastdate);
         dataToSend.DateRange.startDate=weekstartdate;
         dataToSend.DateRange.endDate=weeklastdate;
    }
    var UpdateReportCallBack=candidateReport.CandidateRegistrationReport(dataToSend); 
     UpdateReportCallBack.then(function(data){
        $scope.UpdateReportObj = angular.fromJson(JSON.parse(data.data)); 
        // console.log($scope.UpdateReportObj);
        var arrayToPush=[];
        var array=[];
            array[0]="Course";
            array[1]="Registered On";
        arrayToPush.push(array);
        array=[];
        for (var i in $scope.UpdateReportObj) {
               array[0]=$scope.UpdateReportObj[i].registered;
               array[1]=$scope.UpdateReportObj[i].candidateCount;
               arrayToPush.push(array);
               array=[];
        }
        $scope.candidateRegistrationReport.options.title= $scope.UpdateReportObj[0].registered; 
        $scope.candidateRegistrationReport.data=arrayToPush;

 });
};


///////////////////////////////////////////////////

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