angular.module('baabtra').controller('UserreportCtrl',['$scope','$filter','bulkEnrollment','$rootScope','commonService','$state',function($scope,$filter,bulkEnrollment,$rootScope,commonService,$state){

//report list drop down values
$scope.reportTypeList=[ {'id':'rptEnroll','type':'user enrollment report'},
                        {'id':'rptDetail','type':'Performance report'},
                        {'id':'rptFeedback','type':'Feedback report'} ];
$scope.obj={};

$scope.type={'id':'rptEnroll','type':'user enrollment report'};
//getting the user role mapping id
      /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.coursePreviewObject={};
  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/
    
    $scope.userRegister={};
    var loadReportResponse = bulkEnrollment.FnLoadReport($scope.companyId);
    loadReportResponse.then(function(response){
      $scope.data = angular.fromJson(JSON.parse(response.data)).data;
      $scope.obj.rptEnroll = {
          "type":"PieChart",  
          "displayed": true,
          "data":$scope.data,
          "options": {
            "title": "Sales per month",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
              "title": "Sales unit",
              "gridlines": {
                "count": null
              }
            },
            "hAxis": {
              "title": "Date"
            },
            "tooltip": {
              "isHtml": true
            },
            'width':800,
           'height':400
          },
          "formatters": {}
        };
    });
    

// $scope.obj.rptEnroll.data={};
// $scope.obj.rptEnroll.data=$scope.data.data; //load from database

// }); //end rootmap watch


$scope.obj.rptDetail = { //dummy object
  "type":"PieChart",	
  "displayed": true,
  "data":{
       "cols": [
      {
        "id": "Technology",
        "label": "Month",
        "type": "string",
        "p": {}
      },
      {
        "id": "php-id",
        "label": "PHP",
        "type": "number",
        "p": {}
      },
      {
        "id": "dotnet-id",
        "label": ".Net",
        "type": "number",
        "p": {}
      },
      {
        "id": "python-id",
        "label": "Python",
        "type": "number",
        "p": {}
      },
      {
        "id": "sqlserver-id",
        "label": "Sql server",
        "type": "number"
      }
    ], 
        "rows": [
     
            {
        "c": [
          {
            "v": "Average"
          },
          {
            "v": 2,
            "f": "2 mentees"
          },
          {
            "v": 1,
            "f": "Ony 1 mentee"
          },
          {
            "v": 2,
            "f": "2 mentees"
          },
          {
            "v": 4
          }
        ]
      },
      {
        "c": [
          {
            "v": "Good"
          },
          {
            "v": 13
          },
          {
            "v": 4,
            "f": "4 mentees"
          },
          {
            "v": 12
          },
          {
            "v": 2
          }
        ]
      },
      {
        "c": [
          {
            "v": "Very good"
          },
          {
            "v": 24
          },
          {
            "v": 5
          },
          {
            "v": 11
          },
          {
            "v": 6
          }
        ]
      }]},
  "options": {
    "title": "Perfomance per technology",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Performance",
      "gridlines": {
        "count": null
      }
    },
    "hAxis": {
      "title": "Date"
    },
    "tooltip": {
      "isHtml": true
    },
    'width':800,
   'height':400
  },
  "formatters": {}
};


}]);