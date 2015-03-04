angular.module('baabtra').controller('PublishedcourseCtrl',['$scope','$rootScope','commonService','$state','PublishedCourse','$alert','draftedCourses','$aside','addCourseDomainSrv','manageTreeStructureSrv','branchSrv','commonSrv',function($scope,$rootScope,commonService,$state,PublishedCourse,$alert,draftedCourses,$aside,addCourseDomainSrv,manageTreeStructureSrv,branchSrv,commonSrv){

if(!$rootScope.userinfo){ //checking for the login credentilas is present or not
      $rootScope.hide_when_root_empty=true;
      commonService.GetUserCredentials($scope);
}
if($rootScope.loggedIn==false){
  $state.go('login');
}
$scope.notfoundCourse=true;
$scope.showNavMenu=false;
$scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
//if($rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId==2){
	$scope.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
	PublishedCourse.loadPublishedCourses($scope,'','','');
//}
//$scope.showCourseFilter = false;
var courseDomainResponse = addCourseDomainSrv.FnLoadDomain();
courseDomainResponse.then(function(response){
  $scope.domainDetails=angular.fromJson(JSON.parse(response.data));//Converting the result to json object
  $scope.domainTree=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);//to get the course tree
});

var globalValuesResponse = commonSrv.FnLoadGlobalValues("");
globalValuesResponse.then(function(data){
  var globalValues=angular.fromJson(JSON.parse(data.data));
  $scope.globalValues = {};
  angular.forEach(globalValues,function(value){
    $scope.globalValues[value._id] = value.values.approved;
  });
  $scope.technologies = $scope.globalValues.technologies;
  $scope.taggs = $scope.globalValues.tags;
});

$scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;//to get the company id
  branchSrv.fnLoadBranch($scope,$scope.cmp_id);//to load the branches
  $scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.branchDetails, null);
    }
});

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

// $scope.loadPublishedCoursesCallback=function(data){
// 	$scope.publishedCourses=angular.fromJson(JSON.parse(data));
// };

$scope.navigateToCourse = function( courseId ){
    $state.go('home.main.viewCourse',{id:courseId});
}
$scope.editCourse=function(courseId){
	$state.go('home.main.addCourse.step1',{courseId:courseId});
};

$scope.undo = function(){
		var undoCourse = draftedCourses.fnDeleteCourse({activeFlag:1},$scope.lastDeletedCourseId, $scope.rm_id, "Publish",$scope.companyId);
		undoCourse.then(function (data) {
			$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));
		});
	};

$scope.deleteCourseDetails = function(courseId){
	// console.log(courseId);
	$scope.lastDeletedCourseId = courseId;		
	var deleteCourse = draftedCourses.fnDeleteCourse({activeFlag:0},courseId, $scope.rm_id , "Publish",$scope.companyId);
	deleteCourse.then(function (data) {
		$scope.publishedCourses = angular.fromJson(JSON.parse(data.data));
		$alert({scope: $scope, container:'body', keyboard:true, animation:'am-fade-and-slide-top', template:'views/ui/angular-strap/alert.tpl.html', title:'Undo', content:'The course has been moved to the Trash <i class="fa fa-smile-o"></i>', placement: 'top-right', type: 'warning'});
	});
		
};
var searchInProgress;
$scope.activeLink=1;
$scope.searchCoursesAvailable=function(searchKey,type){//for seaeching the available courses
	clearTimeout(searchInProgress);
searchInProgress=setTimeout(function(){
  console.log(searchKey);
  //console.log(type);
  //if(type=='Delivery.online'){
  //  type="'"+ type+ "'";
  //}
PublishedCourse.loadPublishedCourses($scope,searchKey,'',type);
},400)

};

$scope.nextOne=function(){//event  for showing next 12 items
	if ($scope.publishedCourses.courseCount>12) {	
	  $scope.activeLink=$scope.activeLink+12;
	  PublishedCourse.loadPublishedCourses($scope,'',$scope.activeLink-1,'');
	}
};

$scope.prevOne=function(){//event  for showing previous 12 items
  if($scope.activeLink>12)
   {	
   $scope.activeLink=$scope.activeLink-12;
   PublishedCourse.loadPublishedCourses($scope,'',$scope.activeLink,'');
   }
}

$scope.viewCourseDetails = function(courseId){
	$state.go("home.main.course",{courseId:courseId})
}

}]);