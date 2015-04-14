angular.module('baabtra').controller('AddcourseCtrl',['$scope','bbConfig','$rootScope','$http','$state','addCourseService','commonSrv','addCourseDomainSrv','manageTreeStructureSrv','branchSrv','RoleMenuMappingSrv','addCourseElementService','commonService','$alert','$sce',function($scope,bbConfig,$rootScope,$http,$state,addCourseService,commonSrv,addCourseDomainSrv,manageTreeStructureSrv,branchSrv,RoleMenuMappingSrv,addCourseElementService,commonService,$alert,$sce){


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
  $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/


if(!angular.equals($state.params.courseId,"")){
  //this function loads course details by course Id
  $scope.courseId = $state.params.courseId;
  var promise = addCourseService.fnLoadCourseDetails($scope, $scope.courseId);
  promise.then(function(course){
    $scope.course = angular.fromJson(JSON.parse(course.data)).courseDetails;
    if(!angular.equals($scope.course.evaluator,undefined)){
      angular.forEach($scope.course.evaluator,function(evaluator){
        evaluator.roleMappingId = evaluator.roleMappingId.$oid;
      });
    }

    if(angular.equals($scope.course.courseDetails,undefined)){

      $scope.course.courseDetails = [{title:"Course Description",
                value:"",
                template:'DynamicFields/editor.html',
                help:"A short description of the Course(Optional, recommended)",
                removable:false},
                {title:"Course Benefits",
                value:"",
                template:'DynamicFields/editor.html',
                help:"Benefits of the Course(Optional, recommended)",
                removable:false}];
    }

    
    if(!angular.equals($scope.course.Duration.durationInMinutes, undefined)){
      $scope.totalCourseDuration = $scope.course.Duration.durationInMinutes;
    }

  });
}
else{
  $scope.courseId = "";
}



//$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
$scope.technologies={};//object to store selected technologies
$scope.technologies.values = [];//object to store selected technologies

$scope.ExitPoints={"exitPointList":{}}; // initializing exit point obj
			
$scope.totalCourseDuration=0; // course duration in minutes


// variable to store courseDuration
    $scope.courseDuration={};
    $scope.courseDuration.days=0;
    $scope.courseDuration.months=0;
    $scope.courseDuration.years=0;
//watch funtion to analyse change in courseDuration object
    $scope.$watch('courseDuration', function(newVal, oldVal){
        
        if(($scope.courseDuration.days!==0)||($scope.courseDuration.months!==0)||($scope.courseDuration.years!==0)){		
                            $scope.totalCourseDuration=(($scope.courseDuration.days*1)*24*60)+(($scope.courseDuration.months*30)*24*60)+(($scope.courseDuration.years*365)*24*60);
                     }
    	else{
    		$scope.totalCourseDuration=0;

    	}                 
    }, true);


	$scope.tlPopOver={};//obj for bulding context menu of timeline point
	$scope.tlPopOver.step3={colorClass:'03A9F4'};
  var weHaveGotCrsElementsStep3=addCourseElementService.FnGetCourseElements("");//calling course element function
      weHaveGotCrsElementsStep3.then(function(data){
        $scope.tlPopOver.step3.courseElementlist=angular.fromJson(JSON.parse(data.data));
        // console.log($scope.tlPopOver.step3.courseElementlist);
        $scope.tlPopOverEditObject = angular.fromJson(JSON.parse(data.data));
      });

$scope.currentState=$state.current.name;
$scope.nextPart = function(state,borderClass){//for change step, when click tab
    if(!angular.equals($scope.courseId,"")){
      $scope.borderClass = borderClass;
      $scope.currentState=state;
      $state.go(state,{'courseId':$scope.courseId});
    }
};
$scope.onDomainSelectionChanged = function(items) {
    if(angular.equals($scope.course.Domains.indexOf(items[0].name),-1)){
      $scope.course.Domains.push(items[0].name);
    }
  };

$scope.onBranchSelectionChanged = function(items) {
    $scope.selectedBranches=[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedBranches.push(items[i].name);
      }
    }
  };

$scope.onRoleSelectionChanged = function(items) {
    $scope.selectedRole=[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedRole.push(items[i].name);
      }
    }
  };


// function for change course image
$scope.courseImageChanged = function($files){
  //this function remove old course image
  if(!angular.equals($scope.course.courseImg,undefined)){
    var fileRemoveResponse = commonSrv.fnRemoveFileFromServer($scope.course.courseImg);
  }
  //function for upload course Image  
  var courseImageUploadResponse = commonSrv.fnFileUpload($files[0],"Course/courseImage");
  courseImageUploadResponse.then(function(response){
          $scope.course.courseImg = bbConfig.BWS+'files/Course/courseImage/'+response.data.replace('"','').replace('"','');
        });
};


var globalValuesResponse = commonSrv.FnLoadGlobalValues("");
globalValuesResponse.then(function(data){
  var globalValues=angular.fromJson(JSON.parse(data.data));
  $scope.globalValues = {};
  angular.forEach(globalValues,function(value){
    $scope.globalValues[value._id] = value.values.approved;
  });
});


branchSrv.fnLoadBranch($scope,$scope.cmp_id);

var courseDomainResponse = addCourseDomainSrv.FnLoadDomain();
courseDomainResponse.then(function(response){
  var domainDetails=angular.fromJson(JSON.parse(response.data));//Converting the result to json object
  $scope.domains = manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots(domainDetails,null),null);
 convertObjectName($scope.domains, null);
});


RoleMenuMappingSrv.FnGetRoles($scope, $scope.cmp_id, "", "");

// Global Declaration Of variables

  $scope.domains = [];
  $scope.branchDetails =[];
  $scope.rolesDetails = [];
  $scope.selectedBranches =[];
  $scope.selectedRole = [];

// Global Declaration Of variables end  

// $scope.$watch('domainDetails', function(newVal, oldVal){
//     if (!angular.equals($scope.domainDetails,undefined)) {
//         $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
//         $scope.domains = angular.copy($scope.data1);
//         convertObjectName($scope.domains, null);
//     }
// });








$scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.branchDetails, null);
    }
});


$scope.$watch('roles', function(newVal, oldVal){
    if (!angular.equals($scope.roles,undefined)) {
      angular.forEach($scope.roles,function(role){
        role.name=role.roleName;
      });
      $scope.rolesDetails = angular.copy($scope.roles);
    }
});


// *********************** STEP 1 ****************************************
$scope.course={};
$scope.course.Domains = [];
$scope.course.Delivery = {};
$scope.course.Delivery.online=true;//setting delevery mode default option to true
$scope.course.Delivery.offline=true;//setting delevery mode default option to true
$scope.course.courseDetails = [];



var convertObjectName=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){
                return 0;
              }
                
              if(!angular.equals(menu[sub].childrenObj,undefined)){
                menu[sub].name=menu[sub]._id;
                menu[sub].id=menu[sub]._id;
                menu[sub].$$hashKey=menu[sub]._id+sub;
                delete menu[sub]._id;
                delete menu[sub].createdDate;
                delete menu[sub].parent;
                delete menu[sub].crmId;
                delete menu[sub].updatedDate;
                delete menu[sub].urmId;
                delete menu[sub].activeFlag;
                if(!angular.equals(menu[sub].children,null)){
                menu[sub].children=menu[sub].childrenObj;
                }
                else{
                  menu[sub].children=[];
                }
              }
              if(menu[sub].childrenObj.length){
               convertObjectName(menu[sub].childrenObj,null);
              }
              convertObjectName(menu,++sub);
            };

$scope.loadTechnologies = function(Query){

    return $scope.globalValues.technologies;
};
$scope.loadTags =function(Query){
    return $scope.globalValues.tags;
};

$scope.loadDesignation = function (Query) {
  return $scope.globalValues.Designation;
};
    $scope.course.crmId = $scope.rm_id.$oid;
    $scope.course.companyId =  $scope.cmp_id.$oid;
    $scope.course.urmId = $scope.rm_id.$oid;


$scope.completeStep1 = function(course){//created for build step1 object

/* Building courseDetails Start */
    var Technologies = [];
    var Tags = [];
    $scope.ItsTimeToSaveDataToDB = false;

    angular.forEach(course.Technologies, function(technology){
        Technologies.push(technology.text);
    });

    angular.forEach(course.Tags, function(tag){
        Tags.push(tag.text);
    });

    $scope.course.crmId = $scope.rm_id;
    $scope.course.companyId =  $scope.cmp_id;
    $scope.course.urmId = $scope.rm_id;
    $scope.course.Branches = $scope.selectedBranches;

    
    $scope.course.Tags = Tags;
    $scope.course.Technologies = Technologies;
    $scope.course.updatedDate = Date();
    
    if(angular.equals($scope.courseId,"")){
      $scope.course.draftFlag = 0;
      $scope.course.activeFlag = 1;
      $scope.course.createdDate = Date();
    }
    var courseToBeSave = angular.copy($scope.course);
    if (!angular.equals(courseToBeSave.Name, undefined)) {
          delete courseToBeSave.Img;
          var toState='home.main.addCourse.step2';
          $alert({title: 'Done..!', content: 'Step 1 completed successfuly :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
          addCourseService.saveCourseObject($scope, courseToBeSave, "", $scope.courseId, toState);//saving to database
    }
/* Building courseDetails End */

};



// *********************** STEP 1 .End ***********************************
// *********************** STEP 2 ***********************************

// variable initaialisations
$scope.course.Fees = {};
$scope.course.Fees.free = true;
$scope.course.Fees.oneTime = true;
$scope.course.Fees.payment = {};
// Payment types
$scope.paymentType = {};
$scope.course.Fees.payment.mode = {id: "1",name: "Before The Course"};
$scope.paymentTypes=[{id: "1",name: "Before The Course"},
                     {id: "2",name: "During The Course"},
                     {id: "3",name: "After The Course"}];

    $scope.course.Fees.currency= {currency: "INR",name: "<i class=\"fa  fa-inr\"></i>"};
                
    $scope.feeIn=[{currency: "INR",name: "<i class=\"fa  fa-inr\"></i>"},
          {currency: "$",name: "<i class=\"fa fa-dollar\"></i>"},
          {currency: "SR",name: "SR"},
          {currency: "AED",name: "AED"}];
    // $scope.course.Duration={};

    // $scope.course.Duration.DurationDetails={"Year(s)":1,"Month(s)":2,"Week(s)":5};

// adding and deleing the contextmenus the context menu
  $scope.$watch(function(){return $scope.course.Fees.oneTime + $scope.course.Fees.payment.mode;}, function(){
      if(!angular.equals($scope.course.Fees.payment.mode,undefined)){
      if($scope.course.Fees.oneTime === true || angular.equals($scope.course.Fees.payment.mode.id,'2')){
          $scope.tlPopOver.step2 = {colorClass:'00C853'};
          //addCourseElementService.FnGetCourseElements($scope.tlPopOver.step2,"Payment_checkpoint");//calling course element function
          var weHaveGotCrsElementsStep2=addCourseElementService.FnGetCourseElements("Payment_checkpoint");//calling course element function
          weHaveGotCrsElementsStep2.then(function(data){
            $scope.tlPopOver.step2.courseElementlist=angular.fromJson(JSON.parse(data.data));
          });
      }    
      else{
          $("#tlContextMenu").remove();
          $scope.tlPopOver.step2={};        
      }
    }
  });
 
$scope.completeStep2 = function(course){
  var Technologies = [];
  var Tags = [];
  if (!$scope.course.Fees.payment.oneTime) {
    delete $scope.course.Fees.payment.mode;
  }
  delete $scope.course._id;
      angular.forEach(course.Technologies, function(technology){
        Technologies.push(technology.text);
    });

    angular.forEach(course.Tags, function(tag){
        Tags.push(tag.text);
    });
        $scope.course.Tags = Tags;
    $scope.course.Technologies = Technologies;
  var courseToBeSave = angular.copy($scope.course);
  courseToBeSave.companyId = $scope.cmp_id;
  if(angular.equals(courseToBeSave.crmId.$oid,undefined)){
      courseToBeSave.crmId = courseToBeSave.crmId;
  }
  else{
    courseToBeSave.crmId = courseToBeSave.crmId.$oid;
  }
  courseToBeSave.urmId = $scope.rm_id;
  var toState='home.main.addCourse.step3';
  $alert({title: 'Done..!', content: 'Step 2 completed successfuly :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
  addCourseService.saveCourseObject($scope, courseToBeSave, "", $scope.courseId ,toState);//saving to database


};

$scope.fnTotalFeeChanged = function(){// this function trigers, when user change the total payment
  var payedAmt =0;
  angular.forEach($scope.course.courseTimeline, function(time){
     angular.forEach(time, function(element,key){//looping through all the existing check points
      if (angular.equals(key,"Payment_checkpoint")) {
        payedAmt = payedAmt + element[0].elements[0];// taking the sum of the already defined  payment check points amt 
      };
    });
  });
  if(!angular.equals($scope.course.balanceAmount,$scope.course.Fees.totalAmount -payedAmt)){// checking value is changed
    $scope.course.balanceAmount = $scope.course.Fees.totalAmount -payedAmt;// if the value is changed, changing the balance amt to pay respectivily
    var toState='home.main.addCourse.step2';
    addCourseService.saveCourseObject($scope, $scope.course, "", $scope.courseId ,toState);//saving to database
  }
};

// *********************** STEP 2 .End ***********************************

// *********************** STEP 3 .Start ***********************************
 
        var promiseExistingMaterials=addCourseService.getExistingMaterials($scope.cmp_id); // fetching exsisting course Material
        
        promiseExistingMaterials.then(function(data){

           $scope.ExistingMaterials = angular.fromJson(JSON.parse(data.data));
      
        });

$scope.completeStep3 = function(){
  delete $scope.course._id;

  if(!angular.equals($scope.course.companyId.$oid,undefined)){
    $scope.course.companyId = $scope.course.companyId.$oid
  }
    $scope.course.urmId = $scope.rm_id;
    $scope.course.crmId = $scope.rm_id;

  var courseToBeSave = angular.copy($scope.course);
  courseToBeSave.draftFlag=1;
  courseToBeSave.activeFlag = 1;
  var toState='home.main.addCourse.step3';
  $alert({title: 'Done..!', content: 'Course has been published successfuly  :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
  addCourseService.saveCourseObject($scope, courseToBeSave, "", $scope.courseId ,toState);//saving to database
};
// *********************** STEP 3 .End ***********************************

}]);