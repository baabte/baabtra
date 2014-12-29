angular.module('baabtra').controller('AddcourseCtrl',['$scope','addCourseService',function($scope,addCourseService){

$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
$scope.technologies={};//object to store selected technologies
$scope.technologies.values = [];//object to store selected technologies
addCourseService.loadTechnologies($scope);

    $scope.fee=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
    			{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
    			{id: "3",name: "SR"}];
    $scope.selectedFee= "1";
    $scope.paymentTypes=[{id: "1",name: "Before The Course"},
    					 {id: "2",name: "During The Course"},
    					 {id: "3",name: "After The Course"}];
    $scope.selectedPaymentType="1";

    $scope.selectedDuration="1";

    $scope.courseDetails=[]; // for supressing errors lijin have commented this and you can uncomment below and
    						 // remove this line. There is no use of this variable.

    // $scope.courseDetails=[{group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {},
    // 					  {group:["1"]},
    // 					  {group:["1"]},		
    // 					  {},
    // 					  {},
    // 					  {}];
					  

    // $scope.totalCourseDuration=259200; // course duration in minutes

    $scope.selects=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
    				{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
    				{id: "3",name: "SR"}];
    $scope.selectedItem= "1";

// variable to store courseDuration
    $scope.courseDuration={};
    $scope.courseDuration.days=0;
    $scope.courseDuration.months=0;
    $scope.courseDuration.years=0;

//variable to save total dutation in minutes
$scope.totalCourseDuration=0;

//watch funtion to analyse change in courseDuration object
    $scope.$watch('courseDuration', function(newVal, oldVal){
        
        if(($scope.courseDuration.days!==0)||($scope.courseDuration.months!==0)||($scope.courseDuration.years!==0)){		
                     		// $scope.duration=0;
                     		// $scope.duration
                            $scope.totalCourseDuration=(($scope.courseDuration.days*1)*24*60)+(($scope.courseDuration.months*30)*24*60)+(($scope.courseDuration.years*365)*24*60);
                            console.log($scope);
                     	// $scope.changeDuration();
                     		console.log($scope.totalCourseDuration);
                     		
                     }
    	else{
    		$scope.dur=0;
    		console.log($scope.dur);

    	}                 
    }, true);


    $scope.callbackFunctions=[];
    $scope.callbackFunctions['step3']=function(arg){
    console.log('step3:'+arg);
    };
    $scope.callbackFunctions['step2']=function(arg){
    console.log('step2:'+arg);
    };



}]);