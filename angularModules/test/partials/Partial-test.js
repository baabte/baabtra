angular.module('baabtra').controller('TestCtrl',['$scope','$rootScope',function ($scope,$rootScope){

// $scope.previewData=[{"type":"objective",
// "answerType":"singleAnswer",
// "title":"Sample title",
// "question":"<div class=\"line\" id=\"line-1\">Which of the following is not a sports ?</div>",
// "options":[{"key":1,"value":"Cricket","why":"Cricket is a sports"},
// 			{"key":2,"value":"Football","why":"Football is a sports"},
// 			{"key":3,"value":"Badminton","why":"Badminton is a sports"},
// 			{"key":4,"value":"Singing","why":"Singing is not a sports !"}],
// "answer":[4],
// "mark":{"Answer":3},																																																							
// "submitType":"single"},
// {"type":"objective",
// "answerType":"multiAnswer",
// "title":"Sample title",
// "question":"<div class=\"line\" id=\"line-1\">Which of the following is a sports ?</div>",
// "options":[{"key":1,"value":"Cricket","why":"Cricket is a sports"},
// 			{"key":2,"value":"Football","why":"Football is a sports"},
// 			{"key":3,"value":"Badminton","why":"Badminton is a sports"},
// 			{"key":4,"value":"Singing","why":"Singing is not a sports !"}],
// "answer":[1,2,3],
// "mark":{"Answer":5},
// "submitType":"single"},
// {"type":"objective",
// "answerType":"singleAnswer",
// "title":"Sample title",
// "question":"<div class=\"line\" id=\"line-1\">Entomology is the science that studies ?</div>",
// "options":[{"key":1,"value":"Human beings","why":"its about birds"},
// 			{"key":2,"value":"Insects","why":"its about birds"},
// 			{"key":3,"value":"Birds","why":"its about birds"},
// 			{"key":4,"value":"Rocks","why":"its about birds"}],
// "answer":[2],
// "mark":{"Answer":3},																																																							
// "submitType":"single"},];

// $scope.questionGroup={};

// $scope.feedbackModel={};

// // $scope.feedbackFormModel={};
// $scope.feedbackResponse=[];

// $scope.userFeedBack=[{"userResponse":["a"]},{"userResponse":["a","c"]}];

// $scope.feedbackFormModel=[{"type":"objective","options":[{"Name":"a","value":"sdasd"},{"Name":"b","value":"asd"},{"Name":"c","value":"asd"}],"question":"<div class=\"line\" id=\"line-1\">asdsa</div>","answerType":"singleAnswer","data":[["Answer","User Response"],["sdasd",0],["asd",0],["asd",0]]},{"type":"objective","options":[{"Name":"a","value":"djfkj"},{"Name":"b","value":"sdfjkj"},{"Name":"c","value":"wuierui"},{"Name":"d","value":"dcvmn"}],"question":"<div class=\"line\" id=\"line-8\">sjdfkj</div>","answerType":"multiAnswer","data":[["Answer","User Response"],["djfkj",0],["sdfjkj",0],["wuierui",0],["dcvmn",0]]}];

//  var time=(new Date()).valueOf();
//        var hashids = new Hashids("test");
//         $scope.code = hashids.encode(time);   
// console.log($scope.code);

	

			function getIncrementalCode(n, type) {

				if (angular.equals(type,"number")){
					return n;
				}

			 var x = n-1,
			            r26 = x.toString(26),
			            baseCharCode = "A".charCodeAt(0);

			        var arr = r26.split(''),
			            len = arr.length;

			        var newArr =arr.map(function(val,i){
			            val = parseInt(val,26);

			            if( (i === 0) && ( len > 1)){
			                val = val-1;
			            }

			            return String.fromCharCode(baseCharCode + val);
			        });


			       if (angular.equals(type,"lowercase")){
						return angular.lowercase(newArr.join(''));
					}

			        return newArr.join('');
																																																																									 																			
			}

			

// });

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

 // var time=(new Date()).valueOf();
 //       var hashids = new Hashids("test");
 //       $scope.code = hashids.encode(time);   

$scope.userCourseId="55095e71d4f9075d40a10c22";

//for evaluation loader
$scope.evalId1="550e9857d4f9075d40a10f4c.2881.test.0";
$scope.evalId2="550e9857d4f9075d40a10f4c.8641.test.0";
$scope.evalId3="550e9857d4f9075d40a10f4c.11521.Test1.0";
$scope.evalId4="5510f66ad4f9075d40a1105f.14401.test.0"


$scope.evalatorId="550aaf7fd4f9075d40a10d4d";
// console.log($scope);
//end evaluation loader
$scope.flipclock={};
$scope.schemaObj={};
$scope.branch={};

$scope.course={};
$scope.obj={};
}]);																																																																								 																			

