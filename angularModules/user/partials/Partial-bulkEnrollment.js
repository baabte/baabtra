angular.module('baabtra').controller('BulkenrollmentCtrl',['$scope','bulkEnrollment','$rootScope','$alert','$state',function($scope,bulkEnrollment,$rootScope,$alert,$state){

$scope.batch={};
//getting the user role mapping id
$rootScope.$watch('userinfo',function(){
	$scope.userRegister={};
    $scope.userRegister.loggedusercrmid = $rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
    $scope.userRegister.companyId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
     
     //$scope.userRegister.role={};
      //$scope.userRegister.role.roleId=3;
    //console.log($scope.urmId,$scope.companyId);

});

//bulk enrollment

$scope.fnBulkEnroll=function(){
//-----------------
  if (typeof $scope.batch[0]!= "undefined") { 
 delete $scope.batch[0].course;
 $scope.batchId=$scope.batch[0]._id 
 delete $scope.batch[0]._id;
 delete $scope.batch[0].companyId;
 delete $scope.batch[0].updatedDate;
 delete $scope.batch[0].createddDate;
 delete $scope.batch[0].crmId;
 delete $scope.batch[0].urmId;
 $scope.batch[0].startDate=new Date($scope.batch[0].startDate).toISOString();
 $scope.batch[0].endDate=new Date($scope.batch[0].endDate.$date).toISOString();
 $scope.batch[0].enrollmentAfter=new Date($scope.batch[0].enrollmentAfter.$date).toISOString();
 $scope.batch[0].enrollmentBefore=new Date($scope.batch[0].enrollmentBefore.$date).toISOString();
 $scope.batch=$scope.batch[0];
 $scope.course=$scope.batches.course;
// delete $scope.batches;
         var time=(new Date()).valueOf();
         hashids = new Hashids("this is a batch id");
         $scope.batch.batchCode = hashids.encode(time); 

} 
//-----------------
 $scope.userRegister.role={};
 //console.log($scope.course);
 //console.log($scope.batch);
 $scope.userRegister.course=$scope.course; 
 $scope.userRegister.batchId =$scope.batchId;
  $scope.userRegister.role.roleId=3; 
	$scope.userRegister.batch=$scope.batch; 
	var promise= bulkEnrollment.fnSaveBulkEnroll($scope);
   promise.then(function(response){
    if(response.data){
    $alert({title: 'Done..!', content: 'Registered Successfully :-)', placement: 'top-right',duration:3 ,animation:'am-fade-and-slide-bottom', type: 'success', show: true});
     $state.go('home.main');

    }
   });

};

}]);