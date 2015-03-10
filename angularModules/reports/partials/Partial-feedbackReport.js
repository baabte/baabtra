angular.module('baabtra').controller('FeedbackreportCtrl',['$scope',function($scope){
$scope.chartType="PieChart";
$scope.chart1 = { //dummy object
  "type":$scope.chartType,	
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
    'width':600,
   'height':400
  },
  "formatters": {}
};
$scope.chart2 = { //dummy object
  "type":$scope.chartType,	
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
    'width':600,
   'height':400
  },
  "formatters": {}
};
$scope.chart3 = { //dummy object
  "type":$scope.chartType,	
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
    'width':600,
   'height':400
  },
  "formatters": {}
};
$scope.reportList=[{"chart":$scope.chart1},{"chart":$scope.chart2},{"chart":$scope.chart3}];
}]);