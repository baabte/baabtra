angular.module('baabtra').controller('UserreportCtrl',['$scope','$filter',function($scope,$filter){

//report list drop down values
$scope.reportTypeList=[{'id':'rptEnroll','type':'user enrollment report'},{'id':'rptDetail','type':'Performance report'}];
$scope.obj={};
$scope.type={'id':'rptEnroll','type':'user enrollment report'};

$scope.obj.rptEnroll = {
  "type":"PieChart",	
  "displayed": true,
  "data":{
       "cols": [
      {
        "id": "month",
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
            "v": "January"
          },
          {
            "v": 19,
            "f": "42 enrollment"
          },
          {
            "v": 12,
            "f": "Ony 12 enrollment"
          },
          {
            "v": 7,
            "f": "7 enrollment"
          },
          {
            "v": 4
          }
        ]
      },
      {
        "c": [
          {
            "v": "February"
          },
          {
            "v": 13
          },
          {
            "v": 1,
            "f": "1 unit (Out of stock this month)"
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
            "v": "March"
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


$scope.obj.rptDetail = {
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