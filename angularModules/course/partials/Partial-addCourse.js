angular.module('baabtra').controller('AddcourseCtrl',['$scope','$rootScope','$http','$state','addCourseService','commonSrv','addCourseDomainSrv','manageTreeStructureSrv','branchSrv','RoleMenuMappingSrv','addCourseElementService',function($scope,$rootScope,$http,$state,addCourseService,commonSrv,addCourseDomainSrv,manageTreeStructureSrv,branchSrv,RoleMenuMappingSrv,addCourseElementService){

$scope.roleId=1;

     $scope.valid=true;
     $scope.errTooltip = "Please choose an image to be shown for the course";

$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
$scope.technologies={};//object to store selected technologies
$scope.technologies.values = [];//object to store selected technologies

    $scope.fee=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
    			{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
    			{id: "3",name: "SR"}];
    $scope.selectedFee= "1";
    $scope.paymentTypes=[{id: "1",name: "Before The Course"},
    					 {id: "2",name: "During The Course"},
    					 {id: "3",name: "After The Course"}];
    $scope.selectedPaymentType="1";

    $rootScope.courseDetails={}; // for supressing errors lijin have commented this and you can uncomment below and
    $scope.ExitPoints={
      "exitPointList":{}}; // initializing exit point obj


			
$scope.totalCourseDuration=0; // course duration in minutes

$scope.ddlBindObject={0:{id: "1",name:"Days",mFactor:(1/1440),show:true},
                         1:{id: "2",name: "Months",mFactor:(1/43200),show:false},
                         2:{id: "3",name: "Hours",mFactor:1/60,show:true},
                         3:{id: "4",name: "Minutes",mFactor:1,show:true}};//mFactor is multiplication factor

// for dynamically change the visibility variable 'show' of all dropdown list datas
$scope.$watch('totalCourseDuration',function(){
  if($scope.totalCourseDuration!=undefined&&$scope.totalCourseDuration!=0)
  {
    $scope.ddlBindObject[1].show=($scope.totalCourseDuration>=43200);
    $scope.ddlBindObject[2].show=($scope.totalCourseDuration>=60);
    $scope.ddlBindObject[3].show=($scope.totalCourseDuration>=1);
  }
});
                    


    $scope.selects=[{id: "1",name: "<i class=\"fa  fa-inr\"></i>"},
    				{id: "2",name: "<i class=\"fa fa-dollar\"></i>"},
    				{id: "3",name: "SR"}];
    $scope.selectedItem= "1";

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
    		console.log($scope.totalCourseDuration);

    	}                 
    }, true);


	$scope.tlPopOver={};//obj for bulding context menu of timeline point
	$scope.tlPopOver.step3={colorClass:'bg-gold-dark'};
  $scope.tlPopOver.step2 = {colorClass:'bg-baabtra-green'};
  addCourseElementService.FnGetCourseElements($scope.tlPopOver.step2,"Payment_checkpoint");//calling course element function
  addCourseElementService.FnGetCourseElements($scope.tlPopOver.step3,"");//calling course element function

  

$scope.currentState=$state.current.name;
console.log($state.current.name);
$scope.nextPart = function(state){
    $scope.currentState=state;
    $state.go(state);
};

$scope.onDomainSelectionChanged = function(items) {
    $scope.selectedDomains =[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedDomains.push(items[i].name);
      }
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

commonSrv.FnLoadGlobalValues($scope,"");

addCourseDomainSrv.FnLoadDomain($scope);

branchSrv.fnLoadBranch($scope,'5457526122588a5db73e0b23');

RoleMenuMappingSrv.FnGetRoles($scope,'54978cc57525614f6e3e710b',"","");

// Global Declaration Of variables

  $scope.domains = [];
  $scope.branchDetails =[];
  $scope.rolesDetails = [];
  $scope.selectedBranches =[];
  $scope.selectedRole = []

// Global Declaration Of variables end  

$scope.$watch('domainDetails', function(newVal, oldVal){
    if (!angular.equals($scope.domainDetails,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
        $scope.domains = angular.copy($scope.data1);
        convertObjectName($scope.domains, null);
    }
});

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
      console.log($scope.roles);
      $scope.rolesDetails = angular.copy($scope.roles);
    }
});


// *********************** STEP 1 ****************************************
$scope.course={};
$scope.course.Delivery = {};
$scope.course.Delivery.online=true;//setting delevery mode default option to true
$scope.course.Delivery.offline=true;//setting delevery mode default option to true

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
    return $scope.globalValues[0].values.approved;
};
$scope.loadTags =function(Query){
    return $scope.globalValues[1].values.approved;
};

$scope.completeStep1 = function(course){//created for build step1 object
/* Building courseDetails Start */
    var Technologies = [];
    var Tags = [];

    angular.forEach(course.technologiesToBeSaved, function(technology)
    {
        Technologies.push(technology.text);
    });
    angular.forEach(course.tagsToBeSaved, function(tag)
    {
        Tags.push(tag.text);
    });
    $rootScope.courseDetails = { Name:course.courseName,
                             Image:"",
                             Description:course.courseDescription,
                             Benefits:course.courseBenefits,
                             Technologies:Technologies,
                             Tags:Tags,
                             Domains:$scope.selectedDomains,
                             Delivery: $scope.course.Delivery,
                             Availability:{"Branches":$scope.selectedBranches,"Roles":$scope.selectedRole},
                             courseTimeline:{}
                           };
console.log($rootScope.courseDetails);

    if (!angular.equals($rootScope.courseDetails.Name,undefined)) {
      addCourseService.saveCourseObject($scope, $rootScope.courseDetails, "", "");
      $scope.currentState="home.main.addCourse.step2";
      $state.go('home.main.addCourse.step2');
    };
/* Building courseDetails Start */

};



// *********************** STEP 1 .End ***********************************

}]);