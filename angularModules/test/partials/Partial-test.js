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
});																																																																								 																			


/*

*/