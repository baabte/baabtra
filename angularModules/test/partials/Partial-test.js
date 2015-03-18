angular.module('baabtra').controller('TestCtrl',function($scope){

$scope.previewData=[{"type":"objective",
"answerType":"singleAnswer",
"title":"Sample title",
"question":"<div class=\"line\" id=\"line-1\">Which of the following is not a sports ?</div>",
"options":[{"key":1,"value":"Cricket","why":"Cricket is a sports"},
			{"key":2,"value":"Football","why":"Football is a sports"},
			{"key":3,"value":"Badminton","why":"Badminton is a sports"},
			{"key":4,"value":"Singing","why":"Singing is not a sports !"}],
"answer":[4],
"mark":{"Answer":3},																																																							
"submitType":"single"},
{"type":"objective",
"answerType":"multiAnswer",
"title":"Sample title",
"question":"<div class=\"line\" id=\"line-1\">Which of the following is a sports ?</div>",
"options":[{"key":1,"value":"Cricket","why":"Cricket is a sports"},
			{"key":2,"value":"Football","why":"Football is a sports"},
			{"key":3,"value":"Badminton","why":"Badminton is a sports"},
			{"key":4,"value":"Singing","why":"Singing is not a sports !"}],
"answer":[1,2,3],
"mark":{"Answer":5},
"submitType":"single"},
{"type":"objective",
"answerType":"singleAnswer",
"title":"Sample title",
"question":"<div class=\"line\" id=\"line-1\">Entomology is the science that studies ?</div>",
"options":[{"key":1,"value":"Human beings","why":"its about birds"},
			{"key":2,"value":"Insects","why":"its about birds"},
			{"key":3,"value":"Birds","why":"its about birds"},
			{"key":4,"value":"Rocks","why":"its about birds"}],
"answer":[2],
"mark":{"Answer":3},																																																							
"submitType":"single"},];

$scope.questionGroup={};

$scope.feedbackModel={};

// $scope.feedbackFormModel={};
$scope.feedbackResponse=[];

$scope.userFeedBack=[{"userResponse":["a"]},{"userResponse":["a","c"]}];

$scope.feedbackFormModel=[{"type":"objective","options":[{"Name":"a","value":"sdasd"},{"Name":"b","value":"asd"},{"Name":"c","value":"asd"}],"question":"<div class=\"line\" id=\"line-1\">asdsa</div>","answerType":"singleAnswer","data":[["Answer","User Response"],["sdasd",0],["asd",0],["asd",0]]},{"type":"objective","options":[{"Name":"a","value":"djfkj"},{"Name":"b","value":"sdfjkj"},{"Name":"c","value":"wuierui"},{"Name":"d","value":"dcvmn"}],"question":"<div class=\"line\" id=\"line-8\">sjdfkj</div>","answerType":"multiAnswer","data":[["Answer","User Response"],["djfkj",0],["sdfjkj",0],["wuierui",0],["dcvmn",0]]}];

 var time=(new Date()).valueOf();
       var hashids = new Hashids("test");
       $scope.code = hashids.encode(time);   

$scope.userCourseId="54fd205fd4f9075d40a105cf";


});																																																																								 																			
